import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Quiz } from './components/Quiz';
import { HomePage } from './components/HomePage';
import { AuthForm } from './components/AuthForm';
import { DUMMY_USERS } from './constants';
import { User, Page, QuizAnswer, Gender } from './types';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Landing);
  const [users, setUsers] = useState<User[]>(() => {
    return DUMMY_USERS.map((user, index) => ({
      ...user,
      id: index + 1,
      password: 'password123',
    }));
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setCurrentUser(loggedInUser);
    if (loggedInUser.quizAnswers && loggedInUser.quizAnswers.length > 0) {
        setPage(Page.Home);
    } else {
        setPage(Page.Quiz);
    }
  };

  const handleRegister = (newUser: Omit<User, 'id'>) => {
    const userWithId: User = { 
        ...newUser, 
        id: users.length + 1,
        // Set default values for a new user
        profilePictureUrl: `https://i.pravatar.cc/150?img=${users.length + 31}`,
        gamification: { points: 0, badge: 'Newbie' },
        interactions: { liked: new Set(), shortlisted: new Set(), rejected: new Set() },
        age: 25, // dummy data
        city: 'New User City', // dummy data
        interests: [],
        bio: '',
        quizAnswers: [],
    };
    setUsers([...users, userWithId]);
    setCurrentUser(userWithId);
    setPage(Page.Quiz);
  };

  const handleQuizSubmit = (answers: QuizAnswer[]) => {
    if (currentUser) {
      const updatedUser = { 
          ...currentUser, 
          quizAnswers: answers,
          gamification: { points: 100, badge: 'Quiz Master' } // Award points and badge
      };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setPage(Page.Home);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage(Page.Landing);
  };
  
  const handleNavigation = (target: 'login' | 'register' | 'landing') => {
      switch(target) {
          case 'login': setPage(Page.Login); break;
          case 'register': setPage(Page.Register); break;
          case 'landing': setPage(Page.Landing); break;
      }
  }

  const handleInteraction = (targetUserId: number, type: 'liked' | 'shortlisted' | 'rejected') => {
    if (!currentUser) return;

    const newInteractions = { ...currentUser.interactions };
    
    // Toggle interaction
    if (newInteractions[type].has(targetUserId)) {
        newInteractions[type].delete(targetUserId);
    } else {
        newInteractions[type].add(targetUserId);
    }
    
    // Ensure a user isn't in multiple categories
    if (type === 'liked') newInteractions.shortlisted.delete(targetUserId);
    if (type === 'shortlisted') newInteractions.liked.delete(targetUserId);


    const updatedUser = { ...currentUser, interactions: newInteractions };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const renderPage = () => {
    switch (page) {
      case Page.Landing:
        return <LandingPage onNavigate={handleNavigation} />;
      case Page.Login:
        return <AuthForm formType="login" users={users} onAuthSuccess={handleLogin} onNavigateToRegister={() => setPage(Page.Register)} />;
      case Page.Register:
        return <AuthForm formType="register" users={users} onAuthSuccess={handleRegister} onNavigateToLogin={() => setPage(Page.Login)} />;
      case Page.Quiz:
        return <Quiz onSubmit={handleQuizSubmit} />;
      case Page.Home:
        return currentUser ? <HomePage currentUser={currentUser} onLogout={handleLogout} onInteraction={handleInteraction} allUsers={users} /> : <LandingPage onNavigate={handleNavigation} />;
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <LanguageProvider>
        <div className="font-sans">{renderPage()}</div>
    </LanguageProvider>
  );
};

export default App;
