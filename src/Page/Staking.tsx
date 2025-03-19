import { useState } from "react";
import deposit from "./../Img/Deposit.png";
import withdraw from "./../Img/Withdraw.png";
import { level } from "../Components/Data";
import Level from "../Components/Level";

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

        <div className="home-level">
          <p className="level-p">Выбор уровня</p>
          <span onClick={handleOpenModal} className="arrow">
            &gt;
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="levels-list">
              <button className="level-btn-win">
                Выбор уровня{" "}
                <span
                  onClick={handleCloseModal}
                  className="level-btn-win-arrow"
                >
                  &gt;
                </span>
              </button>

              {level.map((level) => (
                <Level
                  selectedLevel={selectedLevel}
                  onSelect={handleSelect}
                  key={level.id}
                  data={level}
                />
              ))}
            </div>
          </div>
        </div>
      )}

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
