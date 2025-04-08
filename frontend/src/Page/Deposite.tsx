import tonIcon from './../Img/TonCoin.svg';
import closen from './../Img/close.svg';
import { useEffect, useState } from 'react';
import BalanceBar from '../Components/BalanceBar/BalanceBar';
import coin from './../Img/coin.svg';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { CreateTransactionRequest, Wallet } from '../Components/Type';
import { transactionsApi } from '../Api/transactionsApi';
import { stakingApi } from '../Api/stakingApi';

export default function Deposite() {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<Wallet>();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    // Получаем данные из localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }

    const fetchWallet = async () => {
      try {
        const wallet: Wallet = await stakingApi.getWallet();
        setWallet(wallet);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWallet();
  }, []);

  const handleDeposit = async (amount: number) => {
    if (!wallet) {
      return;
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: [
        {
          address: wallet.wallet,
          amount: (amount * 1e9).toString(),
        },
      ],
    };

    try {
      await tonConnectUI.sendTransaction(transaction);
      const data: CreateTransactionRequest = {
        user_id: user.id,
        amount: amount,
        operation_type: 'deposit' as 'deposit', // или 'withdraw' as 'withdraw'
      };

      await transactionsApi.createTransaction(data);

      alert('Транзакция отправлена');
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при отправке транзакции:', error);
      alert('Ошибка при отправке транзакции');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/[^0-9.]/g, '');

    if (numericValue.split('.').length > 2) {
      return;
    }

    setAmount(numericValue);
  };

  const isButtonDisabled = amount.trim() === '' || parseFloat(amount) <= 0;

  return (
    <div className="withdraw-container">
      <h1 className="withdraw-title">Пополнение</h1>

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
              style={{ paddingLeft: '5px' }}
              onClick={() => setAmount('')}
              alt="TON"
            />
            <p className="USDT-p" style={{ paddingRight: '5px' }}>
              TON
            </p>
          </div>
        </div>
      </div>

      <button
        disabled={isButtonDisabled}
        onClick={() => handleDeposit(Number(amount))}
        className={`conclu-btn ${isButtonDisabled ? 'disabled' : 'active'}`}
      >
        Подтвердить пополнение
      </button>
    </div>
  );
}
