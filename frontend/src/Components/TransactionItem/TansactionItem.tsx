import { TransactionData } from '../Type';
import style from './TransactionItem.module.css';
import transWallet from './../../Img/transWallet.svg';

interface TansactionsProps {
  data: TransactionData;
}

export default function TansactionItem(props: TansactionsProps) {
  const truncateText = (text: string, maxLength: number): string => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const statusStyles: Record<
    string,
    { label: string; background: string; color: string }
  > = {
    completed: {
      label: 'Завершено',
      background: '#09D84E',
      color: '#ffffff',
    },
    waiting: {
      label: 'В процессе',
      background: '#ADA9A9',
      color: '#FF0000',
    },
    canceled: {
      label: 'Отменено',
      background: '#FF4C4C',
      color: '#ffffff',
    },
  };

  const formattedDate = new Date(props?.data?.timestamp).toLocaleString(
    'ru-RU',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  const { status } = props.data;
  const currentStyle = statusStyles[status] || statusStyles['waiting']; // fallback, если вдруг null

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '12px' }}>
          <img width="36" height="36" src={transWallet} alt="wallet" />
        </div>
        <div>
          <p className={style.transactionTitle}>
            {truncateText(props.data.wallet, 17)}
          </p>
          <div className={style.transactionData}>{formattedDate}</div>
        </div>
      </div>

      <div>
        <p
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color:
              props?.data?.operation_type === 'deposit' ? '#09d84e' : '#FF0000',
            marginBottom: '12px',
            textAlign: 'end',
          }}
        >
          {props?.data?.operation_type === 'deposit' ? '+' : '-'}{' '}
          {props.data.amount} TON
        </p>
        <div
          style={{
            backgroundColor: currentStyle.background,
            color: currentStyle.color,
          }}
          className={style.transactionStatus}
        >
          <p>{currentStyle.label}</p>
        </div>
      </div>
    </div>
  );
}
