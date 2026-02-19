import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500 rounded-full blur-[100px]" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-xl font-bold tracking-tight">CareerJournal</span>
        </div>

        {/* Quote / Testimonial */}
        <div className="relative z-10 max-w-md">
          <blockquote className="text-2xl font-medium leading-normal">
            "The difference between a junior and a senior developer is often just the ability to articulate their impact. This tool bridges that gap."
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400" />
            <div>
              <div className="font-semibold">Adunola Adeshola</div>
              <div className="text-sm text-slate-400">Career Development Coach</div>
            </div>
          </div>
        </div>
        
        {/* Footer Text */}
        <div className="relative z-10 text-sm text-slate-500">
          © 2026 CareerJournal Inc.
        </div>
      </div>

      {/* Right Side: The Form (Clerk Component) */}
      <div className="flex items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}