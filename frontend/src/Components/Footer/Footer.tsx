import referrals from './../../Img/footer/referrals.svg';
import gold from './../../Img/footer/gold.svg';
import coins from './../../Img/footer/coins.svg';
import awards from './../../Img/footer/awards.svg';
import home from './../../Img/footer/home.svg';

import styles from './Footer.module.css';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div className="footer-container">
      <ul className="footer-ul">
        <NavLink className={styles.link} to="/">
          <li
            className={`footer-li ${activeButton === 0 ? 'active' : ''}`}
            onClick={() => handleButtonClick(0)}
          >
            <img src={home} alt="home" />
            <p>Главная</p>
          </li>
        </NavLink>

        <NavLink className={styles.link} to="/staking">
          <li
            className={`footer-li ${activeButton === 1 ? 'active' : ''}`}
            onClick={() => handleButtonClick(1)}
          >
            <img src={coins} alt="staking" />
            <p>Стейкинг</p>
          </li>
        </NavLink>

        <NavLink className={styles.link} to="/referrals">
          <li
            className={`footer-li ${activeButton === 2 ? 'active' : ''}`}
            onClick={() => handleButtonClick(2)}
          >
            <img src={referrals} alt="referrals" />
            <p>Рефералы</p>
          </li>
        </NavLink>

        <NavLink className={styles.link} to="/contest">
          <li
            className={`footer-li ${activeButton === 3 ? 'active' : ''}`}
            onClick={() => handleButtonClick(3)}
          >
            <img src={awards} alt="awards" />
            <p>Конкурсы</p>
          </li>
        </NavLink>

        <NavLink className={styles.link} to="/farming">
          <li
            className={`footer-li ${activeButton === 4 ? 'active' : ''}`}
            onClick={() => handleButtonClick(4)}
          >
            <img src={gold} alt="contest" />
            <p>Фарминг</p>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
