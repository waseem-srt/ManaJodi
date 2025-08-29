# 💖 Mana Jodi - Telugu Matrimony Web App (Front-End MVP) 💙

![Mana Jodi Banner](https://via.placeholder.com/1200x300?text=Mana+Jodi)

**Mana Jodi** is a **gamified, interactive, front-end MVP** for a Telugu-focused matrimonial web app, inspired by Shaadi.com. Designed to simulate a full-stack experience, this MVP focuses on **auth, dummy profiles, gamification, and localization**.  

---

## 🌟 Features

### 🎯 Gamified Onboarding Quiz
- Users take a **fun, interactive quiz** immediately after login.
- Quiz helps **match users** with their ideal partners.
- ✅ Gamified experience makes onboarding **engaging and fun**.

### 🏠 Interactive Home Page
- **Profile cards** with like, shortlist, reject buttons.  
- **Dark Mode toggle** for personalized viewing.  
- Gender-based themes:
  - Pink 💖 for female users  
  - Sky Blue 💙 for male users  
- Responsive and visually appealing UI.  

### 🌐 Localization & Language Support
- Full support for **Telugu language**.  
- Easy **language switcher** for user convenience.  

### 📊 Dummy Data & Interactivity
- 30+ **dummy Telugu profiles** with names, age, interests, locations, and images.  
- Profiles are **interactive** to simulate real platform behavior.  
- **Gamified user engagement** without requiring backend.  

### 💻 Modern Front-End Stack
- **React + TypeScript (TSX)**  
- **CSS/SCSS** for animations, themes, and responsive design  
- **React Router** for navigation  
- **Context API** for global state management  

---

## 📂 Project Structure

mana-jodi-frontend/
│
├─ public/
├─ src/
│ ├─ components/
│ │ ├─ Header.tsx
│ │ ├─ Footer.tsx
│ │ ├─ ProfileCard.tsx
│ │ ├─ Quiz.tsx
│ │ ├─ DarkModeToggle.tsx
│ │ └─ LanguageSwitcher.tsx
│ │
│ ├─ pages/
│ │ ├─ LandingPage.tsx
│ │ ├─ Register.tsx
│ │ ├─ Login.tsx
│ │ └─ Home.tsx
│ │
│ ├─ data/
│ │ └─ dummyProfiles.ts
│ │
│ ├─ context/
│ │ └─ AppContext.tsx
│ │
│ ├─ App.tsx
│ └─ index.tsx
├─ package.json
└─ tsconfig.json



---

## 🚀 Getting Started

### Prerequisites
- **Node.js >= 18.x**  
- **npm >= 9.x**  

### Installation

```bash
git clone https://github.com/yourusername/mana-jodi.git
cd mana-jodi-frontend
npm install
npm run dev
