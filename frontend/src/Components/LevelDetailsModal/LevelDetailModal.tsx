import { useState, useRef, useEffect } from 'react';
import { LevelData } from '../Type';
import { levelsApi } from '../../Api/stakingApi';
import LevelDetailInfo from './LevelDetailInfo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

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
  const [levels, setLevels] = useState<LevelData[]>([]);
  const checkboxRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchLevelDetails = async () => {
      try {
        if (selectedLevelId) {
          const levelDetails: LevelData[] =
            await levelsApi.getLevelListDetails();
          setLevels(levelDetails);
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
    if (isChecked && levels) {
      handleOpenStakingDeposite(levels[activeIndex]); // Вызываем функцию, если чекбокс установлен
    } else {
      setIsShaking(true);

      setTimeout(() => setIsShaking(false), 300);
    }
  };

  if (!levels) {
    return <div></div>;
  }

  return (
    <div>
      <div className="modal-overlay-check">
        <div
          style={{
            margin: '0 auto',
            maxWidth: '420px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {levels.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={50}
              slidesPerView={1}
              initialSlide={levels.findIndex(
                (level) => level.level === selectedLevelId
              )}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {levels.map((level, index) => (
                <SwiperSlide key={level.level}>
                  <div style={{ width: '335px', margin: '0 auto ' }}>
                    <LevelDetailInfo
                      key={index}
                      level={level}
                      onClose={onClose}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
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
