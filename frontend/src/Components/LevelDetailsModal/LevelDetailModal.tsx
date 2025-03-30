import { useState, useRef, useEffect } from 'react';
import RoundGraph from '../RoundGraph/RoundGraph';
import closeIcon from '../../Img/close.svg';
import { LevelData } from '../Type';
import { levelsApi } from '../../Api/stakingApi';
import { levelsAdditional } from '../SelectLevelModal/LevelItem/LevelAdditional';

interface LevelDetailModalProps {
  selectedLevelId: number | null;
  handleOpenStakingDeposite: (level: LevelData) => void;
  onClose: () => void;
}

// @ts-ignore
const LevelDetailModal = ({
  selectedLevelId,
  handleOpenStakingDeposite,
  onClose,
}: LevelDetailModalProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [level, setLevel] = useState<LevelData>();
  const checkboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchLevelDetails = async () => {
      try {
        if (selectedLevelId) {
          const levelDetails: LevelData = await levelsApi.getLevelDetails(
            selectedLevelId
          );
          setLevel(levelDetails);
        }
      } catch (err) {
        alert('Ошибка загрузки уровней');
        console.error(err);
      }
    };

    fetchLevelDetails();
  }, []);

  const handleButtonClick = () => {
    if (isChecked && level) {
      handleOpenStakingDeposite(level); // Вызываем функцию, если чекбокс установлен
    } else {
      setIsShaking(true);

      setTimeout(() => setIsShaking(false), 300);
    }
  };

  if (!level) {
    return <div></div>;
  }

  return (
    <div>
      <div className="modal-overlay-check">
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
              <p className="data-lvl-second-p">
                {Math.round(level.percentage)}%
              </p>
            </div>
          </div>
        </div>
        <div
          className={`agreement-div ${isShaking ? 'shake' : ''}`}
          ref={checkboxRef}
          onClick={() => setIsChecked((prev) => !prev)}
        >
          <div className="agr-div-chekbox">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                id="myCheckbox"
                checked={isChecked}
                onClick={() => setIsChecked((prev) => !prev)}
              />
              <span className="checkmark"></span>
            </label>
          </div>

          <a className="agreement-a" href="#">
            Я ознакомился с Соглашением об оказании услуг по размещению ставок и
            согласен с ним
          </a>
        </div>
        <button className="basic-lvl-btn" onClick={handleButtonClick}>
          Выбрать
        </button>
      </div>
    </div>
  );
};

export default LevelDetailModal;
