import Image from "next/image"; // ADDED: Required for the <Image /> component

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side: Branding (Hidden on mobile) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white lg:flex">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 h-full w-full opacity-10">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-500 blur-[100px]" />
          <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-emerald-500 blur-[100px]" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          {/* FIXED: Added relative, h-10, w-10 so the 'fill' image knows its size */}
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white/10 p-2 backdrop-blur-sm">
            <Image
              src="/logo.png"
              alt="Career Journal Logo"
              fill
              className="object-contain"
              priority // Tells Next.js to load this instantly
            />
          </div>
          <span className="text-2xl font-bold tracking-tight">CareerJournal</span>
        </div>

        {/* Quote / Testimonial */}
        <div className="relative z-10 max-w-md">
          <blockquote className="text-2xl leading-normal font-medium">
            "The difference between a junior and a senior developer is often just the ability to
            articulate their impact. This tool bridges that gap."
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
        <div className="relative z-10 text-sm text-slate-500">© 2026 CareerJournal Inc.</div>
      </div>

      {/* Right Side: The Form (Clerk Component) */}
      <div className="flex items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
}