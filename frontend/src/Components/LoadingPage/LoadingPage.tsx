import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import videoJson from '../../Img/APEX.json';
import video2Json from '../../Img/APEX02.json';
import audioApex from '../../Img/dragon-growl-37570.mp3';

interface LoadingPageProps {
  onContinue: () => void;
}

const LoadingPage = ({ onContinue }: LoadingPageProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    // Показать кнопку через 1.5 секунды
    const video = videoRef.current;

    if (video) {
      video.muted = true;
      video.volume = 0;
      video.play().catch((err) => {
        console.warn('Muted preload play error:', err);
      });
    }

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinueClick = () => {
    setStartAnimation(true);
    setButtonClicked(true);

    // ⏳ Задержка 0.4 секунды перед стартом аудио
    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 2; // старт с 1-й секунды
        video.muted = false;
        video.volume = 1.0;
        video.play().catch((err) => {
          console.warn('Autoplay failed after delay:', err);
        });
      }
    }, 400); // 0.4 секунды

    // ⏳ Вызов onContinue через 6 секунд после нажатия
    setTimeout(() => {
      onContinue();
    }, 6000);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
      }}
    >
      {/* Анимации появляются после клика */}
      {startAnimation && (
        <>
          <Lottie
            animationData={videoJson}
            loop={false}
            style={{ width: '100%', marginTop: '10vh' }}
          />
          <Lottie
            animationData={video2Json}
            loop={false}
            style={{
              width: '50%',
              margin: '0 auto',
              marginTop: '1px',
              justifyContent: 'center',
            }}
          />
        </>
      )}

      {/* Кнопка по центру до нажатия */}
      {!buttonClicked && showButton && (
        <div
          style={{
            textAlign: 'center',
            background: '#FFDE45',
            borderRadius: '8px',
            padding: '12px 24px',
            fontWeight: '600',
            cursor: 'pointer',
            opacity: 1,
            transition: 'opacity 1s ease, transform 1s ease',
            fontSize: '18px',
            zIndex: 10,
            position: 'absolute',
          }}
          onClick={handleContinueClick}
        >
          Начать
        </div>
      )}

      {/* Аудио (в скрытом виде) */}
      <video
        ref={videoRef}
        src={audioApex}
        preload="auto"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default LoadingPage;
