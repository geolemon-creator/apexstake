import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className='language-btn-countainer'>
      <div className='language-button-div'>
        <button className='select-language-btn' onClick={() => changeLanguage('en')}>English</button>
        <button className='select-language-btn' onClick={() => changeLanguage('ru')}>Русский</button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;