import telegram from './../Img/telegram.svg';
import help from './../Img/help.svg';
import offers from './../Img/offers.svg';
import ok from './../Img/ok.svg';
import transWallet from './../Img/transWallet.svg';
import copy from './../Img/copy.svg';
import { useState, useEffect } from 'react';
import { getDecodedAvatarUrl } from '../Utils/decodeAvatar';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTonAddress } from '@tonconnect/ui-react';
import { usersApi } from '../Api/usersApi';
import { UpdateUserRequest } from '../Components/Type';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [isCopied, setIsCopied] = useState(false);
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  useEffect(() => {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      setUser(user); // Сохраняем данные пользователя
    }
  }, []);

  const fetchInvitedUsers = async (id: string, payload: UpdateUserRequest) => {
    try {
      await usersApi.updateUser(id, payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id && userFriendlyAddress && !user?.wallet) {
      const payload = {
        wallet: userFriendlyAddress,
      };
      fetchInvitedUsers(user.id, payload);

      const updatedUser = {
        ...user,
        wallet: userFriendlyAddress,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [userFriendlyAddress]);

  const shortenAddress = (address: string) => {
    // Проверим, что адрес длиннее 10 символов
    if (address.length > 10) {
      return `${address.slice(0, 12)}...${address.slice(-6)}`;
    }
    return address; // Если адрес короткий, не обрезаем
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(userFriendlyAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Возвращаем иконку через 2 секунды
      })
      .catch((err) => console.error('Ошибка копирования: ', err));
  };

  if (!user) {
    return <div></div>;
  }

  const avatarUrl = getDecodedAvatarUrl(user.avatar);

  return (
    <div className="profile-countainer">
      <div className="data-user">
        <img
          width={48}
          height={48}
          style={{ borderRadius: '100%' }}
          src={avatarUrl}
          alt="avatar"
        />
        <p className="user-name">{user.username}</p>
      </div>

      <div className="user-wallet-div">
        <div className="user-wallet">
          {!userFriendlyAddress ? (
            <>
              <p className="connect-wallet">Подключите ваш кошелек</p>

              <div className="about-connect-p-div">
                <p className="about-connect-p">
                  Для ввода/вывода средств подключайте свой TON кошелек
                </p>
              </div>

              <button
                onClick={() => tonConnectUI.openModal()}
                className="user-wallet-btn"
              >
                Подключить кошелек TON
              </button>
            </>
          ) : (
            <>
              <div className="main-open-div">
                <div className="open-wallet-header">
                  <div className="open-wallet-text">
                    <p className="open-wallet-p-first">ТОН Кошелек</p>
                    <div className="open-p-wallet-flex">
                      <p className="open-wallet-p-second">
                        Ваш кошелек подключен
                      </p>
                      <img className="open-p-img" src={ok} />
                    </div>
                  </div>
                  <img className="open-wall-img" src={transWallet} alt="" />
                </div>
              </div>

              <div className="adres-main-block">
                <div className="wallet-adres-div">
                  <p className="adres-p">
                    {shortenAddress(userFriendlyAddress)}
                  </p>
                  <img
                    onClick={handleCopyClick}
                    className="adress-copy-img"
                    src={isCopied ? ok : copy}
                    alt=""
                  />
                </div>
              </div>

              <div className="untie-wallet-div">
                <button
                  onClick={() => tonConnectUI.disconnect()}
                  className="untie-wallet"
                >
                  Отвязать кошелек
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="review-user-div">
        <div
          className="review-div"
          style={{ cursor: 'pointer' }}
          onClick={() => window.open('https://t.me/web3_future3', '_blank')}
        >
          <img className="review-img" src={telegram} />
          <div className="review-p-div">
            <p className="review-p">Telegram-чат поддержки</p>
          </div>

          <span className="review-arrow">&gt;</span>
        </div>

        <div className="review-div">
          <img className="review-img" src={help} />
          <div className="review-p-div">
            <p className="review-p">Как это работает?</p>
          </div>

          <span className="review-arrow">&gt;</span>
        </div>

        <div className="review-div">
          <img className="review-img" src={offers} />
          <div className="review-p-div">
            <p className="review-p">Отзыв и предложения</p>
          </div>

          <span className="review-arrow">&gt;</span>
        </div>

        <div className="review-div">
          <img className="review-img" src={help} />
          <div className="review-p-div">
            <p className="review-p">Узнать больше о проекте</p>
          </div>

          <span className="review-arrow">&gt;</span>
        </div>
      </div>
    </div>
  );
}
