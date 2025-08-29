import React from 'react';
import { User, Gender } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

// Icons
const HeartIcon: React.FC<React.SVGProps<SVGSVGElement> & { isFilled?: boolean }> = ({ isFilled, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);
const StarIcon: React.FC<React.SVGProps<SVGSVGElement> & { isFilled?: boolean }> = ({ isFilled, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);
const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

interface ProfileCardProps {
  user: User;
  matchScore: number;
  onInteraction: (targetUserId: number, type: 'liked' | 'shortlisted' | 'rejected') => void;
  interactions: User['interactions'];
  onViewProfile: (user: User) => void;
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

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, matchScore, onInteraction, interactions, onViewProfile }) => {
  const colors = genderColors[user.gender];
  const { language } = useLanguage();
  const T = translations[language].home;

  const isLiked = interactions.liked.has(user.id);
  const isShortlisted = interactions.shortlisted.has(user.id);

  return (
    <div
      className={`rounded-2xl shadow-lg border ${colors.border} ${colors.bg} 
        transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1
        flex flex-col dark:bg-gray-800 overflow-hidden`}
    >
      <div className="relative cursor-pointer" onClick={() => onViewProfile(user)}>
        <img src={user.profilePictureUrl} alt={user.fullName} className="w-full h-48 object-cover"/>
        <div className="absolute top-2 right-2 flex items-center space-x-1 text-red-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
          <span>{matchScore}% {T.match}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div onClick={() => onViewProfile(user)} className="cursor-pointer">
            <h3 className={`text-xl font-bold ${colors.text}`}>{user.fullName}, {user.age}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user.city}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm flex-grow line-clamp-2">{user.bio}</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center">
            <button 
              onClick={(e) => { e.stopPropagation(); onInteraction(user.id, 'shortlisted'); }}
              className={`p-3 rounded-full transition-colors duration-200 ${isShortlisted ? 'text-amber-500 bg-amber-100 dark:bg-amber-900/50' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              aria-label={T.shortlist}
              title={T.shortlist}
            >
              <StarIcon className="w-6 h-6" isFilled={isShortlisted}/>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onInteraction(user.id, 'liked'); }}
              className={`p-3 rounded-full transition-colors duration-200 ${isLiked ? 'text-red-500 bg-red-100 dark:bg-red-900/50' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              aria-label={T.like}
              title={T.like}
            >
              <HeartIcon className="w-7 h-7" isFilled={isLiked}/>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onInteraction(user.id, 'rejected'); }}
              className="p-3 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={T.pass}
              title={T.pass}
            >
              <XMarkIcon className="w-6 h-6"/>
            </button>
        </div>
      </div>
    </div>
  );
};
