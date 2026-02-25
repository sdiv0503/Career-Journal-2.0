<div align="center">
  <img src="public/logo.png" alt="Career Journal Logo" width="100" />
  <h1>Career Journal v2.0 🚀</h1>
  <p>A gamified developer journal and AI-powered career growth platform.</p>
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success?style=for-the-badge)](https://careerjournal2.vercel.app/)
</div>

---

## 📌 Overview
Career Journal is a split-architecture command center designed to help software engineers track their daily progress and optimize their job hunt. It bridges the gap between building skills and successfully marketing them to employers.

The platform is divided into two core modules:
* **The Gym (Journal):** A daily habit tracker for coding wins, bugs, and learnings. Features a gamified progression system with XP, streaks, and unlockable badges.
* **The Lab (Analyzer):** An AI-driven career suite. Upload your tech resume to get instant ATS scoring, gap analysis against target Job Descriptions, AI Mock Interviews, and generated 6-month learning roadmaps.

## ✨ Key Features
* **Gamification Engine:** Track daily streaks, earn XP, and unlock achievements showcased in a sleek "Trophy Room" dashboard.
* **AI Resume Analysis:** Strict, objective ATS scoring and structural feedback powered by Gemini 2.5 Flash.
* **Job Description Matcher:** Cross-references your resume against specific JDs to highlight missing keywords and critical gaps.
* **Interactive Mock Interviews:** Real-time, streaming AI chat interface acting as a Hiring Manager based on your uploaded resume context.
* **Career Roadmap Generator:** Builds a customized, month-by-month technical curriculum to reach your target role.

## 🛠️ Tech Stack
* **Framework:** Next.js 15 (App Router, Turbopack)
* **Language:** TypeScript
* **Styling & Animations:** Tailwind CSS, Framer Motion
* **Authentication:** Clerk (with GitHub OAuth)
* **Database & ORM:** PostgreSQL (Neon/Supabase) & Prisma
* **AI Integration:** Google Generative AI SDK (Gemini 2.5 Flash)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed. You will also need a PostgreSQL database and a Clerk account.

### 1. Clone the repository
```bash
git clone [https://github.com/sdiv0503/career-journal-2.0.git](https://github.com/sdiv0503/career-journal-2.0.git)
cd career-journal

```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps

```

### 3. Set up Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

DATABASE_URL=your_postgresql_connection_string

GOOGLE_API_KEY=your_gemini_api_key

```

### 4. Database Initialization

Push the Prisma schema to your database to create the necessary tables:

```bash
npx prisma generate
npx prisma db push

```

### 5. Run the development server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the application.

---

Built by [Divyansh Sharma](https://www.google.com/search?q=https://github.com/sdiv0503)
