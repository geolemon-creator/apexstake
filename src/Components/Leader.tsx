import { LeaderID } from "./Type"
import almaz from "./../Img/almaz.png"
import coin from "./../Img/coin.png"
import vector from "./../Img/Vector.png"
import second from "./../Img/second.png"
import third from "./../Img/third.png"

interface LeaderProps {
    data: LeaderID,
    position: number
}

export default function Leader({ data, position }: LeaderProps) {
  let containerClass = ''; // Добавляем переменную для класса контейнера

  if (position === 1) {
    containerClass = 'frend-countainer-first';
  } else if (position === 2) {
    containerClass = 'frend-countainer-second';
  } else if (position === 3) {
    containerClass = 'frend-countainer-third';
  }


  return (
    <>
 <div className={`frend-countainer ${containerClass}`}>
        {position === 1 && <img src={vector} alt="Золотая медалька" className="leader-medal" />}
        {position === 2 && <img src={second} alt="Серебряная медалька" className="leader-medal" />}
        {position === 3 && <img src={third} alt="Бронзовая медалька" className="leader-medal" />}
        <> {/* Обертка для остального содержимого */}
            <img className='img-frend' src={data.img} alt="img" />
            <p className='name-frend'>{data.title}</p>
            <img className="ton-img" src={almaz} alt="ton" />
            <p className='ton-frend'>{data.ton}</p>
            <img className='coin-frend-img' src={coin} alt="coin" />
            <p className='coin-frend'>{data.coins}</p>
            <p className='bonus-frend'>+{data.bonus}</p>
        </>
        </div>
    </>
  )
}
