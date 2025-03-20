import { NavLink } from "react-router-dom";
import box from "./../Img/present.svg";
import arrowRight from "./../Img/arrow-right.svg";
import { level } from "../Components/Data";
import coin from "./../Img/coin.png";
import LevelModal from "../Components/LevelModal";
import { useState } from "react";
import { useTransactions } from "../Components/TransactionsContext";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const { transactions } = useTransactions();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (id: number) => {
    setSelectedLevel(id);
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
          <p className="level-p">Выбор уровня</p>
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
        <div>
          <div className="home-reward">
            <div className="rewad-text">
              <h1 className="reward-h1">Ежедневная награда</h1>
              <p className="reward-p">Успей забрать</p>
            </div>

            <img className="reward-img" src={box} alt="img" />
          </div>
        </div>
      </div>

      <div className="home-balance">
        <div className="current-balance">
          <p className="current-balance-p">Current Balance</p>
          <p className="current-balance-num">$ 0.00</p>
        </div>

        <div className="home-bonus">
          <p className="home-bonus-p">Bonus</p>

          <div className="bonus-amount">
            <img className="img-coin" src={coin} alt="coin" />
            <p className="bonus-balance-num">0.00</p>
          </div>
        </div>
      </div>

      <div className="home-info-div">
         {transactions.length > 0 ? (
            <p className="home-info">НУЖЕН ГРАФИК</p>
         ) : (
          <p className="home-info">Данные появятся после начала стейкинга</p>
         )}
      </div>

      <div className="btn-more">
        <p>Узнать больше</p>
        <img src={arrowRight} alt="arrow" />
      </div>
      <NavLink style={{ textDecoration: "none" }} to="/staking">
        <div className="btn-staking">Открыть стейкинг</div>
      </NavLink>
    </div>
  );
}
