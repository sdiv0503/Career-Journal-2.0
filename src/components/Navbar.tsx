"use client";

import Link from "next/link";
import Image from "next/image"; // 1. Import the Next.js Image component
import { Button } from "@/components/ui/button";
import { Briefcase, BookOpen, Trophy } from "lucide-react"; // Removed Sparkles
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            
            <Link href="/" className="group flex items-center gap-2">
              {/* 2. Replace the Sparkles div with your new Image */}
              <div className="relative h-8 w-8 overflow-hidden rounded-md transition-transform group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="Career Journal Logo" 
                  fill
                  className="object-contain"
                  priority // Tells Next.js to load this instantly
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">CareerJournal</span>
            </Link>

            {/* Internal Nav Links - Only visible when signed in */}
            <SignedIn>
              <div className="hidden items-center space-x-1 md:flex">
                <Link href="/journal">
                  <Button variant="ghost" className="gap-2 text-slate-600">
                    <BookOpen className="h-4 w-4" />
                    Journal
                  </Button>
                </Link>
                <Link href="/analyzer">
                  <Button variant="ghost" className="gap-2 text-slate-600">
                    <Briefcase className="h-4 w-4" />
                    Analyzer
                  </Button>
                </Link>
              </div>
            </SignedIn>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </SignedOut>
            
            <SignedIn>
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Trophy Room"
                    labelIcon={<Trophy className="h-4 w-4 text-amber-500" />}
                    href="/profile"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}