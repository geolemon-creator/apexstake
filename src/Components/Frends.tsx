import { FrendID } from "../Components/Type"
import almaz from "./../Img/almaz.png"
import coin from "./../Img/coin.png"


interface FrendProps {
    data: FrendID
}

export default function Frends(props: FrendProps) {
  return (
    <div className='frend-countainer'>
        <img className='img-frend' src={props.data.img} alt="img" />
        <p className='name-frend'>{props.data.title}</p>
        <img className="ton-img" src={almaz} alt="ton" />
        <p className='ton-frend'>{props.data.ton}</p>
        <img className='coin-frend-img' src={coin} alt="coin" />
        <p className='coin-frend'>{props.data.coins}</p>
        <p className='bonus-frend'>+{props.data.bonus}</p>
    </div>
  )
}
