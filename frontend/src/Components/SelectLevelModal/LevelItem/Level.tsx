import { LevelData } from '../../Type';
import check from '../../../Img/chek.png';
import rightArrow from '../../../Img/arrow-right.svg';
import { levelsAdditional } from './LevelAdditional';

interface LevelProps {
  data: LevelData;
  selectedLevel: number | null;
  onSelect: (id: number) => void;
}

export default function Level(props: LevelProps) {
  const { data, selectedLevel, onSelect } = props;

  const levelInfo = levelsAdditional[data.level];

  const isSelectedLevel = selectedLevel == data.level;

  return (
    <div
      className={`level-item ${isSelectedLevel ? 'selected-level' : ''}`}
      onClick={() => {
        if (!selectedLevel) {
          onSelect(data.level);
        } else {
          alert('У вас уже открыт стейкинг');
        }
      }}
    >
      <div className="header-list-item">
        <p className="level-p-header">Уровень</p>

        <div className="diamond-div">
          <img className="level-img" src={levelInfo.icon} alt="diamond" />
          <p
            className={`level-title level-${data.level}`}
            style={{ color: levelInfo.color }}
          >
            {levelInfo.title}
          </p>
          {selectedLevel === data.level ? (
            <img
              className="check-img"
              src={check}
              alt="check"
              onClick={(e) => {
                if (!selectedLevel) {
                  e.stopPropagation(); // Проверка
                  onSelect(data.id);
                } else {
                  alert('У вас уже открыт стейкинг');
                }
              }}
            />
          ) : (
            <img src={rightArrow} alt="arrow" />
          )}
        </div>
      </div>
      <p className="level-percent">
        Процентная ставка: {Math.round(data.percentage)}%
      </p>
    </div>
  );
}
