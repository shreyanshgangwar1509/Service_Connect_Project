import { useState } from 'react';

function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false); // Chat toggle state
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [userInput, setUserInput] = useState(''); // User input state
  const [showOptions, setShowOptions] = useState(true); // Show service options

  const services = ['Plumber', 'Painter', 'Electrician', 'Carpenter'];

  // Toggle chat visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle user selecting a service
  const selectService = async (service: string) => {
    const userMessage = { type: 'user', text: `I want to book a ${service}` };
    const botWaitingMessage = {
      type: 'bot',
      text: `Please wait while we book a ${service} for you...`,
    };

    setMessages((prev) => [...prev, userMessage, botWaitingMessage]);
    setShowOptions(false); // Hide options after selection

    try {
      // Simulate API call
      const response = await fakeApiCall(service);

      if (response.status === 200) {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: `${service} booked successfully! 🎉` },
          { type: 'bot', text: `Booking Details: ${response.data.details}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: `Failed to book ${service}. Please try again.` },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: `Error: ${error.message}` },
      ]);
    }
  };

  // Simulate an API call
  const fakeApiCall = (service: string) => {
    return new Promise<{ status: number; data: { details: string } }>((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: { details: `Your ${service} is scheduled for tomorrow at 10:00 AM.` },
        });
      }, 1500);
    });
  };

  return (
    <div>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.61 0-3.12-.39-4.42-1.08L3 21l1.22-4.64A7.996 7.996 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>

      {/* Chat Container */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-96 max-h-[400px] overflow-hidden shadow-lg rounded-lg">
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            {/* Chat Header */}
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">Admin Bot</p>
              <button
                onClick={toggleChat}
                className="text-gray-300 hover:text-gray-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-64 overflow-y-auto flex flex-col space-y-2 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <p
                    className={`${
                      msg.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    } rounded-lg py-2 px-4 inline-block`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Service Options */}
            {showOptions && (
              <div className="p-4 border-t bg-gray-100 flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => selectService(service)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && selectService(userInput)}
                placeholder="Type a message"
                className="bg-white w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => selectService(userInput)}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
