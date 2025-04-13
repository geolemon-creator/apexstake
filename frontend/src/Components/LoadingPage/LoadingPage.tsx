import styles from './LoadingPage.module.css';
import DarkLogo from '../../Img/logo/DarkLogo.svg';
import LightLogo from '../../Img/logo/LightLogo.svg';
import { useTranslation } from 'react-i18next';

interface LoadingPageProps {
  onContinue: () => void; // Тип для функции onContinue
}

const LoadingPage = ({ onContinue }: LoadingPageProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.LoadingPageContainer}>
      <div className={styles.LoadingContent}>
        <img src={DarkLogo} alt="dark-logo" />
        <div className={styles.LoadingSubmit} onClick={onContinue}>
          {t('continue')}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
