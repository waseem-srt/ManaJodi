import { Gender, User, QuizQuestion } from './types';

// Utility to create a full user object with defaults
const createUser = (
  userData: Omit<User, 'id' | 'password' | 'gamification' | 'interactions' | 'profilePictureUrl'> & { seed: number }
): Omit<User, 'id' | 'password'> => ({
  ...userData,
  profilePictureUrl: `https://i.pravatar.cc/150?img=${userData.seed}`,
  gamification: { points: 0, badge: 'Newbie' },
  interactions: {
    liked: new Set(),
    shortlisted: new Set(),
    rejected: new Set(),
  },
});

export const DUMMY_USERS: Omit<User, 'id' | 'password'>[] = [
  createUser({
    fullName: 'Priya Sharma',
    email: 'priya@example.com',
    gender: Gender.Female,
    age: 28,
    city: 'Hyderabad',
    interests: ['Reading', 'Classical Dance', 'Cooking'],
    bio: 'A software engineer who loves to explore new cafes and read historical fiction. Looking for someone with a good sense of humor.',
    quizAnswers: [{ questionId: 1, answer: 'A quiet evening at home' }, { questionId: 2, answer: 'Mountains' }, { questionId: 3, answer: 'Introvert' }, { questionId: 4, answer: 'Planning ahead' }, { questionId: 5, answer: 'Cinema' }],
    seed: 1
  }),
  createUser({
    fullName: 'Rohan Varma',
    email: 'rohan@example.com',
    gender: Gender.Male,
    age: 30,
    city: 'Visakhapatnam',
    interests: ['Trekking', 'Photography', 'Movies'],
    bio: 'Adventure seeker and an avid photographer. I believe life is about collecting memories, not things. Let\'s make some together.',
    quizAnswers: [{ questionId: 1, answer: 'An adventurous outdoor trip' }, { questionId: 2, answer: 'Mountains' }, { questionId: 3, answer: 'Extrovert' }, { questionId: 4, answer: 'Spontaneous' }, { questionId: 5, answer: 'Sports' }],
    seed: 2
  }),
  createUser({
    fullName: 'Anjali Rao',
    email: 'anjali@example.com',
    gender: Gender.Female,
    age: 26,
    city: 'Vijayawada',
    interests: ['Painting', 'Yoga', 'Blogging'],
    bio: 'Art enthusiast and yoga practitioner. I find peace in creativity and mindfulness. Looking for a deep, meaningful connection.',
    quizAnswers: [{ questionId: 1, answer: 'A quiet evening at home' }, { questionId: 2, answer: 'Beach' }, { questionId: 3, answer: 'Ambivert' }, { questionId: 4, answer: 'Planning ahead' }, { questionId: 5, answer: 'Art Gallery' }],
    seed: 3
  }),
  createUser({
    fullName: 'Suresh Kumar',
    email: 'suresh@example.com',
    gender: Gender.Male,
    age: 32,
    city: 'Tirupati',
    interests: ['Gadgets', 'Gaming', 'History'],
    bio: 'Tech geek with a passion for history documentaries. My ideal weekend is a mix of gaming and exploring ancient temples.',
    quizAnswers: [{ questionId: 1, answer: 'A fun night out with friends' }, { questionId: 2, answer: 'City' }, { questionId: 3, answer: 'Introvert' }, { questionId: 4, answer: 'Planning ahead' }, { questionId: 5, answer: 'Cinema' }],
    seed: 4
  }),
  createUser({
    fullName: 'Kavya Reddy',
    email: 'kavya@example.com',
    gender: Gender.Female,
    age: 29,
    city: 'Hyderabad',
    interests: ['Traveling', 'Food vlogging', 'Startups'],
    bio: 'Entrepreneurial spirit with a love for exploring new cultures and cuisines. Looking for a partner in crime for my next adventure.',
    quizAnswers: [{ questionId: 1, answer: 'An adventurous outdoor trip' }, { questionId: 2, answer: 'Beach' }, { questionId: 3, answer: 'Extrovert' }, { questionId: 4, answer: 'Spontaneous' }, { questionId: 5, answer: 'Cinema' }],
    seed: 5
  }),
  createUser({
    fullName: 'Arjun Desai',
    email: 'arjun@example.com',
    gender: Gender.Male,
    age: 29,
    city: 'Hyderabad',
    interests: ['Fitness', 'Stock Market', 'Podcasts'],
    bio: 'Finance professional by day, fitness enthusiast by night. I value discipline, ambition, and intellectual conversations.',
    quizAnswers: [{ questionId: 1, answer: 'A fun night out with friends' }, { questionId: 2, answer: 'City' }, { questionId: 3, answer: 'Ambivert' }, { questionId: 4, answer: 'Planning ahead' }, { questionId: 5, answer: 'Sports' }],
    seed: 6
  }),
  // Add more users
  createUser({ fullName: 'Nithya Menon', email: 'nithya@example.com', gender: Gender.Female, age: 27, city: 'Warangal', interests: ['Music', 'Gardening', 'Volunteering'], bio: 'Music teacher who finds joy in simple things. Believes in kindness and compassion.', quizAnswers: [], seed: 7 }),
  createUser({ fullName: 'Vikram Singh', email: 'vikram@example.com', gender: Gender.Male, age: 31, city: 'Guntur', interests: ['Biking', 'Cooking', 'Stand-up Comedy'], bio: 'Chef by profession, comedian by heart. Looking for someone who enjoys good food and a good laugh.', quizAnswers: [], seed: 8 }),
  createUser({ fullName: ' Lakshmi Prasad', email: 'lakshmi@example.com', gender: Gender.Female, age: 30, city: 'Nellore', interests: ['Fashion', 'Social Media', 'Dancing'], bio: 'Fashion blogger and dance enthusiast. Life is a party, and I am always on the dance floor.', quizAnswers: [], seed: 9 }),
  createUser({ fullName: 'Charan Teja', email: 'charan@example.com', gender: Gender.Male, age: 28, city: 'Kakinada', interests: ['Writing', 'Poetry', 'Long drives'], bio: 'A writer who romanticizes life. Looking for a muse to share my verses with.', quizAnswers: [], seed: 10 }),
  createUser({ fullName: 'Sita Gollapudi', email: 'sita@example.com', gender: Gender.Female, age: 25, city: 'Rajahmundry', interests: ['Animals', 'Baking', 'Crafting'], bio: 'Veterinarian with a big heart for all creatures. My weekends are for baking and crafting.', quizAnswers: [], seed: 11 }),
  createUser({ fullName: 'Bala Subramanyam', email: 'bala@example.com', gender: Gender.Male, age: 33, city: 'Kurnool', interests: ['Politics', 'Debating', 'Reading Non-fiction'], bio: 'Lawyer who is passionate about justice and societal change. I enjoy intellectual debates.', quizAnswers: [], seed: 12 }),
  createUser({ fullName: 'Divya Chowdary', email: 'divya@example.com', gender: Gender.Female, age: 29, city: 'Secunderabad', interests: ['Zumba', 'Nutrition', 'Podcasts'], bio: 'Fitness coach dedicated to a healthy lifestyle. I believe a healthy body houses a healthy mind.', quizAnswers: [], seed: 13 }),
  createUser({ fullName: 'Gopal Krishna', email: 'gopal@example.com', gender: Gender.Male, age: 35, city: 'Anantapur', interests: ['Farming', 'Spirituality', 'Meditation'], bio: 'Modern farmer with a connection to the roots. I find peace in nature and meditation.', quizAnswers: [], seed: 14 }),
  createUser({ fullName: 'Padma Vankayala', email: 'padma@example.com', gender: Gender.Female, age: 31, city: 'Karimnagar', interests: ['Teaching', 'Storytelling', 'Theatre'], bio: 'Primary school teacher who loves to tell stories. The world is a stage, and we are all actors.', quizAnswers: [], seed: 15 }),
  createUser({ fullName: 'Ravi Teja', email: 'ravi@example.com', gender: Gender.Male, age: 26, city: 'Nizamabad', interests: ['Cars', 'Video Editing', 'Street Food'], bio: 'Automobile engineer and a budding YouTuber. I review cars and explore the best street food.', quizAnswers: [], seed: 16 }),
  createUser({ fullName: 'Meena Kumari', email: 'meena@example.com', gender: Gender.Female, age: 28, city: 'Khammam', interests: ['History', 'Museums', 'Embroidery'], bio: 'Archaeologist who is fascinated by the past. I spend my free time doing embroidery.', quizAnswers: [], seed: 17 }),
  createUser({ fullName: 'Nageswara Rao', email: 'nageswara@example.com', gender: Gender.Male, age: 34, city: 'Mahbubnagar', interests: ['Business', 'Investing', 'Golf'], bio: 'Entrepreneur who is always looking for the next big idea. I unwind by playing golf.', quizAnswers: [], seed: 18 }),
  createUser({ fullName: 'Anasuya Bharadwaj', email: 'anasuya@example.com', gender: Gender.Female, age: 30, city: 'Srikakulam', interests: ['Anchoring', 'Public Speaking', 'Event Management'], bio: 'TV anchor with a flair for words. I love interacting with people and managing events.', quizAnswers: [], seed: 19 }),
  createUser({ fullName: 'Venkat Prasad', email: 'venkat@example.com', gender: Gender.Male, age: 29, city: 'Ongole', interests: ['Cricket', 'Analytics', 'Board Games'], bio: 'Data analyst who is obsessed with cricket stats. I enjoy a competitive game of chess.', quizAnswers: [], seed: 20 }),
  createUser({ fullName: 'Geetha Madhuri', email: 'geetha@example.com', gender: Gender.Female, age: 27, city: 'Adilabad', interests: ['Singing', 'Karaoke', 'Songwriting'], bio: 'Playback singer with a soulful voice. Music is my life, and I am looking for my duet partner.', quizAnswers: [], seed: 21 }),
  createUser({ fullName: 'Prakash Raj', email: 'prakash@example.com', gender: Gender.Male, age: 36, city: 'Chittoor', interests: ['Acting', 'Directing', 'Social Work'], bio: 'Film actor and director who is committed to social causes. I believe in using art for change.', quizAnswers: [], seed: 22 }),
  createUser({ fullName: 'Roja Selvamani', email: 'roja@example.com', gender: Gender.Female, age: 32, city: 'Kadapa', interests: ['Politics', 'Charity', 'Public Relations'], bio: 'Politician dedicated to serving the people. My work is my passion, but I make time for family.', quizAnswers: [], seed: 23 }),
  createUser({ fullName: 'Jagapathi Babu', email: 'jagapathi@example.com', gender: Gender.Male, age: 38, city: 'Vizianagaram', interests: ['Fitness', 'Motorcycles', 'Philanthropy'], bio: 'Veteran actor who is a fitness freak. I love long rides on my motorcycle for a cause.', quizAnswers: [], seed: 24 }),
  createUser({ fullName: 'Sumalatha Ambareesh', email: 'sumalatha@example.com', gender: Gender.Female, age: 34, city: 'Medak', interests: ['Reading', 'Writing', 'Horse Riding'], bio: 'Author and an equestrian. I find freedom in words and on horseback.', quizAnswers: [], seed: 25 }),
  createUser({ fullName: 'Srikanth Addala', email: 'srikanth@example.com', gender: Gender.Male, age: 30, city: 'Nalgonda', interests: ['Filmmaking', 'Screenwriting', 'Traveling'], bio: 'Aspiring filmmaker looking for stories in everyday life. Travel inspires my work.', quizAnswers: [], seed: 26 }),
  createUser({ fullName: 'Samantha Akkineni', email: 'samantha@example.com', gender: Gender.Female, age: 29, city: 'Hyderabad', interests: ['Acting', 'Fitness', 'Entrepreneurship'], bio: 'Actor and entrepreneur with a passion for fitness. I am always up for a new challenge.', quizAnswers: [], seed: 27 }),
  createUser({ fullName: 'Nani Gopal', email: 'nani@example.com', gender: Gender.Male, age: 31, city: 'Visakhapatnam', interests: ['Cricket', 'Movies', 'Family Time'], bio: '"Natural Star" of my friend circle. I enjoy simple things like watching a movie with loved ones.', quizAnswers: [], seed: 28 }),
  createUser({ fullName: 'Keerthy Suresh', email: 'keerthy@example.com', gender: Gender.Female, age: 26, city: 'Vijayawada', interests: ['Music', 'Fashion', 'Dogs'], bio: 'Musician and fashion lover. My dog is my best friend. Looking for someone to join our pack.', quizAnswers: [], seed: 29 }),
  createUser({ fullName: 'Allu Arjun', email: 'allu@example.com', gender: Gender.Male, age: 33, city: 'Hyderabad', interests: ['Dancing', 'Style', 'Action Movies'], bio: 'Stylish icon who lives to dance. I believe in working hard and partying harder.', quizAnswers: [], seed: 30 }),
];


export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your ideal weekend?',
    options: ['A quiet evening at home', 'A fun night out with friends', 'An adventurous outdoor trip'],
  },
  {
    id: 2,
    question: 'Which do you prefer?',
    options: ['Mountains', 'Beach', 'City'],
  },
  {
    id: 3,
    question: 'How would you describe yourself?',
    options: ['Introvert', 'Extrovert', 'Ambivert'],
  },
  {
    id: 4,
    question: 'Are you more of a planner or spontaneous?',
    options: ['Planning ahead', 'Spontaneous', 'A bit of both'],
  },
  {
    id: 5,
    question: 'Your ideal date would be at a?',
    options: ['Cinema', 'Sports', 'Art Gallery'],
  },
];
