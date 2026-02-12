import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  TrendingUp, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-16 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-900 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              v1.0 Public Beta is Live
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Master Your Career with <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Intelligent Journaling
              </span>
            </h1>
            
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Track your daily coding progress, analyze your resume with AI, and bridge your skill gaps. 
              The only journal designed for software engineers.
            </p>
            
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start My Journal <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com" target="_blank">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  Star on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything you need to grow
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Stop guessing your progress. Start measuring it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Daily Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Log your daily learning, coding challenges, and project updates. 
                    Keep a history of your "wins" to reference during interviews.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <BrainCircuit className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>AI Resume Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Upload your PDF resume and let our AI engine scan it against 
                    industry standards to find missing keywords and weak spots.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Growth Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Visualize your consistency with GitHub-style heatmaps and 
                    skill charts. See exactly how much you've grown over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF / TRUST SECTION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center p-12">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Ready to level up your career?
                  </h3>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Track daily progress effortlessly",
                      "Get AI-powered resume feedback",
                      "Visualize your skill growth",
                      "100% Free & Open Source"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-slate-300">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    Get Started Now
                  </Button>
                </div>
                <div className="relative h-64 md:h-full min-h-[300px] bg-slate-800 rounded-xl border border-slate-700 p-4 flex items-center justify-center">
                  <p className="text-slate-500 font-mono text-sm">
                    {/* Placeholder for a future dashboard screenshot */}
                    [Dashboard Preview Image Placeholder]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}