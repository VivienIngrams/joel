'use client'

import { useLanguage } from './context/LanguageProvider';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div>
       <button
        onClick={toggleLanguage}
        className="z- hidden md:block md:fixed bottom-3 left-3 p-1 text-xs text-black border-[1px] border-gray-300"
      >
        {language === 'en' ? 'FR' : 'EN'}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
