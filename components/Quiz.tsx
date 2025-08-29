import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { QuizAnswer } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';


interface QuizProps {
  onSubmit: (answers: QuizAnswer[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { language } = useLanguage();
  const T = translations[language].quiz;

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setSelectedOption(answer);
    setTimeout(() => {
        const newAnswer: QuizAnswer = { questionId: currentQuestion.id, answer };
        const newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);
        
        setSelectedOption(null);
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onSubmit(newAnswers);
        }
    }, 300);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 transform transition-all">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">{T.title}</h2>
        <p className="text-center text-gray-500 mb-6">{T.subtitle}</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-gradient-to-r from-pink-400 to-sky-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">{currentQuestion.question}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 border-2 rounded-lg text-lg font-medium transition-all duration-200  
                  ${selectedOption === option 
                    ? 'bg-sky-500 border-sky-500 text-white scale-105 shadow-lg' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-sky-400'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">
          {T.progress} {currentQuestionIndex + 1} {T.of} {QUIZ_QUESTIONS.length}
        </p>
      </div>
    </div>
  );
};
