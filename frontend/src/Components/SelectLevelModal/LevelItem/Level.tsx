import { LevelData } from '../../Type';
import check from '../../../Img/chek.png';
import rightArrow from '../../../Img/arrow-right.svg';
import { levelsAdditional } from './LevelAdditional';
import { useTranslation } from 'react-i18next';

interface LevelProps {
  data: LevelData;
  selectedLevel: number | null;
  onSelect: (id: number) => void;
}

export default function Level(props: LevelProps) {
  const { t } = useTranslation();
  const { data, selectedLevel, onSelect } = props;

  const levelInfo = levelsAdditional[data.level];

  const isSelectedLevel = selectedLevel == data.level;

  return (
    <div
      className={`level-item ${isSelectedLevel ? 'selected-level' : ''}`}
      onClick={() => {
        onSelect(data.level);
      }}
    >
      <div className="header-list-item">
        <p className="level-p-header">{t('level')}</p>

        <div className="diamond-div">
          <img className="level-img" src={levelInfo.icon} alt="diamond" />
          <p
            className={`level-title level-${data.level}`}
            style={{ color: levelInfo.color }}
          >
            {t(levelInfo.title)}
          </p>
          {selectedLevel === data.level ? (
            <img
              className="check-img"
              src={check}
              alt="check"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(data.id);
              }}
            />
          ) : (
            <img src={rightArrow} alt="arrow" />
          )}
        </div>
      </div>
      <p className="level-percent">
        {t('interest_rate')} {Math.round(data.percentage)}%
      </p>
    </div>
  );
}
