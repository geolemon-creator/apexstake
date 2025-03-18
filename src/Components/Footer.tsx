import home from './../Img/home.png'
import staking from './../Img/staking.png'
import store from './../Img/store.png'
import competitions from './../Img/competitions.png'
import frens from './../Img/frens (1).png'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='footer-countainer'>
        <ul className='footer-ul'>
          <NavLink to="/">
            <li className='footer-li'><img src={home} alt="home" /></li>
          </NavLink>

          <NavLink to="/staking">
            <li className='footer-li'><img src={staking} alt="staking" /></li>
          </NavLink>
            
          <NavLink to="/referal">
            <li className='footer-li'><img src={store} alt="store" /></li>
          </NavLink>
            <li className='footer-li'><img src={competitions} alt="competitions" /></li>

            <li className='footer-li'><img src={frens} alt="frens" /></li>
        </ul>
    </div>
  )
}
