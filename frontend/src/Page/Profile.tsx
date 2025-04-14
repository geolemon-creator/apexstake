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
import { useTranslation } from 'react-i18next';
import arrow from '../Img/arrow-right.svg';
import { useNavigate } from 'react-router-dom';
import AboutModal from '../Components/AboutModal/AboutModal';
import ImageLoader from '../Components/ImageLoader/ImageLoader';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userFriendlyAddress = useTonAddress();
  const { t } = useTranslation('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
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
    if (address.length > 10) {
      return `${address.slice(0, 12)}...${address.slice(-6)}`;
    }
    return address;
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(userFriendlyAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error('Ошибка копирования: ', err));
  };

  if (!user) {
    return <div></div>;
  }

  const avatarUrl = getDecodedAvatarUrl(user.avatar);

  return (
    <div className="profile-countainer">
      <div style={{ width: '336px', margin: '0 auto' }}>
        <img
          src={arrow}
          alt="arrow"
          style={{ transform: 'rotate(180deg)' }}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="data-user">
        <ImageLoader
          style={{ borderRadius: '100%', width: '48px', height: '48px' }}
          src={avatarUrl}
          alt="avatar"
        />
        <p className="user-name">{user.username}</p>
      </div>

      <div className="user-wallet-div">
        <div className="user-wallet">
          {!userFriendlyAddress ? (
            <>
              <p className="connect-wallet">{t('connect_wallet')}</p>

              <div className="about-connect-p-div">
                <p className="about-connect-p">
                  {t('connect_wallet_description')}
                </p>
              </div>

              <button
                onClick={() => tonConnectUI.openModal()}
                className="user-wallet-btn"
              >
                {t('connect_wallet_button')}
              </button>
            </>
          ) : (
            <>
              <div className="main-open-div">
                <div className="open-wallet-header">
                  <div className="open-wallet-text">
                    <p className="open-wallet-p-first">{t('wallet')}</p>
                    <div className="open-p-wallet-flex">
                      <p className="open-wallet-p-second">
                        {t('wallet_connected')}
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
                    alt="copy"
                  />
                </div>
              </div>

              <div className="untie-wallet-div">
                <button
                  onClick={() => tonConnectUI.disconnect()}
                  className="untie-wallet"
                >
                  {t('disconnect_wallet')}
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
            <p className="review-p">{t('telegram_chat_support')}</p>
          </div>

          <span className="review-arrow">&gt;</span>
        </div>

        <div className="review-div">
          <img className="review-img" src={offers} />
          <div className="review-p-div">
            <p className="review-p">{t('feedback_suggestions')}</p>
          </div>

          <span className="review-arrow">&gt;</span>
        </div>

        <div className="review-div" onClick={() => setIsModalOpen(true)}>
          <img className="review-img" src={help} />
          <div className="review-p-div">
            {/* TODO: открытие модалки AboutModal */}
            <p className="review-p">{t('learn_more_about_project')}</p>
          </div>

          <span className="review-arrow">&gt;</span>
        </div>
      </div>
      {isModalOpen && <AboutModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
