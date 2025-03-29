import { NavLink } from 'react-router-dom';
import { useTransactions } from '../Components/TransactionsContext';
import { useState } from 'react';

import box from './../Img/present.svg';
import arrowRight from './../Img/arrow-right.svg';
import coin from './../Img/coin.svg';
import deposit from './../Img/deposit.svg';
import withdraw from './../Img/withdraw.svg';
import Header from '../Components/Header/Header';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function Home() {
  const { transactions } = useTransactions();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.05,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
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
              <p className="deposit-p">Пополнить</p>
            </div>
            <div className="stak-first-div">
              <img src={withdraw} alt="withdraw" />
              <p className="deposit-p">Вывод</p>
            </div>
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

      <NavLink style={{ textDecoration: 'none' }} to="/Conclusioin">
        <div className="btn-more">
          <p>Узнать больше</p>
          <img src={arrowRight} alt="arrow" />
        </div>
      </NavLink>

      <NavLink style={{ textDecoration: 'none' }} to="/staking">
        <div className="btn-staking">Открыть стейкинг</div>
      </NavLink>
    </div>
  );
}
