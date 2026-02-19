"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase } from "lucide-react"; // Import icons here
import { cn } from "@/lib/utils";

interface GatewayCardProps {
  title: string;
  description: string;
  href: string;
  type: "journal" | "analyzer"; // Changed from 'icon' component to a string 'type'
}

export function GatewayCard({ title, description, href, type }: GatewayCardProps) {
  // Determine color and icon based on the simple string type
  const isJournal = type === "journal";
  const Icon = isJournal ? BookOpen : Briefcase;
  const colorClass = isJournal 
    ? "bg-emerald-100 text-emerald-600" 
    : "bg-blue-100 text-blue-600";
  
  const hoverBorder = isJournal ? "hover:border-emerald-200" : "hover:border-blue-200";
  const hoverShadow = isJournal ? "hover:shadow-emerald-100/50" : "hover:shadow-blue-100/50";
  const blobColor = isJournal ? "bg-emerald-400" : "bg-blue-400";
  const textColor = isJournal ? "text-emerald-600" : "text-blue-600";

  return (
    <Link href={href} className="block group relative w-full md:w-1/2">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "h-full p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden bg-slate-50 border-slate-200",
          hoverBorder,
          hoverShadow,
          "hover:shadow-xl"
        )}
      >
        <div className={cn(
          "absolute top-0 right-0 p-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
          blobColor
        )} />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
              colorClass
            )}>
              <Icon className="w-6 h-6" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:translate-x-1 transition-transform">
              {title}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              {description}
            </p>
          </div>

          <div className={cn(
            "mt-8 flex items-center gap-2 font-semibold",
            textColor
          )}>
            Enter {title}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}