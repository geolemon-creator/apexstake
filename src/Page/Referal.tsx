import megafon from './../Img/megafon.png';
import copy from './../Img/copy.png';
import { useState } from 'react';
import { Frend, leader } from '../Components/Data';
import Friends from '../Components/Friends';
import Leader from '../Components/Leader';

export default function Referal() {
  const [activeTab, setActiveTab] = useState<'friends' | 'leaders'>('friends');
  const [friends] = useState(Frend);
  const currentUserId = 2;
  const topN = 104;

  const handleClick = (tab: 'friends' | 'leaders') => {
    setActiveTab(tab);
  };

  const sortedFriends = [...friends].sort((a, b) => b.coins - a.coins);
  const sortedLeader = [...leader].sort((a, b) => b.coins - a.coins);

  const currentUser = leader.find((l) => l.id === currentUserId);

  const currentUserIndex = sortedLeader.findIndex(
    (l) => l.id === currentUserId
  );
  const currentUserPlace = currentUserIndex + 1;

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
                {sortedFriends.map((frend) => (
                  <Friends key={frend.id} data={frend} />
                ))}
              </div>

              <div className="ref-button">
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
            {currentUser && currentUserPlace > topN && (
              <div className="current-user-header">
                <Leader
                  data={currentUser}
                  position={currentUserPlace}
                  isCurrentUser={true}
                />
              </div>
            )}

            {sortedLeader.map((leader, index) => {
              const position = index + 1;
              if (leader.id === currentUserId) {
                // Если это текущий пользователь
                if (currentUserPlace <= topN) {
                  // И он входит в топ, отображаем его как обычного участника
                  return (
                    <Leader key={leader.id} data={leader} position={position} />
                  );
                } else {
                  // И если он крч НЕ входит в топ, то пропускаем его, так как он уже отображен
                  return null;
                }
              } else {
                // Если это не текущий пользователь, отображаем как обычно
                return (
                  <Leader key={leader.id} data={leader} position={position} />
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
