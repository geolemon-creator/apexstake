import styles from './LoadingPage.module.css';
import previewVideo from '../../Img/preview.gif';
import { useEffect } from 'react';

interface LoadingPageProps {
  onContinue: () => void; // Тип для функции onContinue
}

const LoadingPage = ({ onContinue }: LoadingPageProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onContinue();
    }, 6300);

    return () => clearTimeout(timeout);
  }, [onContinue]);

  return (
    <div className={styles.LoadingPageContainer}>
      <div className={styles.LoadingContent}>
        <img
          src={previewVideo}
          alt="preview"
          style={{
            pointerEvents: 'none',
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
