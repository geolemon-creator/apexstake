import { TansactionsID } from "./Type";
import { useTranslation } from "react-i18next";

interface TansactionsProps {
  data: TansactionsID;
}

export default function Tansactions(props: TansactionsProps) {
  const { t } = useTranslation(); // Используем хук useTranslation

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  
  const translateDate = (date: string): string => {
    
    const [day, time] = date.split(", ");

    const dateTranslations: { [key: string]: string } = {
      "Сегодня": t("dateTranslations.today"),
      "Вчера": t("dateTranslations.yesterday"), 
    };

    const translatedDay = dateTranslations[day] || day;
  
    return `${translatedDay}, ${time}`;
  };

  return (
    <div className="trans-div">
      <div className="trans-img-div">
        <img className="trans-img" src={props.data.img} alt="transaction" />
      </div>

      <div className="trans-title-div">
        <p className="trans-title">{truncateText(props.data.title, 17)}</p>
        <div className="trans-data">{translateDate(props.data.date)}</div> 
      </div>

      <div className="trans-price-div">
        <p className="trans-price-p">+${props.data.price}</p>
        <div className="trans-status">{t("transactionStatus.completed")}</div> 
      </div>
    </div>
  );
}