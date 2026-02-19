import { Target, Zap, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    name: "AI-Powered Analysis",
    description: "Get instant, consultant-grade feedback on your resume using Google Gemini 2.5",
    icon: Zap,
  },
  {
    name: "Gamified Habits",
    description: "Build a consistent journaling streak and earn XP to level up your career profile.",
    icon: TrendingUp,
  },
  {
    name: "Job Description Matching",
    description: "Paste a JD and see exactly how well your resume fits and how to fix it.",
    icon: Target,
  },
  {
    name: "Private & Secure",
    description: "Your data is yours. We use industry-standard encryption via Clerk and Neon.",
    icon: Shield,
  },
];

export function FeatureGrid() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Deploy Faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to get hired
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Stop guessing. Start engineering your career growth with data-backed insights and consistent habits.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}