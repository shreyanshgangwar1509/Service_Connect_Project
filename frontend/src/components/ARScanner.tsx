import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import React, { useEffect, useRef, useState } from 'react';
import ResultScreen from './ResultScreen';

const ARScanner: React.FC = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [predictions, setPredictions] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load Pre-trained MobileNet Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        console.log('MobileNet model loaded successfully');
      } catch (error) {
        console.error('Failed to load model:', error);
      }
    };
    loadModel();
  }, []);

  // Start Webcam Stream
  useEffect(() => {
    const startWebcam = async () => {
      try {
        if (webcamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          webcamRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };
    startWebcam();
  }, []);

  // Stop Camera Function
  const stopCamera = () => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      const stream = webcamRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      webcamRef.current.srcObject = null;
      console.log('Camera turned off.');
    }
  };

  // Perform Predictions
  const handlePrediction = async () => {
    if (!model || !webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Capture video frame into canvas
    ctx.drawImage(video, 0, 0, 224, 224);
    const imageTensor = tf.browser.fromPixels(canvas)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    // Make prediction
    const predictions = await model.classify(imageTensor);
    if (predictions.length > 0) {
      setPredictions(predictions[0].className); // Top prediction
    }
    console.log('Predictions:', predictions);

    // Stop camera when issue is detected
    if (predictions.length > 0 && predictions[0].probability > 0.6) {
      stopCamera();
      setIsDetecting(false); // Stop detection
    }
  };

  // Trigger predictions when `isDetecting` is true
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDetecting) {
      interval = setInterval(() => {
        handlePrediction();
      }, 1000); // Run every second
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isDetecting]);

  // Toggle Detection State
  const toggleDetection = () => {
    if (!isDetecting) {
      setIsDetecting(true);
    } else {
      stopCamera();
      setIsDetecting(false);
    }
  };

  return (
    <div className="relative w-80 h-80 mx-auto mt-10 border border-gray-400 rounded-lg overflow-hidden shadow-lg bg-black">
      
      <video
        ref={webcamRef}
        autoPlay
        muted
        className="w-full h-full object-cover"
      />
      
      <canvas
        ref={canvasRef}
        width={224}
        height={224}
        className="hidden"
      />
      
      <div className="absolute bottom-0 w-full p-2 bg-gray-800 bg-opacity-75 text-white text-center">
        {predictions ? (
          <>
            Detected Issue: {predictions}
            <ResultScreen detectedIssue={predictions} />
          </>
        ) : (
          'Point your camera at the issue'
        )}
      </div>

      {/* Detect Button */}
      <button
        onClick={toggleDetection}
        className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
      >
        {isDetecting ? 'Stop Detection' : 'Start Detection'}
      </button>
    </div>
  );
};

export default ARScanner;
