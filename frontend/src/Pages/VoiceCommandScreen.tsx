import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa'; // Voice Icon

const VoiceCommand = () => {
  const [command, setCommand] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
   const [address, setAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position: { coords: GeolocationCoordinates }) => {
        const { latitude, longitude } = position.coords;
        try {
          // const response = await axios.get(
          //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          // );
          const response = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.b4a303b7b66882730107e84e467e2916&lat=${latitude}&lon=${longitude}&format=json&`)
          console.log(response);
          
          setCurrentAddress(response.data.city);
          setAddress(response.data.display_name);
        } catch (err) {
          setError('Failed to fetch address. Please try again.');
        }
      },
      () => setError('Unable to access your location.')
    );
  }, []);
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setResponse('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true; // Enable real-time transcription
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent | any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const finalTranscript = event.results[i][0].transcript;
          setCommand(finalTranscript);
          handleCommand(finalTranscript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (interimTranscript) {
        setCommand(interimTranscript); // Update live transcript
      }
    };

    recognition.onerror = (event: Event) => {
      console.error('Speech recognition error:', event);
      setResponse('Failed to recognize speech.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleCommand = async (command: string) => {
    const serviceMap: { [key: string]: string } = {
      plumber: 'Plumber',
      electrician: 'Electrician',
      painter: 'Painter',
      laundry: 'Laundry',
      mechanic: 'Mechanic',
      cleaning: 'Cleaning',
      carpenter: 'Carpenter',
      gardening: 'Gardening',
    };

    const matchedService = Object.keys(serviceMap).find((service) =>
      command.toLowerCase().includes(service)
    );

    if (matchedService) {
      try {
        
          if (!serviceMap[matchedService] || !address ) {
            setError('Please fill out all fields before submitting.');
            return;
          }
        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/book`,
          {
            service: serviceMap[matchedService],
            date: Date.now,
            address,
          }
          // console.log(result.data);
          )

        setResponse(`${serviceMap[matchedService]} booked for tomorrow!`);
        speak(`${serviceMap[matchedService]} booked successfully for tomorrow!`);
      } catch (error) {
        console.error('Error booking service:', error);
        setResponse(`Failed to book ${serviceMap[matchedService]}.`);
        speak(`Failed to book ${serviceMap[matchedService]}. Please try again later.`);
      }
    } else {
      speak('Sorry, I did not understand the service you want to book.');
      setResponse('Service not recognized. Please try again.');
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        Voice Command Integration
      </h2>

      {/* Voice Button */}
      <button
        onClick={startListening}
        disabled={isListening}
        className={`flex items-center justify-center w-20 h-20 rounded-full text-white shadow-lg transition ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        <FaMicrophone className="text-4xl" />
      </button>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {isListening ? 'Listening...' : 'Click the microphone to start listening'}
      </p>

      {/* Chat Response Area */}
      <div className="mt-6 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-y-auto h-60">
        {command && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">You said:</p>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{command}</p>
          </div>
        )}
        {response && (
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Response:</p>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceCommand;
