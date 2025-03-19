import { useState } from "react";
import deposit from "./../Img/Deposit.png";
import withdraw from "./../Img/Withdraw.png";
import { level } from "../Components/Data";
import Level from "../Components/Level";
import { levelID } from "./../Components/Type";
import almaz from "./../Img/almaz.png";
import close from "./../Img/close.svg";
import loading from "./../Img/loading.svg"
import success from "./../Img/success.svg"
import faled from "./../Img/faled.svg"

export default function Staking() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const [isLevelSelected, setIsLevelSelected] = useState(false);
  const [selectedLevelData, setSelectedLevelData] = useState<levelID | null>(null);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [thirdModalData, setThirdModalData] = useState<levelID | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Состояние загрузки
  const [isSelectionComplete, setIsSelectionComplete] = useState<boolean>(false); // Состояние завершения выбора
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // Состояние успешности загрузки

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLevelSelected(false);
    setSelectedLevel(null);
    setSelectedLevelData(null);
  };

  const handleSelect = (id: number) => {
    console.log("Уровень выбран:", id);
    const selectedData = level.find((lvl) => lvl.id === id);
    if (selectedData) {
      setSelectedLevelData(selectedData);
    }
    setSelectedLevel(id);
    setIsLevelSelected(true);
  };

  const handleOpenThirdModal = () => {
    setIsThirdModalOpen(true);
    setThirdModalData(selectedLevelData);
    setIsModalOpen(false);
    setIsLevelSelected(false);
  };

  const handleCloseThirdModal = () => {
    setIsThirdModalOpen(false);
    setIsSelectionComplete(false); // Сбрасываем состояние завершения выбора
    setIsSuccess(null); // Сбрасываем состояние успешности
  };

  const handleSelectLevel = () => {
    setIsLoading(true); // Начинаем загрузку

    // Имитируем загрузку с помощью Promise
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5; // 50% шанс успеха
        if (isSuccess) {
          resolve();
        } else {
          reject();
        }
      }, 2000); // Загрузка длится 2 секунды
    })
      .then(() => {
        setIsSuccess(true); // Успешная загрузка
      })
      .catch(() => {
        setIsSuccess(false); // Ошибка загрузки
      })
      .finally(() => {
        setIsLoading(false); // Загрузка завершена
        setIsSelectionComplete(true); // Показываем новую разметку
      });
  };

  return (
    <div className="staking-countainer">
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
              {isLevelSelected && selectedLevelData ? (
                <div className="modal-overlay-check">
                  <div className="basic-lvl-div">
                    <div className="bas-nor-block">
                      <div className="title-lvl-div">
                        <p className="basic-lvl-p">Уровень:</p>
                        <div className="title-lvl-ab-div">
                          <img className="lvl-img" src={selectedLevelData.img} alt="diamond" />
                          <p className="lvl-p">{selectedLevelData.title}</p>
                        </div>
                      </div>
                      <img className="schedule-img" src={selectedLevelData.schedule} alt="" />
                    </div>

                    <div className="data-lvl-div">
                      <div className="data-lvl-text">
                        <p className="data-lvl-first-p">Дата ставки:</p>
                        <p className="data-lvl-second-p">15-03-2025</p>
                      </div>

                      <div className="data-lvl-text">
                        <p className="data-lvl-first-p">Период начисления процентов:</p>
                        <p className="data-lvl-second-p">1 день</p>
                      </div>

                      <div className="data-lvl-text big-p">
                        <p className="data-lvl-first-p">Дата окончания начисления <br /> процентов:</p>
                        <p className="data-lvl-second-p">15-04-2025</p>
                      </div>

                      <div className="data-lvl-text">
                        <p className="data-lvl-first-p">Срок погашения:</p>
                        <p className="data-lvl-second-p">15-04-2025</p>
                      </div>

                      <div className="data-lvl-text">
                        <p className="data-lvl-first-p">Дата погашения:</p>
                        <p className="data-lvl-second-p">1 день</p>
                      </div>

                      <div className="data-lvl-text">
                        <p className="data-lvl-first-p">Процентная ставка:</p>
                        <p className="data-lvl-second-p">44%</p>
                      </div>

                      <div className="data-lvl-text">
                        <p className="data-lvl-first-p">Предполагаемые проценты:</p>
                        <p className="data-lvl-second-p">1,49959500 TON</p>
                      </div>
                    </div>
                  </div>

                  <div className="agreement-div">
                    <div className="agr-div-chekbox">
                      <label className="custom-checkbox">
                        <input type="checkbox" id="myCheckbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <a className="agreement-a" href="#">
                      Я ознакомился с Соглашением об оказании услуг по размещению ставок и согласен с ним
                    </a>
                  </div>

                  <button onClick={handleOpenThirdModal} className="basic-lvl-btn">Выбрать</button>
                </div>
              ) : (
                <>
                  <button className="level-btn-win">
                    Выбор уровня <span onClick={handleCloseModal} className="level-btn-win-arrow">&gt;</span>
                  </button>
                  {level.map((level) => (
                    <Level selectedLevel={selectedLevel} onSelect={handleSelect} key={level.id} data={level} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isThirdModalOpen && thirdModalData && (
        <div className="modal-overlay" onClick={handleCloseThirdModal}>
          <div className="modal-thrid" onClick={(e) => e.stopPropagation()}>
            <div className="third-modal-content">
              <img className="close-modal-thrid" onClick={handleCloseThirdModal} src={close} alt="close" />
              <div className="main-block-thrid">
                <div className="third-header">
                  <img className="thrid-modal-img" src={thirdModalData.img} alt="img" />
                  <h2 className="thrid-modal-title">{thirdModalData.title}</h2>
                </div>

                <div className="thrid-main-div">
                  <img className="thrid-almaz" src={almaz} alt="almaz" />
                  <p className="thrid-num">{thirdModalData.ton}</p>
                </div>

                {isLoading ? (
                <>
                  <div className="loading-spinner">
                    <img className="promise-trans-img" src={loading} alt="icon" />
                    <p className="promise-p load-color">В прогрессе</p>
                  </div>

                      <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Кошелёк</p>
                          <p className="wallet-title">UQATfAg...JiCDYY%b</p>
                        </div>
                      </div>

                      <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Дата</p>
                          <p className="wallet-title">15-03-2025 18:35:46</p>
                        </div>
                      </div>

                      <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Номер тразакции</p>
                          <p className="wallet-title">23434546565645576</p>
                        </div>
                      </div>
                </>
                
                ) : isSelectionComplete ? (
                  isSuccess ? (
                    <>
                    <div className="loading-spinner">
                      <img className="promise-trans-img" src={success} alt="" />
                      <p className="promise-p green-color">Успешно</p>
                    </div>

                      <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Кошелёк</p>
                          <p className="wallet-title">UQATfAg...JiCDYY%b</p>
                        </div>
                      </div>

                      <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Дата</p>
                          <p className="wallet-title">15-03-2025 18:35:46</p>
                        </div>
                      </div>

                      <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Номер тразакции</p>
                          <p className="wallet-title">23434546565645576</p>
                        </div>
                      </div>
                    </>

                  ) : (
                    <>
                    <div className="loading-spinner">
                      <img className="promise-trans-img" src={faled} alt="icon" />
                      <p className="promise-p red-color">Ошибка</p>
                    </div> 

                    <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Кошелёк</p>
                          <p className="wallet-title">UQATfAg...JiCDYY%b</p>
                        </div>
                      </div>

                      <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Дата</p>
                          <p className="wallet-title">15-03-2025 18:35:46</p>
                        </div>
                      </div>

                      <div className="data-wallet">
                        <div className="wallet-div">
                          <p className="wallet-p">Номер тразакции</p>
                          <p className="wallet-title">23434546565645576</p>
                        </div>
                      </div>
                    
                    <button className="thrid-repeat-btn" onClick={handleSelectLevel}>Повторить</button>
                    </>
                  )
                ) : (
                  <button onClick={handleSelectLevel} className="thrid-main-button">Выбрать</button>
                )}
              </div>
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

      <div>
        <p className="stak-hist-title">История транзакций</p>
      </div>

      <p className="stak-info-p">Пока нет транзакций</p>
    </div>
  );
}
