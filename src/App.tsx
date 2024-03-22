

import React, { useState, useEffect } from 'react';



function App() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
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

        setCountdown({
          days,
          hours,
          minutes,
          seconds
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleInputChange = (event: any) => {
    setTargetDate(event.target.value);
  };

  return (<>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '90lvh', flexDirection: "column" }}>
      <div>
        <h1 style={{ color: 'white' }}>Countdown <span style={{ color: 'red', }}>Timer</span></h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <input type="datetime-local" id="dateInput" value={targetDate} onChange={handleInputChange} />
        <button>Start</button>
        <div className='countdownGroup'>
          <div>
            <p>{countdown.days}</p>
            <p>Days</p>
          </div>
          <div>
            <p>{countdown.hours}</p>
            <p>Hours</p>
          </div>
          <div>
            <p>{countdown.minutes}</p>
            <p>Minutes</p>
          </div>
          <div>
            <p>{countdown.seconds}</p>
            <p>Seconds</p>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default App
