import React, { useState, useEffect } from 'react';
import { Gender, User } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface AuthFormProps {
  formType: 'login' | 'register';
  users: User[];
  onAuthSuccess: (user: User | Omit<User, 'id'>) => void;
  onNavigateToLogin?: () => void;
  onNavigateToRegister?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ formType, users, onAuthSuccess, onNavigateToLogin, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Female);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { language } = useLanguage();
  const T = translations[language].auth;
  const isLogin = formType === 'login';

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = T.errors.emailRequired;
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = T.errors.emailInvalid;
    
    if (!password) newErrors.password = T.errors.passwordRequired;
    else if (!isLogin && password.length < 8) newErrors.password = T.errors.passwordLength;

    if (!isLogin && !fullName) newErrors.fullName = T.errors.nameRequired;

    if (isLogin) {
        const userExists = users.some(u => u.email === email);
        if (email && !userExists) newErrors.auth = T.errors.noAccount;
    } else {
        const userExists = users.some(u => u.email === email);
        if (email && userExists) newErrors.email = T.errors.emailExists;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setErrors({});

    if (isLogin) {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        onAuthSuccess(user);
      } else {
        setErrors({ auth: T.errors.invalidCredentials });
      }
    } else {
      const newUser: Omit<User, 'id'> = {
        fullName,
        email,
        password,
        gender,
        // The rest of the fields will be populated in App.tsx
      } as Omit<User, 'id'>;
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br ${isLogin ? 'from-sky-100' : 'from-pink-100'} to-gray-100 p-4`}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 fade-in-down">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {isLogin ? T.loginTitle : T.registerTitle}
          </h1>
          <p className="mt-2 text-gray-500">
            {isLogin ? T.loginSubtitle : T.registerSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {!isLogin && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{T.fullName}</label>
              <input id="fullName" type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{T.email}</label>
            <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">{T.password}</label>
            <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>
          
          {!isLogin && (
            <div>
               <label className="block text-sm font-medium text-gray-700">{T.gender}</label>
               <div className="mt-2 flex space-x-4">
                 <label className="flex items-center"><input type="radio" name="gender" value={Gender.Male} checked={gender === Gender.Male} onChange={() => setGender(Gender.Male)} className="form-radio h-4 w-4 text-sky-600"/> <span className="ml-2 text-gray-700">{T.male}</span></label>
                 <label className="flex items-center"><input type="radio" name="gender" value={Gender.Female} checked={gender === Gender.Female} onChange={() => setGender(Gender.Female)} className="form-radio h-4 w-4 text-pink-600"/> <span className="ml-2 text-gray-700">{T.female}</span></label>
               </div>
            </div>
          )}

          {errors.auth && <p className="text-sm text-red-600 text-center">{errors.auth}</p>}

          <div className="pt-2">
            <button type="submit" className={`w-full px-8 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform hover:scale-105 ${ isLogin ? 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-400' : 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-400' }`}>
              {isLogin ? T.loginButton : T.registerButton}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          {isLogin ? T.noAccount : T.hasAccount}
          <button onClick={isLogin ? onNavigateToRegister : onNavigateToLogin} className={`font-medium ${isLogin ? 'text-sky-600 hover:text-sky-500' : 'text-pink-600 hover:text-pink-500'}`}>
            {isLogin ? T.signUp : T.signIn}
          </button>
        </div>
      </div>
    </div>
  );
};
