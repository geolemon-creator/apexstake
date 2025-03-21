import { useState } from "react";
import closen from "./../Img/close.svg";


export default function Transfers() {
  const [valueUsdt, setValueUsdt] = useState("");
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueUsdt(event.target.value);
  };

  const isButtonDisabled = valueUsdt.trim() === "" || parseFloat(valueUsdt) <= 0;
  return (
<div className="transfer-countainer">
    <div className="staking-container">
            
      <div className="staking-box">
      
          <div className="st-text-header">
            <p className="text-steking">Стайкинг</p>
            <p className="text-USDT-transfers">USDT<span>{">"}</span></p>
          </div>

          <div className="st-text-second-header">
              <div className="text-max-balance">
                  <div className="transfer-max">Макс</div>
                  <p className="trans-balance-p">Баланс</p>
              </div>
              <p className="trans-head-num">33</p>
          </div>
      </div>
      
      <div className="swap-button">&#8645;</div>
      
      <div className="staking-box box-two">

          <div className="st-text-bottom">
            <p className="text-steking">Основной баланс</p>
            <p className="text-USDT-transfers">USDT<span>{">"}</span></p>
          </div>

          <div className="st-text-second-bottom">
              <p className="trans-head-num">0</p>
          </div>
      </div>

      <div className="conclu-div-usdt">
          <input
            className="usdt-input"
            type="number"
            value={valueUsdt}
            onChange={handleInputChange}
            placeholder="0"
          />

          <div className="usdt-input-div">
            <img src={closen} alt="" />
            <p className="USDT-p">USDT</p>
            <p className="ВСЕ-p">ВСЕ</p>
          </div>
        </div>

        {isButtonDisabled ? (<></>) : (<div className="commission-div-p com-two"><p className="commission-p">Комиссия 10%=30 USDT</p></div>)}

      <button disabled={isButtonDisabled} className={`conclu-btn conclu-btn-two ${isButtonDisabled ? "disabled" : "active"}`}>
        Подтвердить вывод
      </button>

    </div>
</div>
  )
}
