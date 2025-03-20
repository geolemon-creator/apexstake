import React, { createContext, useState, ReactNode } from "react";

interface Transaction {
    id: number,
    title: string,
    date: string,
    price: number,
    img: string,
}

interface TransactionsContextType {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = React.useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
};