import { NavLink } from "react-router-dom";
import box from "./../Img/present.svg";
import arrowRight from "./../Img/arrow-right.svg";
import arrowDown from "./../Img/arrow-down.svg";

import coin from "./../Img/coin.png";

export default function Home() {
  return (
    <div className="home-countainer">
      <div className="home-top-catlog">
        <div className="home-user">
          <div className="user-icon"></div>
          <p className="home-user-p">UserName</p>
        </div>

        <div className="home-level">
          <p className="level-p">Выбор уровня</p>
          <span className="arrow">&gt;</span>
        </div>
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
        <p className="home-info">Данные появятся после начала стейкинга</p>
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
