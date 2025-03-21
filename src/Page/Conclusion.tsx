import scanner from "./../Img/scanner.svg";
import closen from "./../Img/close.svg";
import { useState } from "react";

export default function Withdraw() {
  const [valueUsdt, setValueUsdt] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueUsdt(event.target.value);
  };

  const isButtonDisabled = valueUsdt.trim() === "" || parseFloat(valueUsdt) <= 0;

  return (
    <div className="withdraw-container">
      <h1 className="withdraw-title">Вывод</h1>

      <div className="balance-card">
        <p className="balance-label">Current Balance</p>
        <h1 className="balance-amount">$ 333.00</h1>
        <div className="profit-div">
          <p className="profit">+ $42 ▲ 6.37%</p>
          <p className="profit-day">• 7 Day</p>
        </div>

        <div className="progress-bar-div">
          <div className="progress-bar"></div>
        </div>

        <div className="balance-details">
          <div className="activ-balance-div">
            <p className="active-balance-title">Активный баланс </p>
            <p className="active-balance">300,00 $</p>
          </div>

          <div className="blocked-balance-div">
            <p className="blocked-balance-title">Заблокировано</p>
            <p className="blocked-balance">33,00 $</p>
          </div>
        </div>
      </div>

      <div className="conclu-input-div">
        <div className="conclu-div-adres">
          <input className="conclu-input-adres" type="text" placeholder="Адрес" />

          <div className="insert-div-input">
            <p className="insert-p">Вставить</p>
            <img className="insert-scanner" src={scanner} alt="" />
          </div>
        </div>

        <div className="conclu-div-usdt">
          <input className="usdt-input" type="number" value={valueUsdt} onChange={handleInputChange} placeholder="0"/>

          <div className="usdt-input-div">
            <img src={closen} alt="" />
            <p className="USDT-p">USDT</p>
            <p className="ВСЕ-p">ВСЕ</p>
          </div>
        </div>
      </div>

    {isButtonDisabled ? (<></>) : (<div className="commission-div-p"><p className="commission-p">Комиссия 10%=30 USDT</p></div>)}

      <button disabled={isButtonDisabled} className={`conclu-btn ${isButtonDisabled ? "disabled" : "active"}`}>
        Подтвердить вывод
      </button>

    </div>
  );
}