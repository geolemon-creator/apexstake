import { useState } from 'react';
import styles from './ImageLoader.module.css';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
};

const ImageLoader = ({ src, alt, style, className }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '40px',
            height: '40px',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className={styles.Spiner} />
        </div>
      )}

      <img
        className={className}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default ImageLoader;
