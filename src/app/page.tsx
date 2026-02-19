import { Navbar } from "@/components/Navbar";
import { GatewayCard } from "@/components/GatewayCard";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Background } from "@/components/landing/Background";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative isolate">
      <Navbar />
      <Background />
      
      <main>
        {/* Hero Section */}
        <div className="relative pt-14 pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
                Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Career</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Two powerful tools, one platform. Build daily habits in the Journal or optimize your hiring potential with the Analyzer.
              </p>
            </div>

            {/* The Gateway Cards */}
            <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
              <GatewayCard
                title="The Journal"
                description="Track your daily wins, build consistency streaks, and level up your professional habits."
                href="/journal"
                type="journal"
              />
              
              <GatewayCard
                title="The Analyzer"
                description="AI-powered resume scoring and JD matching to ensure you are the perfect fit."
                href="/analyzer"
                type="analyzer"
              />
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <FeatureGrid />
      </main>

      <Footer />
    </div>
  );
}