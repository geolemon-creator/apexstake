import RoundGraph from '../RoundGraph/RoundGraph';
import styles from './StakingBalance.module.css';
import { useState, useEffect } from 'react';
import infoIcon from '../../Img/info.svg';
import { LevelData, UserStakingDetails } from '../Type';
import { levelsApi, stakingApi } from '../../Api/stakingApi';
import { calculateTimeRemainingAndProgress } from './StakingBalanceUtils';
import LevelDetailInfo from '../LevelDetailsModal/LevelDetailInfo';
import tonIcon from '../../Img/TonCoin.svg';

const StakingBalance = () => {
  const [userStakingData, setUserStakingData] = useState<UserStakingDetails>();
  const [progress, setProgress] = useState<string | number>(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [level, setLevel] = useState<LevelData>();
  const [profit, setProfit] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const storedStaking = JSON.parse(
    localStorage.getItem('current_staking') || '{}'
  );

  useEffect(() => {
    const fetchStakingDetails = async () => {
      try {
        const userStakingData: UserStakingDetails =
          await stakingApi.getStakingMe();
        setUserStakingData(userStakingData);

        const { timeRemaining, progress } = calculateTimeRemainingAndProgress(
          userStakingData.start_date,
          userStakingData.end_date
        );
        setTimeRemaining(timeRemaining);
        setProgress(progress);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchStakingDetails();
  }, []);

  const fetchLevelDetails = async () => {
    try {
      if (userStakingData?.staking_level) {
        const levelDetails: LevelData = await levelsApi.getLevelDetails(
          userStakingData?.staking_level
        );
        setLevel(levelDetails);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userStakingData?.start_date && userStakingData?.end_date) {
      // Функция для обновления таймера и процента каждую минуту
      const interval = setInterval(() => {
        const { timeRemaining, progress } = calculateTimeRemainingAndProgress(
          userStakingData.start_date,
          userStakingData.end_date
        );

        localStorage.setItem('current_staking', JSON.stringify(userStakingData));

        if (timeRemaining === 'Время истекло') {
          if (storedStaking) {
            localStorage.removeItem('current_staking');
          }
          window.location.reload();
        }

        setTimeRemaining(timeRemaining);
        setProgress(progress);
      }, 600); // Обновляем каждую минуту

      // Начальный расчет, чтобы сразу отобразить
      const { timeRemaining, progress } = calculateTimeRemainingAndProgress(
        userStakingData.start_date,
        userStakingData.end_date
      );
      const rawAmount = userStakingData?.amount ?? '0';
      const rawProfit = userStakingData?.current_profit ?? 0;

      const amount = parseFloat(rawAmount); // теперь точно number
      const currentProfit = rawProfit; // уже number по типу

      const profitPercentage =
        amount > 0 ? ((currentProfit - amount) / amount) * 100 : 0;

      setProfit(profitPercentage);
      setTimeRemaining(timeRemaining);
      setProgress(progress);

      return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }
  }, [userStakingData]);

  const openStakingInfoModal = () => {
    fetchLevelDetails();

    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <>
      <div className={styles.StakingBalanceContainer}>
        {userStakingData && (
          <>
            <img
              onClick={openStakingInfoModal}
              className={styles.infoIcon}
              src={infoIcon}
              alt="info"
            />
            <RoundGraph
              progress={
                typeof progress === 'string' ? parseFloat(progress) : progress
              }
            >
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
                <linearGradient
                  id="gradientFill"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
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
                День {userStakingData?.current_day} из{' '}
                {userStakingData?.total_days} ({progress}%)
              </text>
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="white"
              >
                {timeRemaining}
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
                {Number(profit.toFixed(2))}% {userStakingData.current_profit}{' '}
                TОН
              </text>
            </RoundGraph>

            <div className={styles.BalanceAmount}>
              <p className={styles.stakingBalanceText}>Staking Balance</p>
              <h1 className={styles?.stakingAmount}>
                <img
                  src={tonIcon}
                  alt="ton"
                  width={20}
                  height={20}
                  style={{ marginRight: '5px' }}
                />
                {userStakingData?.amount}
              </h1>

              <div className={styles.stakingStats}>
                <p className={styles.stakingIncrease}>
                  +TON {userStakingData?.daily_earning?.toFixed(2)}
                </p>
                <div className={styles.triangleUp}></div>
                <p className={styles.stakingPercentage}>
                  {userStakingData?.daily_percentage?.toFixed(2)}%
                </p>
                <p className={styles.stakingPeriod}>
                  • {userStakingData?.current_day} Day
                </p>
              </div>
            </div>
            {isModalOpen && level && (
              <div className={styles.BalanceModalOverlay}>
                <div className={styles.BalanceModalContent}>
                  <LevelDetailInfo level={level} onClose={onClose} />
                </div>
              </div>
            )}
          </>
        )}
        {!userStakingData && (
          <div className={styles.BalanceAmount}>
            <p
              className={styles.stakingBalanceText}
              style={{ paddingTop: '10px' }}
            >
              Staking Balance
            </p>
            <h1 className={styles?.stakingAmount}>
              <img
                src={tonIcon}
                alt="ton"
                width={20}
                height={20}
                style={{ marginRight: '5px' }}
              />
              00.00
            </h1>
          </div>
        )}
      </div>
    </>
  );
};
export default StakingBalance;
