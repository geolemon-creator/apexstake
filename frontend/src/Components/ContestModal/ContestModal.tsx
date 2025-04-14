import { useEffect, useState } from 'react';
import { ContestApiResponse } from '../Type';
import { contestApi } from '../../Api/contestApi';
import CountdownTimer from '../CountdownTimer';
import styles from './ContestModal.module.css';
import { AxiosError } from 'axios';
import closeIcon from '../../Img/close.svg';
import timer from '../../Img/timer.svg';
import coin from '../../Img/coin.svg';
import cub from '../../Img/cub-gold.svg';
import { useTranslation } from 'react-i18next';

interface ContestModalProps {
  contest_id: number;
  onClose: () => void;
}

const ContestModal = ({ contest_id, onClose }: ContestModalProps) => {
  const [data, setData] = useState<ContestApiResponse>();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const contestList: ContestApiResponse =
          await contestApi.getContestDetails(contest_id);
        setData(contestList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContest();
  }, []);

  const handleEnterContest = async () => {
    try {
      await contestApi.enterContest(contest_id);
      alert(t('contest_joined_success'));
    } catch (err) {
      const axiosError = err as AxiosError;

      const errorMessage =
        (axiosError.response?.data as any)?.detail || axiosError.message;
      alert(t(errorMessage));
    }
  };

  if (!data) {
    return;
  }
  return (
    <div className={styles.ContestModalOverlay}>
      <img
        src={closeIcon}
        alt="close icon"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          cursor: 'pointer',
        }}
      />
      <div className={styles.ContestContent}>
        <div className={styles.ContestHeader}>
          <div
            style={{
              padding: '8px 12px',
              marginBottom: '16px',
              marginTop: '30px',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: '600' }}>
              {data.data.contest.badge_content && (
                <span
                  style={{
                    background: '#111118',
                    color: '#FFDE45',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    marginRight: '2px',
                  }}
                >
                  {data.data.contest.badge_content?.toUpperCase()}
                </span>
              )}
              {data.data.contest.title.toUpperCase()}
            </p>
            <div style={{ width: '75%', margin: '0 auto' }}>
              <p
                style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  textAlign: 'left',
                  marginTop: '4px',
                }}
              >
                {t('ends_in')}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <img src={timer} alt="timer" />
              <CountdownTimer endDate={data.data.contest.end_date} />
            </div>
          </div>
        </div>
        <div className={styles.ContestPrize}>
          <div style={{ display: 'flex', marginLeft: '12px' }}>
            <img src={cub} alt="cub" style={{ marginRight: '12px' }} />
            <p style={{ fontSize: '18px', color: 'white', fontWeight: '600' }}>
              {t('prize_pool')}
            </p>
          </div>
          <div style={{ display: 'flex', marginRight: '12px' }}>
            <img src={coin} alt="coin" style={{ marginRight: '2.5px' }} />
            <p
              style={{ fontSize: '16px', color: '#FFDE45', fontWeight: '800' }}
            >
              {data.data.contest.prize_amount}
            </p>
          </div>
        </div>
        <h4
          style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '16px',
            marginTop: '16px',
          }}
        >
          {t('contest_conditions')}
        </h4>
        <div
          style={{
            paddingBottom: '40px',
          }}
        >
          {data.data.contest_info.map((info, index) => (
            <div
              key={index}
              className={styles.ContentInfo}
              style={{
                marginBottom:
                  index === data.data.contest_info.length - 1 ? '50px' : '16px',
              }}
            >
              <div style={{ padding: '8px 16px', textAlign: 'left' }}>
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    marginBottom: '4px',
                  }}
                >
                  {info.title}
                </h4>
                <p style={{ fontWeight: '300' }}>{info.content}</p>
                <div
                  style={{
                    marginTop: '4px',
                    fontWeight: '500',
                    display: 'flex',
                  }}
                >
                  <p>{t('entry_fee')}</p>
                  <p style={{ marginLeft: '12px', color: '#FFDE45' }}>
                    {Number(info.amount).toFixed(0)} TON
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.ContestButton} onClick={handleEnterContest}>
          {t('join_contest')}
        </div>
      </div>
    </div>
  );
};

export default ContestModal;
