import RoundGraph from '../RoundGraph/RoundGraph';
import { levelsAdditional } from '../SelectLevelModal/LevelItem/LevelAdditional';
import { LevelData } from '../Type';
import closeIcon from '../../Img/close.svg';

interface LevelDetailInfoProps {
  level: LevelData; // Ваш тип данных для уровня
  onClose: () => void;
}

const LevelDetailInfo = ({ level, onClose }: LevelDetailInfoProps) => {
  return (
    <div className="basic-lvl-div">
      <img
        src={closeIcon}
        alt="close"
        onClick={onClose}
        className="close-detail-icon"
      />
      <div className="bas-nor-block">
        <div className="title-lvl-div">
          <p className="basic-lvl-p">Уровень:</p>
          <div className="title-lvl-ab-div">
            <img
              className="lvl-img"
              src={levelsAdditional[level.level]?.icon}
              alt="diamond"
            />
            <p className="lvl-p">{levelsAdditional[level.level]?.title}</p>
          </div>
        </div>
        <RoundGraph progress={Math.min(level.full_rate, 100)}>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fontWeight="600"
            dominantBaseline="middle"
            fontSize="18"
            fill="white"
            style={{ letterSpacing: '1px' }}
          >
            +{level.full_rate}%
          </text>
        </RoundGraph>
      </div>
      <div className="data-lvl-div">
        <div className="data-lvl-text">
          <p className="data-lvl-first-p">Дата ставки:</p>
          <p className="data-lvl-second-p">
            {new Date(level.start_date)
              .toLocaleDateString('ru-RU')
              .replace(/\./g, '-')}
          </p>
        </div>

        <div className="data-lvl-text">
          <p className="data-lvl-first-p">Период начисления процентов:</p>
          <p className="data-lvl-second-p">
            {10} {1 === 1 ? 'день' : 'дней'}
          </p>
        </div>

        <div className="data-lvl-text big-p">
          <p className="data-lvl-first-p">
            Дата окончания начисления <br /> процентов:
          </p>
          <p className="data-lvl-second-p">
            {new Date(level.end_date)
              .toLocaleDateString('ru-RU')
              .replace(/\./g, '-')}
          </p>
        </div>

        <div className="data-lvl-text">
          <p className="data-lvl-first-p">Срок погашения:</p>
          <p className="data-lvl-second-p">
            {level.stage.staking_time}{' '}
            {level.stage.staking_time === 1 ? 'день' : 'дней'}
          </p>
        </div>

        <div className="data-lvl-text">
          <p className="data-lvl-first-p">Дата погашения:</p>
          <p className="data-lvl-second-p">
            {new Date(level.end_date)
              .toLocaleDateString('ru-RU')
              .replace(/\./g, '-')}
          </p>
        </div>

        <div className="data-lvl-text">
          <p className="data-lvl-first-p">Процентная ставка:</p>
          <p className="data-lvl-second-p">{Math.round(level.percentage)}%</p>
        </div>
      </div>
    </div>
  );
};

export default LevelDetailInfo;
