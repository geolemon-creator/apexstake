import React from 'react';
import { LevelModalProps } from '../../Components/Type';
import Level from './LevelItem/Level';
import arrowDown from '../../Img/arrow-down.svg';
import { useTranslation } from 'react-i18next';

const LevelModal: React.FC<LevelModalProps> = ({
  isLevelsListOpen,
  levelsList,
  selectedLevel,
  handleSelect,
  handleCloseLevelsList,
}) => {
  const { t } = useTranslation();
  if (!isLevelsListOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseLevelsList}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="levels-list">
          <button onClick={handleCloseLevelsList} className="level-btn-win">
            {t('level_selection')}
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
