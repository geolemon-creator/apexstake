import { NavLink } from "react-router-dom";
import box from "./../Img/present.svg";
import arrowRight from "./../Img/arrow-right.svg";
import { level } from "../Components/Data";
import coin from "./../Img/coin.png";
import LevelModal from "../Components/LevelModal";
import { useEffect, useState } from "react";
import { useTransactions } from "../Components/TransactionsContext";
import deposit from "./../Img/Deposit.png";
import withdraw from "./../Img/Withdraw.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const { transactions } = useTransactions();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Логика, которая должна выполняться при смене языка
  }, [i18n.language]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (id: number) => {
    setSelectedLevel(id);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.05,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "10px",
    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <div className="home-countainer">
      <div className="home-top-catlog">
        <NavLink to="/profile">
          <div className="home-user">
            <div className="user-icon"></div>
            <p className="home-user-p">UserName</p>
          </div>
        </NavLink>

        <div onClick={handleOpenModal} className="home-level">
          <p className="level-p">{t("home.levelSelection")}</p> 
          <span className="arrow">&gt;</span>
        </div>

        <LevelModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          level={level}
          selectedLevel={selectedLevel}
          handleSelect={handleSelect}
        />
      </div>

      <div className="home-lower-catalog">
        <Slider {...settings}>
          <div>
            <div className="home-reward">
              <div className="rewad-text">
                <h1 className="reward-h1">{t("home.dailyReward")}</h1> 
                <p className="reward-p">{t("home.hurryUpToClaim")}</p> 
              </div>

              <img className="reward-img" src={box} alt="img" />
            </div>
          </div>

          <div>
            <div className="home-reward">
              <div className="rewad-text">
                <h1 className="reward-h1">{t("home.dailyReward")}</h1> 
                <p className="reward-p">{t("home.hurryUpToClaim")}</p> 
              </div>

              <img className="reward-img" src={box} alt="img" />
            </div>
          </div>
        </Slider>
      </div>

      <div className="home-balance">
        <div className="total-balance">
          <div className="total-price-div">
            <p className="title-balance">Total Balance</p>
            <p className="title-price">$ 00.00</p>
          </div>

          <div className="balance-bonus">
            <p className="balance-bonus-title">Bonus</p>
            <img className="balance-bonus-img" src={coin} />
            <p className="bonus-num">000</p>
          </div>

          <div className="stak-balance-line"></div>

          <div className="stak-btn-div">
            <div className="stak-first-div">
              <img src={deposit} alt="desposit" />
              <p className="deposit-p">{t("home.deposit")}</p> 
            </div>
            <div className="stak-first-div">
            <NavLink to="/Conclusioin">
              <img src={withdraw} alt="withdraw" />
            </NavLink>
              <p className="deposit-p">{t("home.withdraw")}</p> 
            </div>
          </div>
        </div>
      </div>

      <div className="home-info-div">
        {transactions.length > 0 ? (
          <p className="home-info">{t("home.graphNeeded")}</p>
        ) : (
          <p className="home-info">{t("home.dataAfterStaking")}</p>
        )}
      </div>

        <div className="btn-more">
          <p>{t("home.learnMore")}</p> 
          <img src={arrowRight} alt="arrow" />
        </div>

      <NavLink style={{ textDecoration: "none" }} to="/staking">
        <div className="btn-staking">{t("home.openStaking")}</div>
      </NavLink>
    </div>
  );
}