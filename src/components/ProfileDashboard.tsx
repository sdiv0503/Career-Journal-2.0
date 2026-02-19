"use client";

// 1. FIX: Import the 'Variants' type from framer-motion
import { motion, Variants } from "framer-motion";
import { Trophy, Flame, Zap, Award, Target, Mail, Hexagon } from "lucide-react";

interface ProfileDashboardProps {
  user: {
    firstName: string | null;
    lastName: string | null;
    imageUrl: string;
    email: string;
  };
  stats: {
    level: number;
    currentXP: number;
    xpForNextLevel: number;
    progressPercent: number;
    streak: number;
    totalLogs: number;
    totalResumes: number;
  };
  badges: any[];
}

// 2. FIX: Explicitly type the animation objects as 'Variants'
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function ProfileDashboard({ user, stats, badges }: ProfileDashboardProps) {
  return (
    <motion.div
      className="mx-auto max-w-5xl px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 1. HERO SECTION */}
      <motion.div
        variants={itemVariants}
        className="group relative mb-8 overflow-hidden rounded-[2rem] border border-[#262626] bg-[#0a0a0a] p-8 shadow-2xl md:p-12"
      >
        <div className="absolute top-0 right-0 h-[30rem] w-[30rem] translate-x-1/3 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl transition-all duration-700 group-hover:bg-amber-500/10" />

        <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative shrink-0">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="relative z-10 h-32 w-32 rounded-2xl border border-[#333] object-cover shadow-2xl"
            />
            {/* Glowing backdrop for the image */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-amber-500/20 blur-xl" />
          </div>

          <div className="w-full flex-1 space-y-5 text-center md:text-left">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-[#F5F5DC] md:text-5xl">
                {user.firstName} {user.lastName}
              </h1>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-[#a3a39e] md:justify-start">
                <span className="flex items-center gap-2 rounded-xl border border-[#262626] bg-[#141414] px-4 py-2">
                  <Mail className="h-4 w-4 text-amber-500/70" /> {user.email}
                </span>
              </div>
            </div>

            {/* Premium Animated Progress Bar */}
            <div className="max-w-lg rounded-2xl border border-[#262626] bg-[#141414] p-5 shadow-inner">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">
                    Current Rank
                  </span>
                  <div className="text-2xl font-bold text-[#F5F5DC]">Level {stats.level}</div>
                </div>
                <div className="text-sm font-bold text-[#a3a39e]">
                  <span className="text-[#F5F5DC]">{stats.currentXP}</span> / {stats.xpForNextLevel}{" "}
                  XP
                </div>
              </div>
              <div className="h-4 overflow-hidden rounded-full border border-[#262626] bg-[#0a0a0a]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. THE BENTO GRID STATS */}
      <motion.div
        variants={containerVariants}
        className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <motion.div
          variants={itemVariants}
          className="relative col-span-2 flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-[#262626] bg-[#141414] p-6 text-center transition-colors hover:border-orange-500/50 md:col-span-1"
        >
          <Flame className="absolute top-6 right-6 mb-3 h-8 w-8 text-orange-500 opacity-20" />
          <Flame className="mb-3 h-8 w-8 text-orange-500" />
          <div className="mb-1 text-4xl font-black text-[#F5F5DC]">{stats.streak}</div>
          <div className="text-xs font-bold tracking-widest text-[#a3a39e] uppercase">
            Day Streak
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative col-span-2 flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-[#262626] bg-[#141414] p-6 text-center transition-colors hover:border-amber-500/50 md:col-span-1"
        >
          <Zap className="absolute top-6 right-6 mb-3 h-8 w-8 text-amber-500 opacity-20" />
          <Zap className="mb-3 h-8 w-8 text-amber-500" />
          <div className="mb-1 text-4xl font-black text-[#F5F5DC]">{stats.currentXP}</div>
          <div className="text-xs font-bold tracking-widest text-[#a3a39e] uppercase">Total XP</div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="col-span-2 flex items-center justify-around rounded-[2rem] border border-[#262626] bg-[#141414] p-6"
        >
          <div className="text-center">
            <Target className="mx-auto mb-2 h-6 w-6 text-emerald-500" />
            <div className="text-3xl font-black text-[#F5F5DC]">{stats.totalLogs}</div>
            <div className="mt-1 text-xs font-bold tracking-widest text-[#a3a39e] uppercase">
              Journal Logs
            </div>
          </div>
          <div className="h-16 w-px bg-[#262626]" /> {/* Divider */}
          <div className="text-center">
            <Award className="mx-auto mb-2 h-6 w-6 text-blue-500" />
            <div className="text-3xl font-black text-[#F5F5DC]">{stats.totalResumes}</div>
            <div className="mt-1 text-xs font-bold tracking-widest text-[#a3a39e] uppercase">
              Resumes
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. TROPHY CASE */}
      <motion.div variants={itemVariants}>
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2">
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#F5F5DC]">Achievements</h2>
        </div>

        {badges.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative flex flex-col items-center overflow-hidden rounded-[2rem] border border-[#262626] bg-[#141414] p-6 text-center shadow-lg"
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative mb-4">
                  <Hexagon className="h-16 w-16 fill-[#0a0a0a] text-[#262626]" />
                  <Award className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-amber-500" />
                </div>
                <h3 className="mb-2 font-bold text-[#F5F5DC]">{badge.name}</h3>
                <p className="text-xs leading-relaxed text-[#a3a39e]">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#333] bg-[#141414] py-16 text-center">
            <Trophy className="mx-auto mb-4 h-12 w-12 text-[#333]" />
            <h3 className="mb-2 text-lg font-bold text-[#F5F5DC]">No achievements yet</h3>
            <p className="mx-auto max-w-sm text-sm text-[#a3a39e]">
              Maintain your journaling streak and optimize your resumes to start unlocking the trophy case.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
