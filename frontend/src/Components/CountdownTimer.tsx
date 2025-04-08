import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <>
      <p className="num-timer">{timeLeft.days}</p>
      <p className="contest-num">дня</p>
      <p className="num-timer">{String(timeLeft.hours).padStart(2, '0')}</p>
      <p className="contest-num">часов</p>
      <p className="num-timer">{String(timeLeft.minutes).padStart(2, '0')}</p>
      <p className="contest-num">минут</p>
      <p className="num-timer">{String(timeLeft.seconds).padStart(2, '0')}</p>
      <p className="contest-num">секунд</p>
    </>
  );
};

export default CountdownTimer;
