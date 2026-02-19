import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProfileDashboard } from "@/components/ProfileDashboard";

export default async function ProfilePage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();
  
  if (!userId || !clerkUser) redirect("/sign-in");

  // Fetch the user's gamification data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      badges: true,
      _count: {
        select: { entries: true, resumes: true }
      }
    }
  });

  if (!user) redirect("/");

  // Gamification Math
  const level = user.level || 1;
  const currentXP = user.xp || 0;
  const xpForNextLevel = level * 100;
  const progressPercent = Math.min((currentXP / xpForNextLevel) * 100, 100);
  const email = clerkUser.emailAddresses[0]?.emailAddress || "No email linked";

  // Package the data for our Client Component
  const userData = {
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    imageUrl: clerkUser.imageUrl,
    email: email,
  };

  const statsData = {
    level,
    currentXP,
    xpForNextLevel,
    progressPercent,
    streak: user.streak || 0,
    totalLogs: user._count.entries,
    totalResumes: user._count.resumes,
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-20 selection:bg-amber-500/30">
      {/* Note: Depending on your Navbar styling, it might be white. 
        If it looks weird against the black background, you may want to style 
        the Navbar separately later, but the contrast usually looks quite modern!
      */}
      <Navbar />
      
      {/* Render the animated client component */}
      <ProfileDashboard 
        user={userData} 
        stats={statsData} 
        badges={user.badges} 
      />
    </div>
  );
}