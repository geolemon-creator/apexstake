import RoundGraph from '../RoundGraph/RoundGraph';
import styles from './StakingBalance.module.css';
import { useState, useEffect } from 'react';
import infoIcon from '../../Img/info.svg';

const StakingBalance = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    // Функция для обновления прогресса
    const updateProgress = () => {
      let startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / 10000) * 100, 100);
        setProgress(newProgress);

        if (newProgress === 100) {
          startTime = Date.now();
        }
      }, 100);
    };

    updateProgress();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const openStakingInfoModal = () => {
    console.log('open');
  };

  return (
    <div className={styles.StakingBalanceContainer}>
      <img
        onClick={openStakingInfoModal}
        className={styles.infoIcon}
        src={infoIcon}
        alt="info"
      />
      <RoundGraph progress={progress}>
        <defs>
          {/* Определение градиента */}
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="31.82%" stopColor="#3045FF" />
            <stop offset="44.84%" stopColor="#12B8FF" />
            <stop offset="73.86%" stopColor="#01FA75" />
          </linearGradient>

          {/* Градиент для заливки прямоугольника */}
          <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="31.82%" stopColor="#3045FF" />
            <stop offset="44.84%" stopColor="#12B8FF" />
            <stop offset="73.86%" stopColor="#01FA75" />
          </linearGradient>
        </defs>

        <text
          x="50%"
          y="33%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          fontSize="5"
          fill="rgba(173, 169, 169, 1)"
        >
          День 7 из 10 (72%)
        </text>

        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="white"
        >
          7д: 12ч: 13м
        </text>

        <rect
          x="22"
          y="61"
          width="63%"
          height="1.5"
          fill="url(#gradientFill)"
          rx="1.5"
          ry="1.5"
        />

        <text
          x="50%"
          y="63%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="5"
          fontWeight="bold"
          fill="rgba(9, 216, 78, 1)"
        >
          Прибыль
        </text>
        <text
          x="50%"
          y="72%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="5"
          fontWeight="bold"
          fill="white"
        >
          75% 0.003 ТОН
        </text>
      </RoundGraph>

      <div className={styles.BalanceAmount}>
        <p className={styles.stakingBalanceText}>Staking Balance</p>
        <h1 className={styles.stakingAmount}>$ 00.00</h1>

        <div className={styles.stakingStats}>
          <p className={styles.stakingIncrease}>+$42</p>
          <div className={styles.triangleUp}></div>
          <p className={styles.stakingPercentage}>6.37%</p>
          <p className={styles.stakingPeriod}>• 7 Day</p>
        </div>
      </div>
    </div>
  );
};

export default StakingBalance;
