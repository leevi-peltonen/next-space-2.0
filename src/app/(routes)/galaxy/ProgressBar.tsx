// ProgressBar.tsx

import React, { useState, useEffect } from 'react';
import { Progress } from '@mantine/core';

interface ProgressBarProps {
  duration: number;
  onComplete: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onComplete }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let startTime = Date.now();
    let animationFrameId: number;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration * 1000) {
        const newProgress = (elapsedTime / (duration * 1000)) * 100;
        setProgress(newProgress);
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        onComplete();
      }
    };

    updateProgress();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration]);

  return (
    <Progress
      value={progress}
      color="blue" // Customize the color as needed
      size={4} // Customize the size as needed
    />
  );
};

export default ProgressBar;
