import { useState, useRef } from 'react';
import expertDiamond from '../../Img/diamonds/diamond-expert.svg';
import RoundGraph from '../RoundGraph/RoundGraph';
import { LevelData } from '../Type';

interface LevelDetailModalProps {
  selectedLevelId: number | null;
  handleOpenDepositeModal: (level: LevelData) => void;
}

const LevelDetailModal = ({
  selectedLevelId,
  handleOpenDepositeModal,
}: LevelDetailModalProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const checkboxRef = useRef<HTMLDivElement | null>(null);

  const selectedLevel = {
    id: 4,
    title: 'Эксперт',
    start_date: '15-03-2025',
    end_date: '15-04-2025',
    staking_duraton: 30,
    full_rate: 142,
    minAmount: 200,
    maxAmount: 500,
    img: expertDiamond,
    level: 4,
  };

  const handleButtonClick = () => {
    if (isChecked) {
      handleOpenDepositeModal(selectedLevel); // Вызываем функцию, если чекбокс установлен
    } else {
      setIsShaking(true);

      setTimeout(() => setIsShaking(false), 300);
    }
  };

  return (
    <div>
      <div className="modal-overlay-check">
        <div className="basic-lvl-div">
          <div className="bas-nor-block">
            <div className="title-lvl-div">
              <p className="basic-lvl-p">Уровень:</p>
              <div className="title-lvl-ab-div">
                <img
                  className="lvl-img"
                  src={selectedLevel?.img}
                  alt="diamond"
                />
                <p className="lvl-p">{selectedLevel?.title}</p>
              </div>
            </div>
            <RoundGraph progress={Math.min(selectedLevel.full_rate, 100)}>
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
                +{selectedLevel.full_rate}%
              </text>
            </RoundGraph>
          </div>

          <div className="data-lvl-div">
            <div className="data-lvl-text">
              <p className="data-lvl-first-p">Дата ставки:</p>
              <p className="data-lvl-second-p">{selectedLevel.start_date}</p>
            </div>

            <div className="data-lvl-text">
              <p className="data-lvl-first-p">Период начисления процентов:</p>
              <p className="data-lvl-second-p">
                {selectedLevel.staking_duraton}{' '}
                {selectedLevel.staking_duraton === 1 ? 'день' : 'дней'}
              </p>
            </div>

            <div className="data-lvl-text big-p">
              <p className="data-lvl-first-p">
                Дата окончания начисления <br /> процентов:
              </p>
              <p className="data-lvl-second-p">15-04-2025</p>
            </div>

            <div className="data-lvl-text">
              <p className="data-lvl-first-p">Срок погашения:</p>
              <p className="data-lvl-second-p">
                {selectedLevel.staking_duraton}{' '}
                {selectedLevel.staking_duraton === 1 ? 'день' : 'дней'}
              </p>
            </div>

            <div className="data-lvl-text">
              <p className="data-lvl-first-p">Дата погашения:</p>
              <p className="data-lvl-second-p">{selectedLevel.end_date}</p>
            </div>

            <div className="data-lvl-text">
              <p className="data-lvl-first-p">Процентная ставка:</p>
              <p className="data-lvl-second-p">44%</p>
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
