import { levelID } from './Type';
import check from "./../Img/chek.png";
import { useTranslation } from "react-i18next";

interface LevelProps {
  data: levelID;
  selectedLevel: number | null;
  onSelect: (id: number) => void;
}

// Тип для levelTranslations
type LevelTranslations = {
  [key: string]: string;
};

export default function Level(props: LevelProps) {
  const { data, selectedLevel, onSelect } = props;
  const { t } = useTranslation(); // Используем хук useTranslation

  const isSpecialLevel = data.id === 3;

  // Фиксированные ключи для перевода
  const levelTranslations: LevelTranslations = {
    "Начальный": t("dataLevel.beginner"),
    "Средний": t("dataLevel.intermediate"),
    "Продвинутый": t("dataLevel.advanced"),
    "Эксперт": t("dataLevel.expert"),
  };

  // Получаем ключ для перевода
  const translationKey = levelTranslations[data.title] || data.title;

  // Переводим заголовок
  const translatedTitle = t(translationKey);

  return (
    <div className="level-item" onClick={() => onSelect(data.id)}>
      <div className="header-list-item">
        <p className="level-p-header">{t("level.level")}</p> {/* Используем перевод */}
        <div className="diamond-div">
          <img className="level-img" src={data.img} alt="diamond" />
          <p className={`level-title ${isSpecialLevel ? `adv-level-title` : ""}`}>
            {translatedTitle} {/* Используем переведенный заголовок */}
          </p>
          {selectedLevel === data.id ? (
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
            <span className="level-arrow">&gt;</span>
          )}
        </div>
      </div>
      <p className="level-percent">
        {t("level.interestRate")}: {data.percent}% {/* Используем перевод */}
      </p>
    </div>
  );
}