import { TansactionsID } from '../Type';
import style from './TransactionItem.module.css';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ marginRight: '12px' }}>
        <img width="36" height="36" src={props.data.img} alt="wallet" />
      </div>

      <div>
        <p className={style.transactionTitle}>
          {truncateText(props.data.title, 17)}
        </p>
        <div className={style.transactionData}>{props.data.date}</div>
      </div>

      <div>
        <p
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#09d84e',
            marginBottom: '12px',
            textAlign: 'end',
          }}
        >
          +${props.data.price}
        </p>
        <div className={style.transactionStatus}>Завершено</div>
      </div>
    </div>
  );
}
