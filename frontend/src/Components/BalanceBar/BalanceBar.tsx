import styles from './BalanceBar.module.css';
import tonIcon from '../../Img/TonCoin.svg';

export default function BalanceBar({
  balance,
  blockedBalance,
}: {
  balance: number;
  blockedBalance: number;
}) {
  const total = balance + blockedBalance;
  const balancePercentage = total > 0 ? (balance / total) * 100 : 0;
  const blockedPercentage = total > 0 ? (blockedBalance / total) * 100 : 0;

  return (
    <div>
      <div className={styles.balanceBarContainer}>
        <div
          className={styles.balanceBar}
          style={{ width: `${balancePercentage}%`, background: '#09D84E' }}
        ></div>
        <div
          className={styles.balanceBar}
          style={{ width: `${blockedPercentage}%`, background: '#FF0000' }}
        ></div>
      </div>
      {(balance > 0 || blockedBalance > 0) && (
        <div className={styles.balanceInfoContainer}>
          <div>
            <p className={styles.balanceInfo} style={{ color: '#09D84E' }}>
              Активный баланс
            </p>
            <p className={styles.balanceInfo} style={{ color: '#ADA9A9' }}>
              {balance} TON
            </p>
          </div>
          <div>
            <p className={styles.balanceInfo} style={{ color: '#FF0000' }}>
              Заблокировано
            </p>
            <p className={styles.balanceInfo} style={{ color: '#ADA9A9' }}>
              {blockedBalance} TON
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
