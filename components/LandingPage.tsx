import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface LandingPageProps {
  onNavigate: (page: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const T = translations[language];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-sky-100 p-4">
      <div className="text-center fade-in-down">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800">
          <span className="text-pink-500">💖</span> {T.landing.welcome} <span className="text-sky-500">💙</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          {T.landing.tagline_te}
        </p>
        <p className="text-md text-gray-500">({T.landing.tagline_en})</p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <button
          onClick={() => onNavigate('login')}
          className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          {T.landing.login}
        </button>
        <button
          onClick={() => onNavigate('register')}
          className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          {T.landing.register}
        </button>
      </div>
    </div>
  );
};
