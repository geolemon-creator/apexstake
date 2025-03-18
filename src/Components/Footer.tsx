import home from './../Img/home.png';
import staking from './../Img/staking.png';
import store from './../Img/store.png';
import competitions from './../Img/competitions.png';
import frens from './../Img/frens (1).png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div className='footer-countainer'>
      <ul className='footer-ul'>
        <NavLink to="/">
          <li
            className={`footer-li ${activeButton === 0 ? 'active' : ''}`}
            onClick={() => handleButtonClick(0)}
          >
            <img src={home} alt="home" />
          </li>
        </NavLink>

        <NavLink to="/staking">
          <li
            className={`footer-li ${activeButton === 1 ? 'active' : ''}`}
            onClick={() => handleButtonClick(1)}
          >
            <img src={staking} alt="staking" />
          </li>
        </NavLink>

        <NavLink to="/referal">
          <li
            className={`footer-li ${activeButton === 2 ? 'active' : ''}`}
            onClick={() => handleButtonClick(2)}
          >
            <img src={store} alt="store" />
          </li>
        </NavLink>

        <NavLink to="/contest">
          <li
            className={`footer-li ${activeButton === 3 ? 'active' : ''}`}
            onClick={() => handleButtonClick(3)}
          >
            <img src={competitions} alt="competitions" />
          </li>
        </NavLink>

        <li
          className={`footer-li ${activeButton === 4 ? 'active' : ''}`}
          onClick={() => handleButtonClick(4)}
        >
          <img src={frens} alt="frens" />
        </li>
      </ul>
    </div>
  );
}