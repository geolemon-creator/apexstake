import { NavLink, useNavigate } from 'react-router-dom';
import { useTransactions } from '../Components/TransactionsContext';

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
import { Banner } from '../Components/Type';
import { stakingApi } from '../Api/stakingApi';

export default function Home() {
  const { transactions } = useTransactions();
  const [isModalConnect, setIsModalConnect] = useState(false);
  const userFriendlyAddress = useTonAddress();
  const [user, setUser] = useState<any>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем данные из localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }

    const fetchBannersList = async () => {
      try {
        const bannersList: Banner[] = await stakingApi.getBanners();
        setBanners(bannersList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBannersList();
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

  const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: 'block',
          left: 0,
          zIndex: 2,
          cursor: 'pointer',
        }}
        onClick={onClick}
      />
    );
  };

  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: 'block',
          right: 0,
          zIndex: 2,
          cursor: 'pointer',
        }}
        onClick={onClick}
      ></div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.05,
    slidesToScroll: 1,
    swipeToSlide: true,

    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  console.log(banners, 'ban');
  return (
    <div className="home-countainer">
      <Header />

      <div className="home-lower-catalog">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div
              key={index}
              style={{ userSelect: 'none' }}
              onClick={() => window.open(banner.link, '_blank')}
            >
              <div className="home-reward">
                <div className="rewad-text">
                  <h1 className="reward-h1">{banner.title}</h1>
                  <p className="reward-p">{banner.description}</p>
                </div>
                <img className="reward-img" src={banner.img} alt="img" />
              </div>
            </div>
          ))}
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
                handleNavigation('/deposite');
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

      <NavLink style={{ textDecoration: 'none' }} to="/">
        <div className="btn-more">
          <p>Узнать больше о проекте</p>
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
