import React from 'react';
import { LevelModalProps } from '../../Components/Type';
import Level from './LevelItem/Level';
import arrowDown from '../../Img/arrow-down.svg';

const LevelModal: React.FC<LevelModalProps> = ({
  isLevelsListOpen,
  levelsList,
  selectedLevel,
  handleSelect,
  handleCloseLevelsList,
}) => {
  if (!isLevelsListOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseLevelsList}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="levels-list">
          <button onClick={handleCloseLevelsList} className="level-btn-win">
            Выбор уровня
            <img src={arrowDown} alt="arrow" />
          </button>

          {levelsList.map((level) => (
            <Level
              selectedLevel={selectedLevel}
              onSelect={handleSelect}
              key={level.id}
              data={level}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelModal;
