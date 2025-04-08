import StakingBalance from '../Components/StakingBalance/StakingBalance';
import Header from '../Components/Header/Header';
import TransactionHistory from '../Components/TransactionHistory/TransactionHistory';

export default function Staking() {
  return (
    <div className="staking-countainer">
      <>
        <Header />
        <StakingBalance />
        <div className="staking-transactions-header">
          <p className="transactions-header-label">История транзакций</p>
          <TransactionHistory />
        </div>
      </>
    </div>
  );
}
