import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CountdownTimerProps {
  endDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const { t } = useTranslation();
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
      <p className="contest-num">{t('days')}</p>
      <p className="num-timer">{String(timeLeft.hours).padStart(2, '0')}</p>
      <p className="contest-num">{t('hours')}</p>
      <p className="num-timer">{String(timeLeft.minutes).padStart(2, '0')}</p>
      <p className="contest-num">{t('minutes')}</p>
      <p className="num-timer">{String(timeLeft.seconds).padStart(2, '0')}</p>
      <p className="contest-num">{t('seconds')}</p>
    </>
  );
};

export default CountdownTimer;
