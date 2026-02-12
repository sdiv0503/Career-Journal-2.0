export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Week 1 • Day 1 • Milestone Reached
        </p>
      </div>

      <div className="relative flex place-items-center my-16">
        <h1 className="text-6xl font-bold tracking-tight text-slate-900">
          Career <span className="text-blue-600">Journal</span>
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-8">
        <StatusCard
          title="Setup"
          status="Complete ✅"
          desc="Next.js, TypeScript & Tailwind configured."
        />
        <StatusCard
          title="Database"
          status="Pending ⏳"
          desc="PostgreSQL connection coming in Week 2."
        />
        <StatusCard
          title="AI Engine"
          status="Pending ⏳"
          desc="OpenAI integration planned for Week 4."
        />
      </div>
    </main>
  );
}

// Simple internal component for the status cards
function StatusCard({
  title,
  status,
  desc,
}: {
  title: string;
  status: string;
  desc: string;
}) {
  return (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {title} <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-></span>
      </h2>
      <p className={`m-0 text-sm opacity-50 mb-2`}>{status}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>{desc}</p>
    </div>
  );
}