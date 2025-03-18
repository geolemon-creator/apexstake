import { useState } from "react";
import deposit from "./../Img/Deposit.png"
import withdraw from "./../Img/Withdraw.png"
import firstdiamond from "./../Img/first-diamond.png"
import middlediamond from "./../Img/middle-diamond.png"
import advanced from "./../Img/advanced-diamond.png"
import expert from "./../Img/expert-diamond.png"

export default function Staking() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
    const [selectedLevel, setSelectedLevel] = useState(null); // Состояние для выбранного уровня

  const handleOpenModal = () => {
    setIsModalOpen(true); // Открываем модальное окно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
  };


  return (
    <div className='staking-countainer'>

        <div className="home-top-catlog">

            <div className="home-user">
                <div className="user-icon"></div>
                <p className="home-user-p">UserName</p>
            </div>

            <div className="home-level">
                <p className="level-p">Выбор уровня</p> <span onClick={handleOpenModal} className="arrow">&gt;</span>
            </div>
        </div>

        {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="levels-list">

             <button className="level-btn-win">Выбор уровня <span onClick={handleCloseModal} className="level-btn-win-arrow">&gt;</span></button>

              <div className="level-item">
                <div className="header-list-item">
                    <p className="level-p-header">Уровень</p>
                    <div className="diamond-div">
                        <img className="level-img" src={firstdiamond} alt="dimond" />
                        <p className="level-title">Начальный</p>
                        <span className="level-arrow">&gt;</span>
                    </div>
                </div>
                <p className="level-percent">Процентная ставка: 44%</p>
              </div>

              <div className="level-item">
                <div className="header-list-item">
                    <p className="level-p-header">Уровень</p>
                    <div className="diamond-div">
                        <img className="level-img" src={middlediamond} alt="dimond" />
                        <p className="mid">Средний</p>
                        <span className="level-arrow">&gt;</span>
                    </div>
                </div>
                <p className="level-percent">Процентная ставка: 68%</p>
              </div>

              <div className="level-item">
                <div className="header-list-item">
                    <p className="level-p-header">Уровень</p>
                    <div className="diamond-div">
                        <img className="level-img" src={advanced} alt="dimond" />
                        <p className="adv">Продвинутый</p>
                        <span className="level-arrow">&gt;</span>
                    </div>
                </div>
                <p className="level-percent">Процентная ставка: 104%</p>
              </div>

              <div className="level-item">
                <div className="header-list-item">
                    <p className="level-p-header">Уровень</p>
                    <div className="diamond-div">
                        <img className="level-img" src={expert} alt="dimond" />
                        <p className="expert">Эксперт</p>
                        <span className="level-arrow">&gt;</span>
                    </div>
                </div>
                <p className="level-percent">Процентная ставка: 140%</p>
              </div>

            </div>
          </div>
        </div>
      )}

        <div className='stak-balance'>

            <div className='stak-balance-price'>
                <p className="stak-balance-title">Current Balance</p>
                <p className="stak-balance-num">$00.00</p>
            </div>

            <div className='stak-balance-line'></div>

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
  )
}
