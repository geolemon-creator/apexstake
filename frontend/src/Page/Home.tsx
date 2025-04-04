import { NavLink, useNavigate } from 'react-router-dom';
import { useTransactions } from '../Components/TransactionsContext';

import box from './../Img/present.svg';
import arrowRight from './../Img/arrow-right.svg';
import coin from './../Img/coin.svg';
import deposit from './../Img/deposit.svg';
import withdraw from './../Img/withdraw.svg';
import tonIcon from './../Img/TonCoin.svg';
import Header from '../Components/Header/Header';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import BalanceBar from '../Components/BalanceBar/BalanceBar';
import ConnectWalletModal from '../Components/ConnectWalletModal/ConnectWalletModal';
import { useTonAddress } from '@tonconnect/ui-react';

export default function Home() {
  const { transactions } = useTransactions();
  const [isModalConnect, setIsModalConnect] = useState(false);
  const userFriendlyAddress = useTonAddress();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем данные из localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }
  }, []);

  const handleNavigation = (route: string) => {
    if (!userFriendlyAddress) {
      // Если нет userFriendlyAddress, показываем модальное окно
      setIsModalConnect(true);
    } else {
      // Если адрес есть, переходим по нужному маршруту
      navigate(route);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.05,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <div className="home-countainer">
      <Header />

      <div className="home-lower-catalog">
        <Slider {...settings}>
          <div>
            <div className="home-reward">
              <div className="rewad-text">
                <h1 className="reward-h1">Ежедневная награда</h1>
                <p className="reward-p">Успей забрать</p>
              </div>

              <img className="reward-img" src={box} alt="img" />
            </div>
          </div>

          <div>
            <div className="home-reward">
              <div className="rewad-text">
                <h1 className="reward-h1">Ежедневная награда</h1>
                <p className="reward-p">Успей забрать</p>
              </div>

              <img className="reward-img" src={box} alt="img" />
            </div>
          </div>

          <div>
            <div className="home-reward">
              <div className="rewad-text">
                <h1 className="reward-h1">Ежедневная награда</h1>
                <p className="reward-p">Успей забрать</p>
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
            <p className="title-price">
              <img
                src={tonIcon}
                alt="ton"
                width={20}
                height={20}
                style={{ marginRight: '5px' }}
              />
              {user?.balance}
            </p>
          </div>

          <div className="balance-bonus">
            <p className="balance-bonus-title">Bonus</p>
            <img className="balance-bonus-img" src={coin} />
            <p className="bonus-num">{user?.tokens}</p>
          </div>

          <BalanceBar
            balance={user?.balance}
            blockedBalance={user?.blocked_balance}
          />

          <div className="stak-btn-div">
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/deposite"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/deposite'); // Навигация к маршруту пополнения
              }}
            >
              <div className="stak-first-div">
                <img src={deposit} alt="desposit" />
                <p className="deposit-p">Пополнить</p>
              </div>
            </NavLink>
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/conclusioin"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/conclusioin'); // Навигация к маршруту вывода
              }}
            >
              <div className="stak-first-div">
                <img src={withdraw} alt="withdraw" />
                <p className="deposit-p">Вывод</p>
              </div>
            </NavLink>
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

      <NavLink style={{ textDecoration: 'none' }} to="/">
        <div className="btn-more">
          <p>Узнать больше</p>
          <img src={arrowRight} alt="arrow" />
        </div>
      </NavLink>

      <NavLink style={{ textDecoration: 'none' }} to="/staking">
        <div className="btn-staking">Открыть стейкинг</div>
      </NavLink>
      {isModalConnect && (
        <ConnectWalletModal closeModal={() => setIsModalConnect(false)} />
      )}
    </div>
  );
}
