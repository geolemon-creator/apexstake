import { useState, useEffect, useRef } from 'react';
import { LevelData } from '../Type';
import styles from './InputDepositeModal.module.css';
import tonIcon from '../../Img/TonCoin.svg';
import closeIcon from '../../Img/close.svg';

interface InputDepositeModalProps {
  level: LevelData | null; // level теперь имеет тип LevelData
  handleDepositeSubmit: (amount: number, level: LevelData) => void;
  onClose: () => void;
}

const InputDepositeModal = ({
  level,
  handleDepositeSubmit,
  onClose,
}: InputDepositeModalProps) => {
  if (!level) {
    return null;
  }
  const [amount, setAmount] = useState<number | string>(level.minAmount);
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

      if (!isNaN(numericValue) && value.length <= 4) {
        setAmount(numericValue);
      }
    }
  };

  const handleSubmit = () => {
    if (amount === '' || typeof amount === 'string') {
      setErrorMessage(
        `Сумма должна быть от ${level.minAmount} до ${level.maxAmount}`
      );
    } else if (amount < level.minAmount || amount > level.maxAmount) {
      setErrorMessage(
        `Сумма должна быть от ${level.minAmount} до ${level.maxAmount}`
      );
    } else {
      setErrorMessage('');
      handleDepositeSubmit(amount, level);
    }
  };

  const levelColors: { [key: number]: string } = {
    1: 'white',
    2: '#FFDE45',
    3: '#0C9AFF',
    4: '#AC5FFF',
  };

  const color = levelColors[level.level] || 'black';
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
          <img style={{ marginRight: '10px' }} src={level.img} alt="diamond" />
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: color,
            }}
          >
            {level.title}
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
