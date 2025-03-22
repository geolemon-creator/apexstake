import referrals from "./../../Img/footer/referrals.svg";
import gold from "./../../Img/footer/gold.svg";
import coins from "./../../Img/footer/coins.svg";
import awards from "./../../Img/footer/awards.svg";
import home from "./../../Img/footer/home.svg";

import styles from "./Footer.module.css";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const { t } = useTranslation();

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div className="footer-countainer">
      <ul className="footer-ul">
        <NavLink className={styles.link} to="/">
          <li
            className={`footer-li ${activeButton === 0 ? "active" : ""}`}
            onClick={() => handleButtonClick(0)}
          >
            <img src={home} alt="home" />
            <p>{t("footer.Main")}</p> {/* Исправлено: footer.Main */}
          </li>
        </NavLink>

        <NavLink className={styles.link} to="/staking">
          <li
            className={`footer-li ${activeButton === 1 ? "active" : ""}`}
            onClick={() => handleButtonClick(1)}
          >
            <img src={coins} alt="staking" />
            <p>{t("footer.staking")}</p> {/* Исправлено: footer.staking */}
          </li>
        </NavLink>

        <NavLink className={styles.link} to="/referrals">
          <li
            className={`footer-li ${activeButton === 2 ? "active" : ""}`}
            onClick={() => handleButtonClick(2)}
          >
            <img src={referrals} alt="referrals" />
            <p>{t("footer.referrals")}</p> {/* Исправлено: footer.referrals */}
          </li>
        </NavLink>

        <NavLink className={styles.link} to="/contest">
          <li
            className={`footer-li ${activeButton === 3 ? "active" : ""}`}
            onClick={() => handleButtonClick(3)}
          >
            <img src={awards} alt="awards" />
            <p>{t("footer.contests")}</p> {/* Исправлено: footer.contests */}
          </li>
        </NavLink>

        <NavLink className={styles.link} to="/farming">
          <li
            className={`footer-li ${activeButton === 4 ? "active" : ""}`}
            onClick={() => handleButtonClick(4)}
          >
            <img src={gold} alt="contest" />
            <p>{t("footer.farming")}</p> {/* Исправлено: footer.farming */}
          </li>
        </NavLink>
      </ul>
    </div>
  );
}