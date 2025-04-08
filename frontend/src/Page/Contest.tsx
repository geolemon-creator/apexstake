import picture from './../Img/picture.png';
import timer from './../Img/timer.png';
import party from './../Img/Party.png';
import { useEffect, useState } from 'react';
import { Competition } from '../Components/Type';
import { competitionsApi } from '../Api/competitionsApi';
import CountdownTimer from '../Components/CountdownTimer';

export default function Contest() {
  const [data, setData] = useState<Competition[]>();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitionsList: Competition[] =
          await competitionsApi.getCompetitions();
        setData(competitionsList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompetitions();
  }, []);

  if (!data) {
    return <div></div>;
  }
  return (
    <div className="contest-container">
      <h1 className="contest-h1">Конкурсы</h1>

      {data.map((item) => (
        <div className="contest-div" key={item.id}>
          <div className="top-text-contest">
            <>
              {item?.badge_content && (
                <h2 className="top-text-one">{item.badge_content}</h2>
              )}
              <p className="top-text-two">{item.title}</p>
            </>
          </div>

          <img className={'paty-img'} src={item.img} alt={item.title} />

          <div className="contest-text-div">
            <p className="contest-text">Закончится через:</p>
          </div>

          <div className="contest-timer">
            <img src={timer} alt="timer" />
            <CountdownTimer endDate={item.end_date} />
          </div>

          <button className="contest-btn-about">Подробнее</button>
        </div>
      ))}
    </div>
  );
}
