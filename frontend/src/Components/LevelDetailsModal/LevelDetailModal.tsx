import { useState, useRef, useEffect } from 'react';
import { LevelData } from '../Type';
import { levelsApi } from '../../Api/stakingApi';
import LevelDetailInfo from './LevelDetailInfo';

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
        // alert('Ошибка загрузки уровней');
        // alert(err);
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
        <LevelDetailInfo level={level} onClose={onClose} />
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
