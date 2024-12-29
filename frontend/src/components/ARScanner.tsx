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

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    const startWebcam = async () => {
      if (webcamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamRef.current.srcObject = stream;
      }
    };
    startWebcam();
  }, []);

  const stopCamera = () => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      const stream = webcamRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handlePrediction = async () => {
    if (!model || !webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, 224, 224);
    const imageTensor = tf.browser.fromPixels(canvas)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    const predictions = await model.classify(imageTensor as tf.Tensor3D);
    if (predictions.length > 0) {
      setPredictions(predictions[0].className);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDetecting) {
      interval = setInterval(handlePrediction, 1000);
    }
    return () => clearInterval(interval);
  }, [isDetecting]);

  return (
    <div>
      <video ref={webcamRef} autoPlay muted />
      <canvas ref={canvasRef} width={224} height={224} hidden />
      <button onClick={() => setIsDetecting(!isDetecting)}>
        {isDetecting ? 'Stop' : 'Start'}
      </button>
      {predictions && <ResultScreen detectedIssue={predictions} />}
    </div>
  );
};

export default ARScanner;
