import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy } from "lucide-react"; // Added Trophy icon
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white/75 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-slate-900 p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                CareerJournal
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Show when Logged Out */}
            <SignedOut>
              <Link href="/leaderboard">
                <Button variant="ghost" className="hidden sm:flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  Leaderboard
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </SignedOut>

            {/* Show when Logged In */}
            <SignedIn>
              <Link href="/leaderboard">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="hidden sm:inline">Leaderboard</span>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" className="mr-2">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}