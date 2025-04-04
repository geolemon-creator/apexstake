import { FrendID } from './Type';
import tonIcon from './../Img/TonCoin.svg';
import { InvitedUser } from './Type';
import coin from './../Img/coin.svg';

interface FrendProps {
  data: InvitedUser;
}

export default function Friends(props: FrendProps) {
  return (
    <div className="frend-countainer">
      <img
        className="img-frend"
        style={{ borderRadius: '100%' }}
        src={props.data.avatar}
        alt="img"
      />
      <p className="name-frend">{props.data.username}</p>
      <img className="coin-frend-img" src={coin} alt="coin" />
      <p className="coin-frend">{props.data.tokens}</p>
      {Number(props.data.bonus) > 0 && (
        <p className="bonus-frend">+ {props.data.bonus}</p>
      )}
    </div>
  );
}
