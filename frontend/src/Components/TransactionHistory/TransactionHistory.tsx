import { useEffect, useState } from 'react';
import styles from './TransactionHistory.module.css';
import { transactionsApi } from '../../Api/transactionsApi';
import { TransactionData } from '../Type';
import TransactionItem from '../TransactionItem/TansactionItem';

const TransactionHistory = () => {
  const [data, setData] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchTransactionsApi = async () => {
      const payload = {};
      try {
        const transactionsList: TransactionData[] =
          await transactionsApi.getTransactions(payload);
        setData(transactionsList);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTransactionsApi();
  }, []);
  const isEmpty = data?.length === 0;

  const containerStyle: React.CSSProperties = {
    background: isEmpty ? '#111118' : '#282d33',
    ...(isEmpty && {
      height: '45vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  };

  return (
    <div style={containerStyle} className={styles.TransactionHistoryContainer}>
      {isEmpty && (
        <p
          style={{
            color: '#ADA9A9',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Пока нет транзакций
        </p>
      )}
      {!isEmpty && (
        <div className={styles.TransactionHistoryContent}>
          {data?.map((transaction, index) => (
            <div style={{ marginTop: '15px', width: '100%' }}>
              <TransactionItem key={index} data={transaction} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
