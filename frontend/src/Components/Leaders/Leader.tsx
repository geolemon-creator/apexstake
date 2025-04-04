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
    <div>
      <div
        style={{ background: 'black', border: '1px solid #FFDE45' }}
        className={styles.leaderItemContainer}
      >
        <div className={styles.leaderItemInfo}>
          <p style={{ marginRight: '8px' }}>104</p>
          <img
            style={{ marginRight: '8px' }}
            className={styles.userAvatar}
            src={data?.user.avatar}
            alt="avatar"
          />
          <p style={{ fontWeight: '600' }}>Вы</p>
        </div>
        <div className={styles.leaderItemBalance}>
          <img width={15} height={15} src={tonIcon} alt="ton" />
          <p style={{ marginLeft: '5px' }}>{data?.user.balance}</p>
          <img
            style={{ marginLeft: '5px' }}
            width={15}
            height={15}
            src={coin}
            alt="coin"
          />
          <p style={{ marginLeft: '5px' }}>{data?.user.tokens}</p>
        </div>
      </div>
      {data?.leaders.map((leader, index) => {
        // Позиция медали определяется по индексу
        const containerClass = `frend-countainer-${
          ['first', 'second', 'third'][index]
        }`; // генерируем класс для первого, второго, третьего
        const medalPosition = index + 1; // Индексы начинаются с 0, а позиции с 1
        return (
          <div
            style={{ marginBottom: '8px' }}
            key={leader.username}
            className={`${
              index > 2 ? styles.leaderItemContainer : containerClass
            }`}
          >
            {medalPosition <= 3 && (
              <img
                style={{ marginLeft: '8px' }}
                src={medalImages[medalPosition as 1 | 2 | 3]}
                alt={`${
                  ['Золотая', 'Серебряная', 'Бронзовая'][medalPosition - 1]
                } медалька`}
              />
            )}

            {index > 2 && <p style={{ marginLeft: '12px' }}>{index + 1}</p>}
            <img
              className="img-frend"
              style={{ borderRadius: '100%' }}
              src={leader.avatar}
              alt="img"
            />
            <p className="name-frend">{leader.username}</p>
            <img className="ton-img" src={tonIcon} alt="ton" />
            <p className="ton-frend">{leader.balance}</p>
            <img className="coin-frend-img" src={coin} alt="coin" />
            <p className="coin-frend">{leader.tokens}</p>
          </div>
        );
      })}
    </div>
  );
}
