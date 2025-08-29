import React, { useState, useEffect, useMemo } from 'react';
import { User, Gender, QuizAnswer } from '../types';
import { ProfileCard } from './ProfileCard';
import { ProfileModal } from './ProfileModal';
import { FilterBar } from './FilterBar';
import { GamificationBadge } from './GamificationBadge';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface HomePageProps {
  currentUser: User;
  allUsers: User[];
  onLogout: () => void;
  onInteraction: (targetUserId: number, type: 'liked' | 'shortlisted' | 'rejected') => void;
}

// Icons
const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}> <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.166 6.106a.75.75 0 0 0-1.06 1.06l1.59 1.591a.75.75 0 0 0 1.06-1.06l-1.59-1.591Z" /> </svg> );
const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}> <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.981 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.934 2.165-7.404 5.463-9.31a.75.75 0 0 1 .819.162Z" clipRule="evenodd" /> </svg> );

const calculateMatchScore = (user1Answers: QuizAnswer[], user2Answers: QuizAnswer[]): number => {
    let score = 0;
    if (!user1Answers || user1Answers.length === 0) return 50;
    const totalQuestions = user1Answers.length;

    user1Answers.forEach(ans1 => {
        const ans2 = user2Answers.find(a => a.questionId === ans1.questionId);
        if (ans2 && ans1.answer === ans2.answer) {
            score++;
        }
    });
    
    const quizPercentage = (score / totalQuestions) * 50;
    return Math.round(50 + quizPercentage);
};

export const HomePage: React.FC<HomePageProps> = ({ currentUser, allUsers, onLogout, onInteraction }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme in localStorage, otherwise fall back to system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
  const [filters, setFilters] = useState({ ageRange: { min: 18, max: 40 }, location: '' });
  const { language, setLanguage } = useLanguage();
  const T = translations[language];

  useEffect(() => {
    // Apply the theme class to the html element and save the preference
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const matchedProfiles = useMemo(() => {
    const otherUsers = allUsers.filter(user => 
        user.id !== currentUser.id && 
        user.gender !== currentUser.gender &&
        !currentUser.interactions.rejected.has(user.id) && // Do not show rejected profiles
        user.age >= filters.ageRange.min &&
        user.age <= filters.ageRange.max &&
        user.city.toLowerCase().includes(filters.location.toLowerCase())
    );
                                  
    return otherUsers.map(user => ({
      ...user,
      matchScore: calculateMatchScore(currentUser.quizAnswers, user.quizAnswers),
    })).sort((a, b) => b.matchScore - a.matchScore);
  }, [currentUser, allUsers, filters]);

  const isFemale = currentUser.gender === Gender.Female;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <h1 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${isFemale ? 'from-pink-500 to-pink-400' : 'from-sky-500 to-sky-400'}`}>
            ManaJodi
          </h1>
          <div className="flex items-center space-x-2 md:space-x-4">
            <GamificationBadge points={currentUser.gamification.points} badge={currentUser.gamification.badge} />
            <div className='text-sm'>
              <button onClick={() => setLanguage('en')} className={`px-2 py-1 rounded-l-md ${language === 'en' ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>EN</button>
              <button onClick={() => setLanguage('te')} className={`px-2 py-1 rounded-r-md ${language === 'te' ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>TE</button>
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
              {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
            </button>
            <button onClick={onLogout} className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition ${ isFemale ? 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-400' : 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-400' }`}>
              {T.home.logout}
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{T.home.welcome}, {currentUser.fullName.split(' ')[0]}!</h2>
            <p className="text-gray-500 dark:text-gray-400">{T.home.topMatches}</p>
        </div>
        
        <FilterBar onFilterChange={setFilters} />

        {matchedProfiles.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {matchedProfiles.map(profile => (
                    <ProfileCard key={profile.id} user={profile} matchScore={profile.matchScore} onInteraction={onInteraction} interactions={currentUser.interactions} onViewProfile={setSelectedProfile}/>
                ))}
             </div>
        ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">{T.home.noMatches}</p>
        )}
      </main>
      {selectedProfile && <ProfileModal user={selectedProfile} onClose={() => setSelectedProfile(null)} />}
    </div>
  );
};
