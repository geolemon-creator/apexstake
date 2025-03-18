import megafon from "./../Img/megafon.png";
import copy from "./../Img/copy.png";
import { useState } from "react";
import { Frend, leader } from "../Components/Data";
import Frends from "../Components/Frends";
import Leader from "../Components/Leader";

export default function Referal() {
    const [activeTab, setActiveTab] = useState<'friends' | 'leaders'>('friends');
  const [friends] = useState(Frend);

  const handleClick = (tab: 'friends' | 'leaders') => {
    setActiveTab(tab);
  };

  const sortedFriends = [...friends].sort((a, b) => b.coins - a.coins);
  const sortedLeader = [...leader].sort((a, b) => b.coins - a.coins);

  return (
    <div className='ref-countainer'>
      {activeTab === 'friends' ? (
        <>
          <p className='main-title'>Рефералы</p>
          <div className="ref-swith-div">

            <div className="ref-btn-frend-div">
              <p className={`ref-swith-btn ${activeTab === 'friends' ? 'active' : ''}`} onClick={() => handleClick('friends')} >
                Приглашенные друзья
              </p>
            </div>

            <div className="ref-btn-leader-div">
            <p className={`ref-swith-btn ${activeTab as 'friends' | 'leaders' === 'leaders' ? 'active' : ''}`} 
            onClick={() => handleClick('leaders')}>Лидеры</p>
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
                  <Frends key={frend.id} data={frend} />
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
                {sortedLeader.map((leader, index) => (
                    <Leader key={leader.id} data={leader} position={index + 1} />
                ))}
            </div>
        </div>
      )}
    </div>
  );}