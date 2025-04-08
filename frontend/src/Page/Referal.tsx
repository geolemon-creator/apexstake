import megafon from './../Img/megafon.png';
import copy from './../Img/copy.png';
import { useEffect, useState } from 'react';
import { Frend, leader } from '../Components/Data';
import Friends from '../Components/Friends';
import Leaders from '../Components/Leaders/Leader';
import { GetInvitedUsersResponse, InvitedUser } from '../Components/Type';
import { usersApi } from '../Api/usersApi';

export default function Referal() {
  const [user, setUser] = useState<any>(null);
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [activeTab, setActiveTab] = useState<'friends' | 'leaders'>('friends');
  const [friends] = useState(Frend);
  const currentUserId = 2;

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
        setIsLoading(false);
      }
    };

    fetchInvitedUsers();
  }, []);

  const handleClick = (tab: 'friends' | 'leaders') => {
    setActiveTab(tab);
  };

  const handleCopyCode = () => {
    const referralLink = `https://t.me/${BotUsername}?start=${user.referral_code}`;

    // Копируем ссылку в буфер обмена
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        // Выводим сообщение или выполняем действия после успешного копирования
        alert('Реферальная ссылка скопирована!');
      })
      .catch((error) => {
        console.error('Не удалось скопировать реферальную ссылку: ', error);
      });
  };

  const sortedFriends = [...friends].sort((a, b) => b.coins - a.coins);
  const sortedLeader = [...leader].sort((a, b) => b.coins - a.coins);

  const currentUserIndex = sortedLeader.findIndex(
    (l) => l.id === currentUserId
  );

  console.log(invitedUsers);

  return (
    <div className="ref-countainer">
      {activeTab === 'friends' ? (
        <>
          <p className="main-title">Рефералы</p>
          <div className="ref-swith-div">
            <div className="ref-btn-frend-div">
              <p
                className={`ref-swith-btn ${
                  activeTab === 'friends' ? 'active' : ''
                }`}
                onClick={() => handleClick('friends')}
              >
                Приглашенные друзья
              </p>
            </div>

            <div className="ref-btn-leader-div">
              <p
                className={`ref-swith-btn ${
                  (activeTab as 'leaders') === 'leaders' ? 'active' : ''
                }`}
                onClick={() => handleClick('leaders')}
              >
                Лидеры
              </p>
            </div>
          </div>

          {sortedFriends.length === 0 ? (
            <>
              <div>
                <h1 className="ref-h1">Пригласите друзей!</h1>
                <h2 className="ref-h2">Вы и ваш друг получите бонусы</h2>
                <img className="ref-img" src={megafon} alt="img" />
                <div className="ref-p-div">
                  <p className="ref-p">
                    Приглашенные друзья: 0 <br />
                    Здесь вы увидите список друзей и сможете получить награды.
                  </p>
                </div>
              </div>

              <div className="ref-button">
                <button className="ref-btn-invit">Пригласи друга</button>
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
                <button className="ref-btn-invit">Пригласи друга</button>
                <div className="ref-copy-btn">
                  <img className="ref-copy-img" src={copy} alt="copy" />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div>
          <h1 className="leader-h1">Лидеры</h1>
          <div className="leader-array">
            <Leaders />
          </div>
        </div>
      )}
    </div>
  );
}
