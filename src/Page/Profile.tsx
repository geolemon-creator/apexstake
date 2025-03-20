import avatar from "./../Img/avatar.svg"
import telegram from "./../Img/telegram.svg"
import help from "./../Img/help.svg"
import offers from "./../Img/offers.svg"
import ok from "./../Img/ok.svg"
import transWallet from "./../Img/transWallet.svg"
import copy from "./../Img/copy.svg"
import { useState } from "react"

export default function Profile() {
    const [openWallet, setOpenWallet] = useState(false)

    const handleOpenWallet = () => {
        setOpenWallet(!openWallet)
    }

  return (
    <div className='profile-countainer'>
        <div className='data-user'>
            <img className='user-ava' src={avatar} alt="" />
            <p className='user-name'>UserName</p>
        </div>

        <div className="user-wallet-div">
            <div className="user-wallet">

                {!openWallet ? (
                    <>
                    <p className="connect-wallet">Подключите ваш кошелек</p>

                        <div className="about-connect-p-div">
                            <p className="about-connect-p">Для ввода/вывода средств подключайте свой TON кошелек</p>
                        </div>

                    <button onClick={handleOpenWallet} className="user-wallet-btn">Подключить кошелек TON</button>
                    </>) : 
                    
                    (<>
                    <div className="main-open-div">
                        <div className="open-wallet-header">
                            <div className="open-wallet-text">
                                <p className="open-wallet-p-first">ТОН Кошелек</p>
                                <div className="open-p-wallet-flex">
                                    <p className="open-wallet-p-second">Ваш кошелек подключен</p>
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
                        <button className="untie-wallet">Отвязать кошелек</button>
                    </div>
                    </>)}

                
                
            </div>
        </div>

        <div className="review-user-div">

            <div className="review-div">
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
  )
}
