import { useEffect, useRef, useState } from 'react';
import { tansactions } from '../Components/Data';
import TansactionItem from '../Components/TransactionItem/TansactionItem';
import calendar from './../Img/calendar.svg';
import { Select } from 'antd';
import { useTransactions } from '../Components/TransactionsContext';
import StakingBalance from '../Components/StakingBalance/StakingBalance';
import Header from '../Components/Header/Header';

export default function Staking() {
  const [isHistoryTrans, setIsHistoryTrans] = useState<boolean>(false);
  const [openDateBtn, setOpenDateBtn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setTransactions } = useTransactions();

  useEffect(() => {
    setTransactions(tansactions);
  }, [setTransactions]);

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
    // Если выбрана история транзакций то показывать её, в обратном случае header и stakingInfo
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
          <Header />
          <StakingBalance />

          {/* Блок Title истории транзакций */}
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

            {/* Блок история транзакций */}
            {tansactions.length === 0 ? (
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
