import React, { useState, useEffect } from 'react';

const TimerFrame = ({ taskTime }) => {
  const [time, setTime] = useState(taskTime);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer-frame">
      <p className="timer" style={{ color: time < 60 ? 'red' : 'black' }}>
      Time remaining: {formatTime(time)}
      </p>
    </div>
  );
};

export default TimerFrame;