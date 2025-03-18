import home from './../Img/home.png'
import staking from './../Img/staking.png'

export default function Footer() {
  return (
    <div className='footer-countainer'>
        <ul className='footer-ul'>
            <li className='footer-li'><img src={home} alt="home" /></li>
            <li className='footer-li'><img src={staking} alt="home" /></li>
            <li className='footer-li'></li>
            <li className='footer-li'></li>
            <li className='footer-li'></li>
        </ul>
    </div>
  )
}
