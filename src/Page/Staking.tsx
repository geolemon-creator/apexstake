import deposit from "./../Img/Deposit.png"
import withdraw from "./../Img/Withdraw.png"


export default function Staking() {
  return (
    <div className='staking-countainer'>

        <div className="home-top-catlog">

            <div className="home-user">
                <div className="user-icon"></div>
                <p className="home-user-p">UserName</p>
            </div>

            <div className="home-level">
                <p>Выбор уровня</p>
            </div>

        </div>

        <div className='stak-balance'>

            <div className='stak-balance-price'>
                <p className="stak-balance-title">Current Balance</p>
                <p className="stak-balance-num">$00.00</p>
            </div>

            <div className='stak-balance-line'></div>

            <div className="stak-btn-div">

                <div className="stak-first-div">
                    <img src={deposit} alt="desposit" />
                    <p className="deposit-p">Пополнить</p>
                </div>

                <div className="stak-first-div">
                    <img src={withdraw} alt="withdraw" />
                    <p className="deposit-p">Вывод</p>
                </div>
            </div>
        </div>

        <p className="stak-hist-title">История транзакций</p>
        <p className="stak-info-p">Пока нет транзакций</p>

    </div>
  )
}
