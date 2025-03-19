import { useState } from "react";
import deposit from "./../Img/deposit.svg";
import withdraw from "./../Img/withdraw.svg";
import { level } from "../Components/Data";
import LevelModal from "../Components/LevelModal";

export default function Staking() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

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
    <div className="staking-countainer">
      <div className="home-top-catlog">
        <div className="home-user">
          <div className="user-icon"></div>
          <p className="home-user-p">UserName</p>
        </div>

        <div onClick={handleOpenModal} className="home-level">
          <p className="level-p">Выбор уровня</p>
          <span className="arrow">&gt;</span>
        </div>
      </div>

      <LevelModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        level={level}
        selectedLevel={selectedLevel}
        handleSelect={handleSelect}
      />

      <div className="stak-balance">
        <div className="stak-balance-price">
          <p className="stak-balance-title">Current Balance</p>
          <p className="stak-balance-num">$00.00</p>
        </div>

        <div className="stak-balance-line"></div>

        <div className="stak-btn-div">
          <div className="stak-first-div">
            <img src={deposit} alt="desposit" />
            <p className="deposit-p">Пополнить</p>
          </div>

          <div className="stak-first-div">
            <img src={withdraw} alt="withdraw" />
            <p className="deposit-p">Вывод</p>
          </div>
        </div>
      </div>

      <p className="stak-hist-title">История транзакций</p>
      <p className="stak-info-p">Пока нет транзакций</p>
    </div>
  );
}
