import { MediaID } from './Type';
import coin from "./../Img/coin.svg";
import { useState } from 'react';
import check from "./../Img/ok.svg";
import { useTranslation } from 'react-i18next'; // Импортируем useTranslation

interface MediaProps {
  data: MediaID;
}

// Тип для translationKeys
type TranslationKeys = {
  [key: string]: string;
};

export default function MediaModal(props: MediaProps) {
  const [exam, setExam] = useState(false);
  const { t } = useTranslation(); // Используем хук useTranslation

  const handleExamenation = () => {
    setExam(true);
  };

  // Фиксированные ключи для перевода
  const translationKeys: TranslationKeys = {
    "Подпишитесь на канал в Telegram": "dataMedia.subscribeTelegram",
    "Подпишитесь на канал в X": "dataMedia.subscribeX",
    "Поделитесь кампанией в своей истории в X": "dataMedia.shareCampaignX",
    "Подпишитесь на канал в  You Tube": "dataMedia.subscribeYouTube",
  };

  // Получаем ключ для перевода
  const translationKey = translationKeys[props.data.title] || props.data.title;

  // Переводим заголовок
  const translatedTitle = t(translationKey);

  return (
    <div onClick={handleExamenation} className={`media-div ${exam ? "exam-good" : ""}`}>
      <div className="media-img-div">
        <img className="media-img" src={props.data.img} alt="" />
      </div>

      <div className="media-title-div">
        {/* Используем перевод для заголовка */}
        <p className="media-title">{translatedTitle}</p>

        <div className="media-coin-div">
          <img className="media-coin-img" src={coin} alt="coin" />
          <p className="coin-media-p">+{props.data.coin}</p>
        </div>
      </div>

      <div className="media-arrow-div">
        {exam ? (
          <div className="chek-media-div">
            <img className="chek-media" src={check} alt="check" />
          </div>
        ) : (
          <span className="arrow-media">&gt;</span>
        )}
      </div>
    </div>
  );
}