import telegram from './../Img/telegram.svg';
import help from './../Img/help.svg';
import offers from './../Img/offers.svg';
import ok from './../Img/ok.svg';
import transWallet from './../Img/transWallet.svg';
import copy from './../Img/copy.svg';
import { useState, useEffect } from 'react';
import { getDecodedAvatarUrl } from '../Utils/decodeAvatar';

export default function Profile() {
  const [openWallet, setOpenWallet] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      setUser(user); // Сохраняем данные пользователя
    }
  }, []);

  const handleOpenWallet = () => {
    setOpenWallet(!openWallet);
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
          {!openWallet ? (
            <>
              <p className="connect-wallet">Подключите ваш кошелек</p>

              <div className="about-connect-p-div">
                <p className="about-connect-p">
                  Для ввода/вывода средств подключайте свой TON кошелек
                </p>
              </div>

              <button onClick={handleOpenWallet} className="user-wallet-btn">
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
                  <p className="adres-p">UQATfAg...JiCDYY%b</p>
                  <img className="afres-copy-img" src={copy} alt="" />
                </div>
              </div>

              <div className="untie-wallet-div">
                <button onClick={handleOpenWallet} className="untie-wallet">
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
      </div>
    </div>
  );
}
