import picture from './../Img/picture.png';
import timer from './../Img/timer.png';
import party from './../Img/Party.png';

export default function Contest() {
  return (
    <div className="contest-container">
      <h1 className="contest-h1">Конкурсы</h1>

      <div className="contest-div">
        <div className="top-text-contest">
          <h2 className="top-text-one">20 БОНУСОВ</h2>
          <p className="top-text-two">ЗА КАЖДОГО РЕФЕРАЛА</p>
        </div>

        <img className="contest-img" src={picture} alt="picture" />

        <div className="contest-text-div">
          <p className="contest-text">Закончится через:</p>
        </div>

        <div className="contest-timer">
          <img src={timer} alt="timer" />
          <p className="num-timer">2</p>
          <p className="contest-num">дня</p>
          <p className="num-timer">08</p>
          <p className="contest-num">часов</p>
          <p className="num-timer">08</p>
          <p className="contest-num">минут</p>
          <p className="num-timer">08</p>
          <p className="contest-num">секунд</p>
        </div>

        <button className="contest-btn-about">Подробнее </button>
      </div>

      <div className="contest-div">
        <div className="top-text-contest">
          <p className="top-text-dubai">УЧАСТИЕ В ВЕЧЕРИНКЕ В ДУБАЕ</p>
        </div>
        <img className="paty-img" src={party} alt="Вечеринка в Дубае" />
        <div className="contest-timer">
          <img src={timer} alt="timer" />
          <p className="num-timer">2</p>
          <p className="contest-num">дня</p>
          <p className="num-timer">08</p>
          <p className="contest-num">часов</p>
          <p className="num-timer">08</p>
          <p className="contest-num">минут</p>
          <p className="num-timer">08</p>
          <p className="contest-num">секунд</p>
        </div>
        <button className="contest-btn-about">Подробнее </button>
      </div>
    </div>
  );
}
