import home from './../Img/home.png'
import staking from './../Img/staking.png'
import store from './../Img/store.png'
import competitions from './../Img/competitions.png'
import frens from './../Img/frens (1).png'

export default function Footer() {
  return (
    <div className='footer-countainer'>
        <ul className='footer-ul'>
            <li className='footer-li'><img src={home} alt="home" /></li>
            <li className='footer-li'><img src={staking} alt="staking" /></li>
            <li className='footer-li'><img src={store} alt="store" /></li>
            <li className='footer-li'><img src={competitions} alt="competitions" /></li>
            <li className='footer-li'><img src={frens} alt="frens" /></li>
        </ul>
    </div>
  )
}
