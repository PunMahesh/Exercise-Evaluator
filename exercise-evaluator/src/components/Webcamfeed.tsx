import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import {
  PoseLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';

import { evaluateSquat } from '../utils/postureEvaluation';

interface WebcamFeedProps {
  exercise: 'squat' | 'pushup' | null;
}

const WebcamFeed: React.FC<WebcamFeedProps> = ({ exercise }) => {
  const webcamRef = useRef<Webcam>(null);
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const [landmarks, setLandmarks] = useState<any | null>(null);

  useEffect(() => {
    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
      );

      landmarkerRef.current = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numPoses: 1,
      });
    };

    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        landmarkerRef.current &&
        webcamRef.current?.video &&
        webcamRef.current.video.readyState === 4
      ) {
        const result = await landmarkerRef.current.detectForVideo(
          webcamRef.current.video,
          performance.now()
        );

        if (result.landmarks.length > 0) {
          const poseLandmarks = result.landmarks[0];
          setLandmarks(poseLandmarks);

          if (exercise === 'squat') {
            const squatResult = evaluateSquat(poseLandmarks);
            console.log('Squat result:', squatResult);
          }

          // TODO: Add push-up evaluation here later
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [exercise]);

  return (
    <div>
      <Webcam ref={webcamRef} mirrored width={640} height={480} />
    </div>
  );
};

export default WebcamFeed;
