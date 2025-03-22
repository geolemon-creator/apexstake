import { LeaderID } from "./Type";
import almaz from "./../Img/almaz.png";
import coin from "./../Img/coin.png";
import vector from "./../Img/Vector.png";
import second from "./../Img/second.png";
import third from "./../Img/third.png";

interface LeaderProps {
  data: LeaderID;
  position: number;
  isCurrentUser?: boolean;
}

export default function Leader({ data, position, isCurrentUser = false }: LeaderProps) {
  let containerClass = '';

  if (position === 1) {
    containerClass = 'frend-countainer-first';
  } else if (position === 2) {
    containerClass = 'frend-countainer-second';
  } else if (position === 3) {
    containerClass = 'frend-countainer-third';
  }

  return (
    <div className={`frend-countainer ${containerClass} ${isCurrentUser ? 'current-user' : ''}`}>
      {isCurrentUser ? (
        <span className="current-user-place">{position}</span>
      ) : (
        <>
          {position === 1 && <img src={vector} className="leader-medal" />}
          {position === 2 && <img src={second} className="leader-medal" />}
          {position === 3 && <img src={third} className="leader-medal" />}
        </>
      )}
      <img className='img-frend' src={data.img} alt="img" />
      <p className='name-frend'>{data.title}</p>
      <img className="ton-img" src={almaz} alt="ton" />
      <p className='ton-frend'>{data.ton}</p>
      <img className='coin-frend-img' src={coin} alt="coin" />
      <p className='coin-frend'>{data.coins}</p>
      <p className='bonus-frend'>+{data.bonus}</p>
    </div>
  );
}