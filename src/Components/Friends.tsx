import { FrendID } from './Type';
import tonIcon from './../Img/TonCoin.svg';
import coin from './../Img/coin.svg';

interface FrendProps {
  data: FrendID;
}

export default function Friends(props: FrendProps) {
  return (
    <div className="frend-countainer">
      <img className="img-frend" src={props.data.img} alt="img" />
      <p className="name-frend">{props.data.title}</p>
      <img className="ton-img" src={tonIcon} alt="ton" />
      <p className="ton-frend">{props.data.ton}</p>
      <img className="coin-frend-img" src={coin} alt="coin" />
      <p className="coin-frend">{props.data.coins}</p>
      <p className="bonus-frend">+{props.data.bonus}</p>
    </div>
  );
}
