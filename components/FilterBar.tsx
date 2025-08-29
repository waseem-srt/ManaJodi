import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';


interface FilterBarProps {
  onFilterChange: (filters: { ageRange: { min: number; max: number }; location: string }) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [ageRange, setAgeRange] = useState({ min: 18, max: 40 });
  const [location, setLocation] = useState('');
  const { language } = useLanguage();
  const T = translations[language].home.filter;


  useEffect(() => {
    const handler = setTimeout(() => {
        onFilterChange({ ageRange, location });
    }, 500); // Debounce to avoid rapid re-renders
    return () => clearTimeout(handler);
  }, [ageRange, location, onFilterChange]);


  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-md mb-8 sticky top-[70px] z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {T.location}
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Hyderabad"
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {T.age}: {ageRange.min} - {ageRange.max}
            </label>
            <div className="flex items-center mt-2 space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">18</span>
                <input
                    type="range"
                    min="18"
                    max="60"
                    value={ageRange.max}
                    onChange={(e) => setAgeRange(prev => ({...prev, max: parseInt(e.target.value, 10)}))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider-thumb"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">60</span>
            </div>
        </div>
      </div>
      {/* FIX: The `jsx` prop is not a valid attribute for the `<style>` tag in a standard React environment. Removing it resolves the compilation error. */}
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #0ea5e9; /* sky-500 */
            cursor: pointer;
            border-radius: 50%;
        }
        .slider-thumb::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #0ea5e9;
            cursor: pointer;
            border-radius: 50%;
        }
      `}</style>
    </div>
  );
};