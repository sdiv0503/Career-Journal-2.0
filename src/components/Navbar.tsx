import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white/75 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              CareerJournal
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">
              Pricing
            </Link>
          </div>

          {/* CTA Button */}
          <div>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}