import { LeadersListResponse } from '../Type';
import tonIcon from './../../Img/TonCoin.svg';
import coin from './../../Img/coin.svg';
import goldMedalIcon from './../../Img/refferal/goldMedal.svg';
import silverMedalIcon from './../../Img/refferal/silverMedal.svg';
import bronseMedalIcon from './../../Img/refferal/bronseMedal.svg';
import { useEffect, useState } from 'react';
import { usersApi } from '../../Api/usersApi';
import styles from './Leader.module.css';

export default function Leaders() {
  const [data, setData] = useState<LeadersListResponse>();

  const medalImages: { [key in 1 | 2 | 3]: string } = {
    1: goldMedalIcon,
    2: silverMedalIcon,
    3: bronseMedalIcon,
  };

  useEffect(() => {
    const fetchLeadersList = async () => {
      try {
        const leadersList: LeadersListResponse =
          await usersApi.getLeadersList();
        setData(leadersList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeadersList();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* Текущий пользователь */}
      <div
        style={{ background: 'black', border: '1px solid #FFDE45' }}
        className={styles.leaderItemContainer}
      >
        <div className={styles.leaderItemInfo}>
          <p style={{ marginRight: '8px' }}>{data?.user?.position}</p>
          <img
            style={{ marginRight: '8px' }}
            className={styles.userAvatar}
            src={data?.user.avatar}
            alt="avatar"
          />
          <p style={{ fontWeight: '600', width: '130px' }}>Вы</p>
        </div>
        <div className={styles.leaderItemBalance}>
          <img
            style={{ marginLeft: '5px' }}
            width={15}
            height={15}
            src={coin}
            alt="coin"
          />
          <p style={{ marginLeft: '5px' }}>
            {Math.round(Number(data?.user.tokens))}
          </p>
        </div>
      </div>

      {/* Топ лидеры */}
      {data?.leaders.map((leader, index) => {
        const medalPosition = index + 1;
        const isTop3 = medalPosition <= 3;

        // Inline background для top-3
        let backgroundStyle = {};
        if (index === 0) {
          backgroundStyle = {
            background: 'linear-gradient(90deg, #343434 4.48%, #ffa319 100%)',
          };
        } else if (index === 1) {
          backgroundStyle = {
            background: 'linear-gradient(90deg, #343434 18.63%, #788799 100%)',
          };
        } else if (index === 2) {
          backgroundStyle = {
            background: 'linear-gradient(90deg, #343434 33.5%, #813906 100%)',
          };
        }

        return (
          <div
            style={{ marginBottom: '8px', ...backgroundStyle }}
            key={leader.username}
            className={styles.leaderItemContainer}
          >
            <div className={styles.leaderItemInfo}>
              {isTop3 ? (
                <img
                  style={{ marginLeft: '-6px', marginRight: '8px' }}
                  src={medalImages[medalPosition as 1 | 2 | 3]}
                  alt={`${
                    ['Золотая', 'Серебряная', 'Бронзовая'][index]
                  } медалька`}
                />
              ) : (
                <p style={{ marginRight: '8px' }}>{medalPosition}</p>
              )}

              <img
                style={{ marginRight: '8px' }}
                className={styles.userAvatar}
                src={leader.avatar}
                alt="avatar"
              />
              <p style={{ fontWeight: '600', width: '130px' }}>
                {leader.username.length > 10
                  ? `${leader.username.slice(0, 10)}...`
                  : leader.username}
              </p>
            </div>

            <div className={styles.leaderItemBalance}>
              <img
                style={{ marginLeft: '5px' }}
                width={15}
                height={15}
                src={coin}
                alt="coin"
              />
              <p style={{ marginLeft: '5px' }}>
                {Math.round(Number(leader.tokens))}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
