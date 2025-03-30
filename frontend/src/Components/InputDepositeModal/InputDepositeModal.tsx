import { useState, useEffect, useRef } from 'react';
import { LevelData } from '../Type';
import styles from './InputDepositeModal.module.css';
import tonIcon from '../../Img/TonCoin.svg';
import closeIcon from '../../Img/close.svg';
import { levelsAdditional } from '../SelectLevelModal/LevelItem/LevelAdditional';

interface InputDepositeModalProps {
  level: LevelData | undefined; // level теперь имеет тип LevelData
  handleDepositeSubmit: (amount: number, level: LevelData) => void;
  onClose: () => void;
}

const InputDepositeModal = ({
  level,
  handleDepositeSubmit,
  onClose,
}: InputDepositeModalProps) => {
  if (!level) {
    return <div>loading</div>;
  }

  const [amount, setAmount] = useState<number | string>(
    Math.round(level.min_deposite)
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setAmount('');
    } else {
      const numericValue = Number(value);

      if (!isNaN(numericValue) && value.length <= 6) {
        setAmount(numericValue);
      }
    }
  };

  const handleSubmit = () => {
    if (amount === '' || typeof amount === 'string') {
      setErrorMessage(
        `Сумма должна быть от ${level.min_deposite} до ${level.max_deposite}`
      );
    } else if (amount < level.min_deposite || amount > level.max_deposite) {
      setErrorMessage(
        `Сумма должна быть от ${level.min_deposite} до ${level.max_deposite}`
      );
    } else {
      setErrorMessage('');
      handleDepositeSubmit(amount, level);
    }
  };

  return (
    <div className={styles.DepositeOverlay} onClick={handleOverlayClick}>
      <div className={styles.DepositeModalContainer}>
        <img
          onClick={onClose}
          className={styles.DepositeCloseIcon}
          src={closeIcon}
          alt="close"
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            style={{ marginRight: '10px' }}
            src={levelsAdditional[level.level].icon}
            alt="diamond"
          />
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: levelsAdditional[level.level].color,
            }}
          >
            {levelsAdditional[level.level].title}
          </p>
        </div>

        <div style={{ marginTop: '24px' }} className={styles.inputContainer}>
          <img src={tonIcon} alt="" />
          <input
            ref={inputRef}
            type="number"
            className={styles.DepositeInput}
            value={amount}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>

        <button
          style={{ marginTop: '24px' }}
          className={styles.depositeButton}
          onClick={handleSubmit}
        >
          Подтвердить
        </button>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default InputDepositeModal;
