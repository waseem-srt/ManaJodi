import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';


interface GamificationBadgeProps {
  points: number;
  badge: string;
}

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3.375a.75.75 0 0 0-1.5 0v.375c0 .414.336.75.75.75h.001c.414 0 .75-.336.75-.75V7.125Zm2.25 0a.75.75 0 0 0-1.5 0v.375c0 .414.336.75.75.75h.001c.414 0 .75-.336.75-.75V7.125Zm4.5 1.875a.75.75 0 0 0-1.5 0v.375c0 .414.336.75.75.75h.001c.414 0 .75-.336.75-.75V9Zm2.25 0a.75.75 0 0 0-1.5 0v.375c0 .414.336.75.75.75h.001c.414 0 .75-.336.75-.75V9ZM8.625 12a.75.75 0 0 0-1.5 0v.375c0 .414.336.75.75.75h.001c.414 0 .75-.336.75-.75V12Zm2.25 0a.75.75 0 0 0-1.5 0v.375c0 .414.336.75.75.75h.001c.414 0 .75-.336.75-.75V12Zm4.5 1.875a.75.75 0 0 0-1.5 0v.375c0 .414.336.75.75.75h.001c.414 0 .75-.336.75-.75v-.375Zm2.25 0a.75.75 0 0 0-1.5 0v.375c0 .414.336.75.75.75h.001c.414 0 .75-.336.75-.75v-.375Z" clipRule="evenodd" />
        <path d="M4.5 21a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-1.5a.75.75 0 0 0 0 1.5H3v10.5a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5V6.75a.75.75 0 0 0 0-1.5H19.5a3 3 0 0 0-3-3H7.5a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h.001Z" />
    </svg>
);


export const GamificationBadge: React.FC<GamificationBadgeProps> = ({ points, badge }) => {
    const { language } = useLanguage();
    const T = translations[language].gamification;

    if (points === 0) return null; // Don't show if user has no points

    return (
        <div className="hidden sm:flex items-center space-x-2 bg-yellow-100/80 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 px-3 py-1.5 rounded-full">
            <TrophyIcon className="w-5 h-5 text-yellow-500"/>
            <div className="text-sm font-semibold">
                <span className="font-bold">{badge}</span>
                <span className="mx-1">|</span>
                <span>{points} {T.points}</span>
            </div>
        </div>
    )
}
