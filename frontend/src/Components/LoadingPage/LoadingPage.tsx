import styles from './LoadingPage.module.css';
import DarkLogo from '../../Img/logo/DarkLogo.svg';
import LightLogo from '../../Img/logo/LightLogo.svg';

interface LoadingPageProps {
  onContinue: () => void; // Тип для функции onContinue
}

const LoadingPage = ({ onContinue }: LoadingPageProps) => {
  return (
    <div className={styles.LoadingPageContainer}>
      <div className={styles.LoadingContent}>
        <img src={DarkLogo} alt="dark-logo" />
        <div className={styles.LoadingSubmit} onClick={onContinue}>
          Продолжить
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
