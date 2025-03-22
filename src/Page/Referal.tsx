import megafon from "./../Img/megafon.png";
import copy from "./../Img/copy.png";
import { useState } from "react";
import { Frend, leader } from "../Components/Data";
import Frends from "../Components/Frends";
import Leader from "../Components/Leader";
import { useTranslation } from "react-i18next";

export default function Referal() {
  const [activeTab, setActiveTab] = useState<"friends" | "leaders">("friends");
  const [friends] = useState(Frend);
  const currentUserId = 2;
  const topN = 104;
  const { t } = useTranslation();

  const handleClick = (tab: "friends" | "leaders") => {
    setActiveTab(tab);
  };

  const sortedFriends = [...friends].sort((a, b) => b.coins - a.coins);
  const sortedLeader = [...leader].sort((a, b) => b.coins - a.coins);

  const currentUser = leader.find((l) => l.id === currentUserId);

  const currentUserIndex = sortedLeader.findIndex((l) => l.id === currentUserId);
  const currentUserPlace = currentUserIndex + 1;

  return (
    <div className="ref-countainer">
      {activeTab === "friends" ? (
        <>
          <p className="main-title">{t("referral.referrals")}</p> 
          <div className="ref-swith-div">
            <div className="ref-btn-frend-div">
              <p
                className={`ref-swith-btn ${activeTab === "friends" ? "active" : ""}`}
                onClick={() => handleClick("friends")}
              >
                {t("referral.invitedFriends")}</p> 
            </div>

            <div className="ref-btn-leader-div">
              <p
                className={`ref-swith-btn ${activeTab as "leaders" === "leaders" ? "active" : ""}`}
                onClick={() => handleClick("leaders")}
              >
                {t("referral.leaders")}</p> 
            </div>
          </div>

          {sortedFriends.length === 0 ? (
            <>
              <div>
                <h1 className="ref-h1">{t("referral.inviteFriends")}</h1> 
                <h2 className="ref-h2">{t("referral.bonusMessage")}</h2> 
                <img className="ref-img" src={megafon} alt="img" />
                <div className="ref-p-div">
                  <p className="ref-p">
                    {t("referral.invitedFriendsCount")} <br /> 
                    {t("referral.friendsListDescription")} 
                  </p>
                </div>
              </div>

              <div className="ref-button">
                <button className="ref-btn-invit">
                  {t("referral.inviteFriend")}</button> 
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
                <button className="ref-btn-invit">
                  {t("referral.inviteFriend")}</button> 
                <div className="ref-copy-btn">
                  <img className="ref-copy-img" src={copy} alt="copy" />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div>
          <h1 className="leader-h1">{t("referral.leaders")}</h1> 
          <div className="leader-array">
            {currentUser && currentUserPlace > topN && (
              <div className="current-user-header">
                <Leader data={currentUser} position={currentUserPlace} isCurrentUser={true} />
              </div>
            )}

            {sortedLeader.map((leader, index) => {
              const position = index + 1;
              if (leader.id === currentUserId) {
                if (currentUserPlace <= topN) {
                  return <Leader key={leader.id} data={leader} position={position} />;
                } else {
                  return null;
                }
              } else {
                return <Leader key={leader.id} data={leader} position={position} />;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}