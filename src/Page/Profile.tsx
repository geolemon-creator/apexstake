import avatar from "./../Img/avatar.svg";
import telegram from "./../Img/telegram.svg";
import help from "./../Img/help.svg";
import offers from "./../Img/offers.svg";
import ok from "./../Img/ok.svg";
import transWallet from "./../Img/transWallet.svg";
import copy from "./../Img/copy.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Profile() {
  const [openWallet, setOpenWallet] = useState(false);
  const { t } = useTranslation();

  const handleOpenWallet = () => {
    setOpenWallet(!openWallet);
  };

  return (
    <div className="profile-countainer">
      <div className="data-user">
        <img className="user-ava" src={avatar} alt="" />
        <p className="user-name">UserName</p>
      </div>

      <div className="user-wallet-div">
        <div className="user-wallet">
          {!openWallet ? (
            <>
              <p className="connect-wallet">{t("profile.connectWallet")}</p>

              <div className="about-connect-p-div">
                <p className="about-connect-p">
                  {t("profile.connectTONWalletDescription")}
                </p>
              </div>

              <button onClick={handleOpenWallet} className="user-wallet-btn">
                {t("profile.connectTONWallet")}
              </button>
            </>
          ) : (
            <>
              <div className="main-open-div">
                <div className="open-wallet-header">
                  <div className="open-wallet-text">
                    <p className="open-wallet-p-first">{t("profile.tonWallet")}</p>
                    <div className="open-p-wallet-flex">
                      <p className="open-wallet-p-second">
                        {t("profile.walletConnected")}
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
                  {t("profile.disconnectWallet")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="review-user-div">
        <div className="review-div">
          <img className="review-img" src={telegram} />
          <div className="review-p-div">
            <p className="review-p">{t("profile.telegramSupport")}</p>
          </div>
          <span className="review-arrow">&gt;</span>
        </div>

        <div className="review-div">
          <img className="review-img" src={help} />
          <div className="review-p-div">
            <p className="review-p">{t("profile.howItWorks")}</p>
          </div>
          <span className="review-arrow">&gt;</span>
        </div>

        <div className="review-div">
          <img className="review-img" src={offers} />
          <div className="review-p-div">
            <p className="review-p">{t("profile.feedback")}</p>
          </div>
          <span className="review-arrow">&gt;</span>
        </div>

        <LanguageSwitcher />
      </div>
    </div>
  );
}