import closen from './../Img/close.svg';
import { useEffect, useState } from 'react';
import BalanceBar from '../Components/BalanceBar/BalanceBar';
import coin from './../Img/coin.svg';
import tonIcon from './../Img/TonCoin.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import { transactionsApi } from '../Api/transactionsApi';
import { CreateTransactionRequest } from '../Components/Type';
import { Commission } from '../Components/Type';
import { stakingApi } from '../Api/stakingApi';
import { useNavigate } from 'react-router-dom';

export default function Withdraw() {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState<any>(null);
  const [commission, setCommission] = useState<Commission | null>(null);
  const navigate = useNavigate();

  const userFriendlyAddress = useTonAddress();
  const commissionAmount =
    commission && amount
      ? ((parseFloat(amount) * commission.percent) / 100).toFixed(2)
      : '0.00';

  const fetchCommission = async () => {
    try {
      const getCommission = await stakingApi.getCommission();
      setCommission(getCommission);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Получаем данные из localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }

    fetchCommission();
  }, []);

  const handleWithdraw = async (amount: number) => {
    try {
      const data: CreateTransactionRequest = {
        user_id: user.id,
        amount: amount,
        operation_type: 'withdraw' as 'withdraw', // или 'withdraw' as 'withdraw'
      };

      await transactionsApi.createTransaction(data);

      alert('Ожидайте подтверждение вывода!');
      navigate('/staking');
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при отправке транзакции:', error);
      alert('Ошибка при отправке транзакции');
    }
  };

  const shortenAddress = (address: string) => {
    // Проверим, что адрес длиннее 10 символов
    if (address.length > 10) {
      return `${address.slice(0, 12)}...${address.slice(-6)}`;
    }
    return address; // Если адрес короткий, не обрезаем
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/[^0-9.]/g, '');

    if (numericValue.split('.').length > 2) {
      return;
    }

    setAmount(numericValue);
  };
  const handleSetMaxValue = () => {
    if (user && user.balance) {
      setAmount(user.balance.toString()); // Преобразуем в строку при установке
    }
  };

  const isButtonDisabled = amount.trim() === '' || parseFloat(amount) <= 0;

  return (
    <div className="withdraw-container">
      <h1 className="withdraw-title">Вывод</h1>

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
      </div>

      <div className="conclu-input-div">
        <div className="conclu-div-adres">
          <input
            className="conclu-input-adres"
            type="text"
            placeholder="Адрес"
            disabled
            value={shortenAddress(userFriendlyAddress)}
          />
        </div>

        <div className="conclu-div-usdt">
          <input
            className="usdt-input"
            value={amount}
            onChange={handleInputChange}
            placeholder="0"
          />

          <div className="usdt-input-div">
            <img
              src={closen}
              onClick={() => setAmount('')}
              alt="close"
              style={{ marginLeft: '5px' }}
            />
            <p className="USDT-p">TON</p>
            <p className="ВСЕ-p" onClick={handleSetMaxValue}>
              ВСЕ
            </p>
          </div>
        </div>
      </div>

      {isButtonDisabled ? (
        <></>
      ) : (
        <div className="commission-div-p">
          <p className="commission-p">
            Комиссия {commission?.percent} = {commissionAmount} TON
          </p>
        </div>
      )}

      <button
        disabled={isButtonDisabled}
        onClick={() => handleWithdraw(Number(amount))}
        className={`conclu-btn ${isButtonDisabled ? 'disabled' : 'active'}`}
      >
        Подтвердить вывод
      </button>
    </div>
  );
}
