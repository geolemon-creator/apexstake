import { useEffect, useRef, useState } from 'react';
import { level } from '../Components/Data';
import Level from '../Components/Level';
import { levelID } from './../Components/Type';
import almaz from './../Img/almaz.png';
import loading from './../Img/loading.svg';
import success from './../Img/success.svg';
import faled from './../Img/faled.svg';
import { tansactions } from '../Components/Data';
import TansactionItem from '../Components/TransactionHistory/TansactionItem';
import calendar from './../Img/calendar.svg';
import { Select } from 'antd';
import { useTransactions } from '../Components/TransactionsContext';
import { NavLink } from 'react-router-dom';
import StakingBalance from '../Components/StakingBalance/StakingBalance';

export default function Staking() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isLevelSelected, setIsLevelSelected] = useState(false);
  const [selectedLevelData, setSelectedLevelData] = useState<levelID | null>(
    null
  );
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [thirdModalData, setThirdModalData] = useState<levelID | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelectionComplete, setIsSelectionComplete] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [dopWord, setDopWord] = useState<boolean>(false);
  const [isHistoryTrans, setIsHistoryTrans] = useState<boolean>(false);
  const [openDateBtn, setOpenDateBtn] = useState(false);
  const [tonModulOpen, setTonModulOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [levels, setLevels] = useState(level);
  const { setTransactions } = useTransactions();

  useEffect(() => {
    setTransactions(tansactions);
  }, [setTransactions]);

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
    console.log('Уровень выбран:', id);
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
    setDopWord(false);
  };

  const handleCloseThirdModal = () => {
    setIsThirdModalOpen(false);
    setIsSelectionComplete(false); // Сбрасываем состояние завершения выбора
    setIsSuccess(null); // Сбрасываем состояние успешности
  };

  const handleSelectLevel = () => {
    setIsLoading(true);
    setDopWord(true);

    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          resolve();
        } else {
          reject();
        }
      }, 2000);
    })
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsSelectionComplete(true);
      });
  };

  const parseCustomDate = (dateString: string): Date => {
    const now = new Date();
    const [dayPart, timePart] = dateString.split(', ');

    let date = new Date(now);

    if (dayPart === 'Вчера') {
      date.setDate(now.getDate() - 1);
    }

    const [hours, minutes] = timePart.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    return date;
  };

  // TODO: Дать понятные имена a, b
  const sortedTransactions = [...tansactions].sort((a, b) => {
    const dateA = parseCustomDate(a.date);
    const dateB = parseCustomDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const openHistory = () => {
    setIsHistoryTrans(true);
  };

  const openBtnHist = () => {
    setOpenDateBtn(!openDateBtn);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDateBtn(false);
    }
  };

  useEffect(() => {
    if (openDateBtn) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDateBtn]);

  return (
    <div className="staking-countainer">
      {isHistoryTrans ? (
        <div className="hist-countainer">
          <div className="hist-p-div">
            <p className="hist-p">История транзакций</p>
          </div>

          <div className="hist-btn-main-div">
            <div className="hist-btn-div">
              <Select
                defaultValue="Все"
                popupClassName="custom-dropdown"
                className="custom-select"
                options={[
                  { value: 'Все', label: <span>Все</span> },
                  { value: 'Пополнения', label: <span>Пополнения</span> },
                  { value: 'Начисления', label: <span>Начисления</span> },
                  { value: 'Прибыли', label: <span>Прибыли</span> },
                  { value: 'Выводы', label: <span>Выводы</span> },
                ]}
              />
              <div className="his-date-btn-div" ref={dropdownRef}>
                <button className="his-date-btn">
                  <img
                    onClick={openBtnHist}
                    className="his-date-btn-img"
                    src={calendar}
                    alt=""
                  />
                </button>
                {openDateBtn && (
                  <div className="dropdown-menu">
                    <div className="hist-btn-day-div">
                      <div className="hist-btn-day-flex-div">
                        <button className="hist-btn-day">1 день</button>
                        <button className="hist-btn-day">1 неделя</button>
                        <button className="hist-btn-day">1 месяц</button>
                      </div>
                    </div>

                    <div className="hist-btn-date-div">
                      <div className="hist-btn-day-flex-div">
                        <button className="hist-btn-day">15-01-2025</button>
                        <p className="hist-btn-p">По</p>
                        <button className="hist-btn-day">15-01-2025</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hist-trans-main-div">
            <div className="hist-trans-list-div">
              {sortedTransactions.map((tansactions) => (
                <TansactionItem key={tansactions.id} data={tansactions} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="home-top-catlog">
            <NavLink to="/profile">
              <div className="home-user">
                <div className="user-icon"></div>
                <p className="home-user-p">UserName</p>
              </div>
            </NavLink>

            <div className="home-level">
              <p className="level-p">Выбор уровня</p>{' '}
              <span onClick={handleOpenModal} className="arrow">
                &gt;
              </span>
            </div>
          </div>

          <>
            {/* TODO: Вынести в отдельный компонент */}
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
                                <img
                                  className="lvl-img"
                                  src={selectedLevelData.img}
                                  alt="diamond"
                                />
                                <p className="lvl-p">
                                  {selectedLevelData.title}
                                </p>
                              </div>
                            </div>
                            <img
                              className="schedule-img"
                              src={selectedLevelData.schedule}
                              alt=""
                            />
                          </div>

                          <div className="data-lvl-div">
                            <div className="data-lvl-text">
                              <p className="data-lvl-first-p">Дата ставки:</p>
                              <p className="data-lvl-second-p">15-03-2025</p>
                            </div>

                            <div className="data-lvl-text">
                              <p className="data-lvl-first-p">
                                Период начисления процентов:
                              </p>
                              <p className="data-lvl-second-p">1 день</p>
                            </div>

                            <div className="data-lvl-text big-p">
                              <p className="data-lvl-first-p">
                                Дата окончания начисления <br /> процентов:
                              </p>
                              <p className="data-lvl-second-p">15-04-2025</p>
                            </div>

                            <div className="data-lvl-text">
                              <p className="data-lvl-first-p">
                                Срок погашения:
                              </p>
                              <p className="data-lvl-second-p">15-04-2025</p>
                            </div>

                            <div className="data-lvl-text">
                              <p className="data-lvl-first-p">
                                Дата погашения:
                              </p>
                              <p className="data-lvl-second-p">1 день</p>
                            </div>

                            <div className="data-lvl-text">
                              <p className="data-lvl-first-p">
                                Процентная ставка:
                              </p>
                              <p className="data-lvl-second-p">44%</p>
                            </div>

                            <div className="data-lvl-text">
                              <p className="data-lvl-first-p">
                                Предполагаемые проценты:
                              </p>
                              <p className="data-lvl-second-p">
                                1,49959500 TON
                              </p>
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
                            Я ознакомился с Соглашением об оказании услуг по
                            размещению ставок и согласен с ним
                          </a>
                        </div>

                        <button
                          onClick={handleOpenThirdModal}
                          className="basic-lvl-btn"
                        >
                          Выбрать
                        </button>
                      </div>
                    ) : (
                      <>
                        <button className="level-btn-win">
                          Выбор уровня{' '}
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>

          <>
            {/* TODO: Вынести в отдельный компонент */}
            {isThirdModalOpen && thirdModalData && (
              <div className="modal-overlay" onClick={handleCloseThirdModal}>
                <div
                  className="modal-thrid"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="third-modal-content">
                    <img
                      className="close-modal-thrid"
                      onClick={handleCloseThirdModal}
                      src={close}
                      alt="close"
                    />
                    <div className="main-block-thrid">
                      {dopWord ? (
                        <p className="dettrans">Детали транзакции</p>
                      ) : (
                        <>
                          <div className="third-header">
                            <img
                              className="thrid-modal-img"
                              src={thirdModalData.img}
                              alt="img"
                            />
                            <h2 className="thrid-modal-title">
                              {thirdModalData.title}
                            </h2>
                          </div>
                        </>
                      )}
                      {dopWord && <p className="sum">Сумма</p>}

                      <div className="thrid-main-div">
                        <img className="thrid-almaz" src={almaz} alt="almaz" />

                        {isLoading ? (
                          <p className="thrid-num">{thirdModalData.ton}</p>
                        ) : isSuccess ? (
                          <p className="thrid-num">{thirdModalData.ton}</p>
                        ) : !isSuccess ? (
                          <input
                            className="input-thrid-num"
                            value={thirdModalData.ton}
                            type="number"
                            onChange={(e) => {
                              const updatedTon = Number(e.target.value);
                              const updatedLevels = levels.map((lvl) =>
                                lvl.id === thirdModalData.id
                                  ? { ...lvl, ton: updatedTon }
                                  : lvl
                              );
                              setLevels(updatedLevels);
                              setThirdModalData({
                                ...thirdModalData,
                                ton: updatedTon,
                              });
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>

                      {isLoading ? (
                        <>
                          <div className="loading-spinner">
                            <img
                              className="promise-trans-img"
                              src={loading}
                              alt="icon"
                            />
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
                              <p className="wallet-title">
                                15-03-2025 18:35:46
                              </p>
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
                              <img
                                className="promise-trans-img"
                                src={success}
                                alt=""
                              />
                              <p className="promise-p green-color">Успешно</p>
                            </div>

                            <div className="data-wallet">
                              <div className="wallet-div">
                                <p className="wallet-p">Кошелёк</p>
                                <p className="wallet-title">
                                  UQATfAg...JiCDYY%b
                                </p>
                              </div>
                            </div>

                            <div className="data-wallet">
                              <div className="wallet-div">
                                <p className="wallet-p">Дата</p>
                                <p className="wallet-title">
                                  15-03-2025 18:35:46
                                </p>
                              </div>
                            </div>

                            <div className="data-wallet">
                              <div className="wallet-div">
                                <p className="wallet-p">Номер тразакции</p>
                                <p className="wallet-title">
                                  23434546565645576
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="loading-spinner">
                              <img
                                className="promise-trans-img"
                                src={faled}
                                alt="icon"
                              />
                              <p className="promise-p red-color">Ошибка</p>
                            </div>

                            <div className="data-wallet">
                              <div className="wallet-div">
                                <p className="wallet-p">Кошелёк</p>
                                <p className="wallet-title">
                                  UQATfAg...JiCDYY%b
                                </p>
                              </div>
                            </div>

                            <div className="data-wallet">
                              <div className="wallet-div">
                                <p className="wallet-p">Дата</p>
                                <p className="wallet-title">
                                  15-03-2025 18:35:46
                                </p>
                              </div>
                            </div>

                            <div className="data-wallet">
                              <div className="wallet-div">
                                <p className="wallet-p">Номер тразакции</p>
                                <p className="wallet-title">
                                  23434546565645576
                                </p>
                              </div>
                            </div>

                            <button
                              className="thrid-repeat-btn"
                              onClick={handleSelectLevel}
                            >
                              Повторить
                            </button>
                          </>
                        )
                      ) : (
                        <button
                          onClick={handleSelectLevel}
                          className="thrid-main-button"
                        >
                          Выбрать
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>

          <StakingBalance />

          {/* TODO: Вынести в отдельный компонент TransactionHistory */}
          <>
            <div className="transactions-div">
              <div className="stak-hist-div">
                <p className="stak-hist-title">История транзакций</p>

                {tansactions.length === 0 ? (
                  <></>
                ) : (
                  <p onClick={openHistory} className="stak-hist-all">
                    Все
                  </p>
                )}
              </div>
            </div>

            {tansactions.length === 0 ? (
              // Вот тут массив и состояние от которое должно взаимодействовать с главным
              <>
                <p className="stak-info-p">Пока нет транзакций</p>
              </>
            ) : (
              <>
                <div className="transactions-main-div">
                  <div className="transactions-list-div">
                    {sortedTransactions.map((tansactions) => (
                      <TansactionItem key={tansactions.id} data={tansactions} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        </>
      )}
    </div>
  );
}
