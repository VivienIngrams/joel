'use client';

import { useLanguage } from './context/LanguageProvider';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div>
      <button
        onClick={toggleLanguage}
        className="hidden md:block md:fixed bottom-3 left-3 p-2 "
      >
        {language === 'en' ? (
          // French Flag
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 24" // Adjusted aspect ratio
            width="24" // Uniform size
            height="16" // Uniform size
          >
            <rect width="12" height="24" fill="#002395" />
            <rect x="12" width="12" height="24" fill="#FFFFFF" />
            <rect x="24" width="12" height="24" fill="#ED2939" />
          </svg>
        ) : (
          // British Flag
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 36" // Adjusted aspect ratio
            width="24" // Uniform size
            height="16" // Uniform size
          >
            <rect width="60" height="36" fill="#00247D" />
            <path
              fill="#FFFFFF"
              d="M0 15h60v6H0zM27 0h6v36h-6zM5 0L55 36h-7L5 6zM55 0L5 36h7L55 6z"
            />
            <path
              fill="#CF142B"
              d="M0 16h60v4H0zM28 0h4v36h-4zM6 0L54 36h-4L6 4zM54 0L6 36h4L54 4z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
