import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/leaderboard" className="text-slate-400 hover:text-slate-500">
            Leaderboard
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-500">
            Privacy
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-500">
            Terms
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="bg-slate-900 p-1 rounded">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="font-bold text-slate-900">CareerJournal</span>
          </div>
          <p className="text-center text-xs leading-5 text-slate-500 md:text-left">
            &copy; 2026 CareerJournal, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}