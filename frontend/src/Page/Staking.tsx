import StakingBalance from '../Components/StakingBalance/StakingBalance';
import Header from '../Components/Header/Header';
import TransactionHistory from '../Components/TransactionHistory/TransactionHistory';
import { useTranslation } from 'react-i18next';

export default function Staking() {
  const { t } = useTranslation();
  return (
    <div className="staking-countainer">
      <>
        <Header />
        <StakingBalance />
        <div className="staking-transactions-header">
          <p className="transactions-header-label">{t('transacton_history')}</p>
          <TransactionHistory />
        </div>
      </>
    </div>
  );
}
