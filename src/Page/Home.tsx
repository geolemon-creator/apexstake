import box from "./../Img/box.png"
import coin from "./../Img/coin.png"

export default function Home() {
  return (
    <div className="home-countainer">

        <div className="home-top-catlog">

            <div className="home-user">
                <div className="user-icon"></div>
                <p className="home-user-p">UserName</p>
            </div>

            <div className="home-level">
                <p>Выбор уровня</p>
            </div>

        </div>

        <div className="home-lower-catalog">
            <div>
                <div className="home-reward">

                    <div className="rewad-text">
                        <h1 className="reward-h1">Ежедневная награда</h1>
                        <p className="reward-p">Успей забрать</p>
                    </div>
                    
                    <img className="reward-img" src={box} alt="img" />

                </div>
            </div>
        </div>

        <div className="home-balance">

            <div className="current-balance">
                <p className="current-balance-p">Current Balance</p>
                <p className="current-balance-num">$ 0.00</p>
            </div>

            <div className="home-bonus">
                <p className="home-bonus-p">Bonus</p>

                <div className="bonus-amount">
                    <img className="img-coin" src={coin} alt="coin" />
                    <p className="bonus-balance-num">0.00</p>
                </div>
                
            </div>
        </div>

        <div className="home-info-div">
            <p className="home-info">Данные появятся после начала стейкинга</p>
        </div>

        <button className="btn-more">Узнать больше</button>
        <button className="btn-staking">Открыть staking</button>
        

    </div>
  )
}
