import { levelID } from '../../Type';
import check from '../../../Img/chek.png';
import rightArrow from '../../../Img/arrow-right.svg';

interface LevelProps {
  data: levelID;
  selectedLevel: number | null;
  onSelect: (id: number) => void;
}

export default function Level(props: LevelProps) {
  const { data, selectedLevel, onSelect } = props;

  const isSpecialLevel = data.id === 3;

  return (
    <div className="level-item" onClick={() => onSelect(data.id)}>
      <div className="header-list-item">
        <p className="level-p-header">Уровень</p>

        <div className="diamond-div">
          <img className="level-img" src={props.data.img} alt="diamond" />
          <p
            className={`level-title ${isSpecialLevel ? `adv-level-title` : ''}`}
          >
            {props.data.title}
          </p>
          {selectedLevel === props.data.id ? (
            <img
              className="check-img"
              src={check}
              alt="check"
              onClick={(e) => {
                e.stopPropagation(); // Проверка
                onSelect(data.id);
              }}
            />
          ) : (
            <img src={rightArrow} alt="arrow" />
          )}
        </div>
      </div>
      <p className="level-percent">Процентная ставка: {props.data.percent}%</p>
    </div>
  );
}
