export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum Page {
  Landing,
  Login,
  Register,
  Quiz,
  Home,
}

export interface QuizAnswer {
  questionId: number;
  answer: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string; // Should not be stored long-term in a real app
  gender: Gender;
  age: number;
  city: string;
  interests: string[];
  bio: string;
  profilePictureUrl: string;
  quizAnswers: QuizAnswer[];
  gamification: {
    points: number;
    badge: string;
  };
  interactions: {
    liked: Set<number>;
    shortlisted: Set<number>;
    rejected: Set<number>;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}
