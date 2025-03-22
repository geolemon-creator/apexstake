import picture from "./../Img/picture.png";
import timer from "./../Img/timer.png";
import paty from "./../Img/Party.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import cup from "./../Img/cup.svg"
import coin from "./../Img/coin.svg"


export default function Contest() {
  const { t } = useTranslation();
  const [termsOpen, setTermsOpen] = useState(false)

  const handleOpenTerms = () => {
    setTermsOpen(true)
  }

  return (
    <div className="contest-countainer">

      {!termsOpen ? (
        <>
      <h1 className="contest-h1">{t("contest.contests")}</h1>

      <div className="contest-div">
        <div className="top-text-contest">
          <h2 className="top-text-one">{t("contest.bonuses")}</h2>
          <p className="top-text-two">{t("contest.forEachReferral")}</p>
        </div>

        <img className="contest-img" src={picture} alt="picture" />

        <div className="contest-text-div">
          <p className="contest-text">{t("contest.endsIn")}</p>
        </div>

        <div className="contest-timer">
          <img src={timer} alt="timer" />
          <p className="num-timer">2</p>
          <p className="contest-num">{t("contest.days")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.hours")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.minutes")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.seconds")}</p>
        </div>

        <button onClick={handleOpenTerms} className="contest-btn-about">{t("contest.details")}</button>
      </div>

      <div className="contest-div">
        <div className="top-text-contest">
          <p className="top-text-dubai">{t("contest.partyInDubai")}</p>
        </div>
        <img className="paty-img" src={paty} alt="Вечеринка в Дубае" />
        <div className="contest-timer">
          <img src={timer} alt="timer" />
          <p className="num-timer">2</p>
          <p className="contest-num">{t("contest.days")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.hours")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.minutes")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.seconds")}</p>
        </div>
        <button onClick={handleOpenTerms} className="contest-btn-about">{t("contest.details")}</button>
      </div>
      </>
      
      ) : 
      (
      <>
      <div className="terms-countainer">
        
      <div className="terms-header">
        <div className="top-text-contest">
          <h2 className="top-text-one">{t("contest.bonuses")}</h2>
          <p className="top-text-two">{t("contest.forEachReferral")}</p>
        </div>

        <div className="contest-text-div">
          <p className="contest-text">{t("contest.endsIn")}</p>
        </div>

        <div className="contest-timer">
          <img src={timer} alt="timer" />
          <p className="num-timer">2</p>
          <p className="contest-num">{t("contest.days")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.hours")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.minutes")}</p>
          <p className="num-timer">08</p>
          <p className="contest-num">{t("contest.seconds")}</p>
        </div>
      </div>

      <div className="terms-prize">
        <img className="prize-cup" src={cup} alt="" />
        <p className="prize-p">{t('termsContest.prizeFund')}</p>
        <div className="prize-coin-div">
          <img className="prize-coin-img" src={coin} alt="" />
          <p className="prize-coin-p">4,599,740</p>
        </div>
      </div>

      <p className="terms-competition-p">{t('termsContest.terms')}</p>

    <div className="level-terms-div">
      <div className="level-terms">
        <p className="level-terms-p-first">{t('dataLevel.beginner')}</p>
        <p className="terms-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="terms-lvl-price-div">
          <p className="terms-lvl-price-p">{t('termsContest.entryFee')}</p>
          <p className="terms-lvl-price-num">20 USDT</p>
        </div>
      </div>

      <div className="level-terms">
        <p className="level-terms-p-first">{t('dataLevel.intermediate')}</p>
        <p className="terms-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="terms-lvl-price-div">
          <p className="terms-lvl-price-p">{t('termsContest.entryFee')}</p>
          <p className="terms-lvl-price-num">18 USDT</p>
        </div>
      </div>


      <div className="level-terms">
        <p className="level-terms-p-first">{t('dataLevel.advanced')}</p>
        <p className="terms-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="terms-lvl-price-div">
          <p className="terms-lvl-price-p">{t('termsContest.entryFee')}</p>
          <p className="terms-lvl-price-num">14 USDT</p>
        </div>
      </div>
    </div>

    <button className="accept-terms">{t('termsContest.participate')}</button>

      </div>
      </>
    )}

    </div>
  );
}