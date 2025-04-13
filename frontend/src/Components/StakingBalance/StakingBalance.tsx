import RoundGraph from '../RoundGraph/RoundGraph';
import styles from './StakingBalance.module.css';
import { useEffect } from 'react';
import infoIcon from '../../Img/info.svg';
import { calculateTimeRemainingAndProgress } from './StakingBalanceUtils';
import LevelDetailInfo from '../LevelDetailsModal/LevelDetailInfo';
import tonIcon from '../../Img/TonCoin.svg';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStakingDetails,
  fetchLevelDetails,
  setModalOpen,
  setProgress,
  setTimeRemaining,
} from '../../Features/stakingSlice';
import { RootState, AppDispatch } from '../../store';
import { formatBalance } from '../../Utils/formatBalance';
import { stakingApi } from '../../Api/stakingApi';
import { useTranslation } from 'react-i18next';

const StakingBalance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    userStakingData,
    progress,
    timeRemaining,
    level,
    profit,
    isModalOpen,
    isLoading,
  } = useSelector((state: RootState) => state.staking);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchStakingDetails());
  }, [dispatch]);

  useEffect(() => {
    if (userStakingData?.start_date && userStakingData?.end_date) {
      const interval = setInterval(() => {
        const { timeRemaining, progress } = calculateTimeRemainingAndProgress(
          userStakingData.start_date,
          userStakingData.end_date
        );

        localStorage.setItem(
          'current_staking',
          JSON.stringify(userStakingData)
        );
        if (timeRemaining === 'Время истекло') {
          localStorage.removeItem('current_staking');
          window.location.reload();
        }

        dispatch(setTimeRemaining(timeRemaining));
        dispatch(setProgress(Number(progress)));
      }, 600); // 60 сек

      return () => clearInterval(interval);
    }
  }, [dispatch, userStakingData]);

  const openModal = async () => {
    if (userStakingData?.staking_level) {
      await dispatch(fetchLevelDetails(String(userStakingData.staking_level)));
    }
    dispatch(setModalOpen(true));
  };

  const onClose = async () => {
    dispatch(setModalOpen(false));
  };

  const handleWithdrawProfit = async () => {
    if (!userStakingData?.start_date || !userStakingData?.end_date) return;

    const startDate = new Date(userStakingData.start_date);
    const now = new Date();

    const minutesPassed = (now.getTime() - startDate.getTime()) / 1000 / 60;

    let commissionRate;
    if (minutesPassed < 5) {
      commissionRate = 10;
    } else {
      commissionRate = 5;
    }
    const userConfirmed = window.confirm(
      `${t('confirm_withdraw_profit')} ${commissionRate}%`
    );

    if (userConfirmed) {
      try {
        await stakingApi.withdrawStakingProfit();

        setTimeout(() => {
          window.location.reload();
        }, 100);
      } catch (err) {
        console.error(err);
      }
    }
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
              onClick={openModal}
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
                {t('day')} {userStakingData?.current_day} {t('from')}{' '}
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
                {t('profit')}
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
                {Number(userStakingData?.amount) > 0
                  ? Math.abs(
                      (Number(profit) / Number(userStakingData?.amount)) * 100
                    ).toFixed(2)
                  : 0}
                % {formatBalance(Math.abs(Number(profit)))} TОН
              </text>
            </RoundGraph>

            <div className={styles.BalanceAmount}>
              <p className={styles.stakingBalanceText}>
                {t('staking_balance')}
              </p>
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
                  • {userStakingData?.current_day} {t('day')}
                </p>
              </div>
              <div
                className={styles.WithdrawProfitBtn}
                onClick={handleWithdrawProfit}
              >
                {t('withdraw_profit')}
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
              {t('staking_balance')}
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
