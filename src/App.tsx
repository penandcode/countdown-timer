import React, { useState, useRef } from 'react';

function App() {
  const [targetDate, setTargetDate] = useState("");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<number>();

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance <= 0) {
        clearInterval(intervalRef.current);
        setCompleted(true);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCompleted(false);
        setCountdown({
          days,
          hours,
          minutes,
          seconds
        });
      }
    }, 1000);
  }

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTargetDate(event.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '90vh', flexDirection: "column" }}>
      <div>
        <h1 style={{ color: 'white' }}>Countdown <span style={{ color: 'red' }}>Timer</span></h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <input type="datetime-local" id="dateInput" value={targetDate} onChange={handleInputChange} />
        <button onClick={startTimer}>Start</button>
        <div className='countdownGroup'>
          {completed ? (
            <p style={{ color: 'purple', fontWeight: 600 }}>
              🎉The countdown is over! What's next on your adventure?🎉
            </p>
          ) : countdown.days >= 100 ? (
            <p style={{ color: 'purple', fontWeight: 600 }}>Selected time is more than 100 days</p>
          ) : (
            <>
              <div>
                <p>{countdown.days || 0}</p>
                <p>Days</p>
              </div>
              <div>
                <p>{countdown.hours || 0}</p>
                <p>Hours</p>
              </div>
              <div>
                <p>{countdown.minutes || 0}</p>
                <p>Minutes</p>
              </div>
              <div>
                <p>{countdown.seconds || 0}</p>
                <p>Seconds</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
