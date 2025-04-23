import megafon from './../Img/megafon.png';
import copy from './../Img/copy.png';
import { useEffect, useState } from 'react';
import Friends from '../Components/Friends';
import Leaders from '../Components/Leaders/Leader';
import { GetInvitedUsersResponse, InvitedUser } from '../Components/Type';
import { usersApi } from '../Api/usersApi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Referal() {
  const [user, setUser] = useState<any>(null);
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [activeTab, setActiveTab] = useState<'friends' | 'leaders'>('friends');
  const navigate = useNavigate();
  const { t } = useTranslation('refferals');

  const BotUsername = import.meta.env.VITE_BOT_USERNAME;

  useEffect(() => {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvitedUsers = async () => {
      try {
        const invitedUsers: GetInvitedUsersResponse =
          await usersApi.getInvitedUsers();
        setInvitedUsers(invitedUsers?.invited_users);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvitedUsers();
  }, []);

  const handleClick = (tab: 'friends' | 'leaders') => {
    setActiveTab(tab);
  };

  const handleCopyCode = () => {
    const referralLink = `https://t.me/${BotUsername}?start=${user.referral_code}`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          alert(t('copy_referral_link'));
        })
        .catch((error) => {
          console.error('Clipboard API error: ', error);
          fallbackCopy(referralLink);
        });
    } else {
      fallbackCopy(referralLink);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // чтобы не прокручивало страницу
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert(t('copy_referral_link'));
      } else {
        alert('Copy command failed');
      }
    } catch (err) {
      console.error('Fallback copy error: ', err);
    }

    document.body.removeChild(textarea);
  };

  return (
    <div className="ref-countainer">
      <p className="main-title">{t('referrals')}</p>
      <div className="ref-swith-div">
        <div className="ref-btn-frend-div">
          <p
            className={`ref-swith-btn ${
              activeTab === 'friends' ? 'active' : ''
            }`}
            style={
              activeTab === 'friends'
                ? { background: '#FFDE45', color: 'black' }
                : {}
            }
            onClick={() => handleClick('friends')}
          >
            {t('invited_friends')}
          </p>
        </div>

        <div className="ref-btn-leader-div">
          <p
            className={`ref-swith-btn ${
              (activeTab as 'leaders') === 'leaders' ? 'active' : ''
            }`}
            style={
              activeTab === 'leaders'
                ? { background: '#FFDE45', color: 'black' }
                : {}
            }
            onClick={() => handleClick('leaders')}
          >
            {t('leaders')}
          </p>
        </div>
      </div>

      {activeTab === 'friends' ? (
        invitedUsers.length === 0 ? (
          <>
            <div>
              <h1 className="ref-h1">{t('no_invited_friends')}</h1>
              <h2 className="ref-h2">{t('invite_bonus')}</h2>
              <img className="ref-img" src={megafon} alt="img" />
              <div className="ref-p-div">
                <p className="ref-p">
                  {t('no_invited_friends_count')} <br />
                  {t('no_invited_friends_message')}
                </p>
              </div>
            </div>

            <div className="ref-button" onClick={handleCopyCode}>
              <button className="ref-btn-invit">{t('invite_friend')}</button>
              <div className="ref-copy-btn">
                <img className="ref-copy-img" src={copy} alt="copy" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="frend-array">
              {invitedUsers?.map((invitedUser) => (
                <Friends key={invitedUser?.id} data={invitedUser} />
              ))}
            </div>

            <div className="ref-button" onClick={handleCopyCode}>
              <button className="ref-btn-invit">{t('invite_friend')}</button>
              <div className="ref-copy-btn">
                <img className="ref-copy-img" src={copy} alt="copy" />
              </div>
            </div>
          </>
        )
      ) : (
        <div>
          <div className="leader-array">
            <Leaders />
          </div>
        </div>
      )}
    </div>
  );
}
