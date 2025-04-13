import { useState } from 'react';
import closen from './../Img/close.svg';
import { useTranslation } from 'react-i18next';

export default function Transfers() {
  const [valueUsdt, setValueUsdt] = useState('');
  const { t } = useTranslation('transfers');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueUsdt(event.target.value);
  };

  const isButtonDisabled =
    valueUsdt.trim() === '' || parseFloat(valueUsdt) <= 0;
  return (
    <div className="transfer-countainer">
      <div className="staking-container">
        <div className="staking-box">
          <div className="st-text-header">
            <p className="text-steking">{t('staking')}</p>
            <p className="text-USDT-transfers">
              TON<span>{'>'}</span>
            </p>
          </div>

          <div className="st-text-second-header">
            <div className="text-max-balance">
              <div className="transfer-max">{t('max')}</div>
              <p className="trans-balance-p">{t('balance')}</p>
            </div>
            <p className="trans-head-num">33</p>
          </div>
        </div>

        <div className="swap-button">&#8645;</div>

        <div className="staking-box box-two">
          <div className="st-text-bottom">
            <p className="text-steking">{t('main_balance')}</p>
            <p className="text-USDT-transfers">
              TON<span>{'>'}</span>
            </p>
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
            <p className="USDT-p">TON</p>
            <p className="ВСЕ-p">{t('all')}</p>
          </div>
        </div>

        {isButtonDisabled ? (
          <></>
        ) : (
          <div className="commission-div-p com-two">
            <p className="commission-p">Комиссия 10%=30 TON</p>
          </div>
        )}

        <button
          disabled={isButtonDisabled}
          className={`conclu-btn conclu-btn-two ${
            isButtonDisabled ? 'disabled' : 'active'
          }`}
        >
          {t('confirm_withdraw')}
        </button>
      </div>
    </div>
  );
}
