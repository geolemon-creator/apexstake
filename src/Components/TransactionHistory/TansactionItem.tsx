import { TansactionsID } from '../Type';

interface TansactionsProps {
  data: TansactionsID;
}

export default function TansactionItem(props: TansactionsProps) {
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="trans-div">
      <div className="trans-img-div">
        <img className="trans-img" src={props.data.img} alt="" />
      </div>

      <div className="trans-title-div">
        <p className="trans-title">{truncateText(props.data.title, 17)}</p>
        <div className="trans-data">{props.data.date}</div>
      </div>

      <div className="trans-price-div">
        <p className="trans-price-p">+${props.data.price}</p>
        <div className="trans-status">Завершено</div>
      </div>
    </div>
  );
}
