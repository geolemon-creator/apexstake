import timer from './../Img/timer.svg';
import { useEffect, useState } from 'react';
import { ContestData } from '../Components/Type';

import CountdownTimer from '../Components/CountdownTimer';
import { contestApi } from '../Api/contestApi';
import ContestModal from '../Components/ContestModal/ContestModal';

export default function Contest() {
  const [data, setData] = useState<ContestData[]>();
  const [contestId, setContestId] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const contestList: ContestData[] = await contestApi.getContests();
        setData(contestList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContests();
  }, []);

  const handleOpenModal = (id: number) => {
    setContestId(id);
    setIsModalOpen(true);
  };

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

          <button
            className="contest-btn-about"
            onClick={() => handleOpenModal(item.id)}
          >
            Подробнее
          </button>
          {isModalOpen && contestId && (
            <ContestModal
              contest_id={contestId}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
