import React from 'react';
import { User, Gender } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
}

const genderColors = {
  [Gender.Female]: {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    border: 'border-pink-300 dark:border-pink-700',
    text: 'text-pink-800 dark:text-pink-300',
    tagBg: 'bg-pink-100 dark:bg-pink-900/50',
  },
  [Gender.Male]: {
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    border: 'border-sky-300 dark:border-sky-700',
    text: 'text-sky-800 dark:text-sky-300',
    tagBg: 'bg-sky-100 dark:bg-sky-900/50',
  },
};


export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  const { language } = useLanguage();
  const T = translations[language].home.modal;
  const colors = genderColors[user.gender];

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 animate-fade-in-up ${colors.border} border-t-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img src={user.profilePictureUrl} alt={user.fullName} className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white dark:border-gray-700"/>
            <div className="text-center sm:text-left">
              <h2 className={`text-3xl font-bold ${colors.text}`}>{user.fullName}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">{user.age} years old</p>
              <p className="text-md text-gray-500 dark:text-gray-400">{user.city}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{user.bio}</p>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-400 mb-2 text-lg">{T.interests}</h4>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span key={interest} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${colors.tagBg} ${colors.text}`}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* FIX: The `jsx` prop is not a valid attribute for the `<style>` tag in a standard React environment. Removing it resolves the compilation error. */}
      <style>{`
            @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
            .animate-fade-in-up {
                animation: fadeIn 0.3s ease-out forwards, fadeInUp 0.3s ease-out forwards;
            }
            @keyframes fadeInUp {
                0% { transform: translateY(20px) scale(0.98); }
                100% { transform: translateY(0) scale(1); }
            }
        `}</style>
    </div>
  );
};