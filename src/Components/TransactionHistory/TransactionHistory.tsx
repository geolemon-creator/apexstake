import React from 'react';
import TansactionItem from './TansactionItem';

interface Transaction {
  id: number;
  title: string;
  date: string;
  price: number;
  img: string;
}

interface TransactionsProps {
  transactions: Transaction[];
  sortedTransactions: Transaction[];
  openHistory: () => void;
}

const TransactionHistory: React.FC<TransactionsProps> = ({
  transactions,
  sortedTransactions,
  openHistory,
}) => {
  return (
    <div className="transactions-div">
      <div className="stak-hist-div">
        <p className="stak-hist-title">История транзакций</p>

        {transactions.length > 0 && (
          <p onClick={openHistory} className="stak-hist-all">
            Все
          </p>
        )}
      </div>

      {transactions.length === 0 ? (
        <p className="stak-info-p">Пока нет транзакций</p>
      ) : (
        <div className="transactions-main-div">
          <div className="transactions-list-div">
            {sortedTransactions.map((transaction) => (
              <TansactionItem key={transaction.id} data={transaction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
