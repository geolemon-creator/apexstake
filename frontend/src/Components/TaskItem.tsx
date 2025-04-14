import { Task } from './Type';
import coin from './../Img/coin.svg';
import { useState } from 'react';
import check from './../Img/ok.svg';
import { tasksApi } from '../Api/tasks.Api';
import { useTranslation } from 'react-i18next';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface TaskItemProps {
  data: Task;
}

export default function TaskItem({ data }: TaskItemProps) {
  const [exam, setExam] = useState(false);
  const { t } = useTranslation();

  const handleTaskComplete = () => {
    window.open(data.link, '_blank');
    const startTime = Date.now();

    const handleFocus = async () => {
      const timeSpent = (Date.now() - startTime) / 1000;

      if (timeSpent >= 5) {
        // можно изменить это значение
        setExam(true);
        try {
          await tasksApi.completeTask(data.id);
          alert(t('task_completed'));
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('⏱️ User came back too fast, no reward');
      }

      window.removeEventListener('focus', handleFocus);
    };

    window.addEventListener('focus', handleFocus);
  };

  return (
    <div
      onClick={handleTaskComplete}
      className={`media-div ${exam ? 'exam-good' : ''}`}
    >
      <div className="media-img-div">
        <img
          className="media-img"
          src={
            data.icon.startsWith('http') ? data.icon : `${baseUrl}${data.icon}`
          }
          alt="task"
        />
      </div>

      <div className="media-title-div">
        <p className="media-title">{data.title}</p>

        <div className="media-coin-div">
          <img className="media-coin-img" src={coin} />
          <p className="coin-media-p">+{data.reward_amount}</p>
        </div>
      </div>

      <div className="media-arrow-div">
        {exam ? (
          <div className="chek-media-div">
            <img className="chek-media" src={check} />
          </div>
        ) : (
          <span className="arrow-media">&gt;</span>
        )}
      </div>
    </div>
  );
}
