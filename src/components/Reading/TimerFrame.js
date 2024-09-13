import React, { useState, useEffect, useRef } from 'react';

const TimerFrame = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const secondsInputRef = useRef(null);

  useEffect(() => {
    if (!isRunning || time <= 0) return;

    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleSetTime = () => {
    setIsEditing(true);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const handleBlur = () => {
    const totalSeconds = (parseInt(minutes, 10) || 0) * 60 + (parseInt(seconds, 10) || 0);
    setTime(totalSeconds);
    setIsEditing(false);
  };

  return (
    <div className="timer-frame" style={{display:'flex', alignItems:'flex-end', justifyContent:'center', marginRight:'2em'}}>
      <table>
        <tbody>
          <tr>
            <td style={{width:'2em'}}>
              <button onClick={handleStartPause}>
                {isRunning ? 'Pause' : 'Start'}
              </button>
            </td>
            <td style={{width:'2em'}}>
              {isEditing ? (
                <input
                  type="text"
                  value={minutes}
                  onChange={handleMinutesChange}
                  // onBlur={handleBlur}
                  placeholder="mm"
                  style={{
                    width: '1.8em',
                    textAlign: 'center',
                    fontSize: '1.5em',
                    border: 'none',
                    borderBottom: '1px solid grey',
                    backgroundColor: 'transparent',
                    marginRight: '0.2em'
                  }}
                />
              ) : (
                <span onClick={handleSetTime} style={{ cursor: 'pointer', fontSize: '1.8em', fontWeight:'normal'}}>
                  {formatTime(time).split(':')[0]}
                </span>
              )}
            </td>
            <td>:</td>
            <td style={{width:'2em'}}>
              {isEditing ? (
                <input
                  type="text"
                  value={seconds}
                  onChange={handleSecondsChange}
                  onBlur={handleBlur}
                  placeholder="ss"
                  ref={secondsInputRef}
                  style={{
                    width: '1.8em',
                    textAlign: 'center',
                    fontSize: '1.5em',
                    border: 'none',
                    borderBottom: '1px solid grey',
                    backgroundColor: 'transparent',
                    marginLeft: '0.2em'
                  }}
                />
              ) : (
                <span onClick={handleSetTime} style={{ cursor: 'pointer', fontSize: '1.8em', fontWeight:'normal' }}>
                  {formatTime(time).split(':')[1]}
                </span>
              )}
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimerFrame;