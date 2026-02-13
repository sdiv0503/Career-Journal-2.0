import { NextResponse } from "next/server";
import { getUserByClerkID } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getUserByClerkID();

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }, // Newest first
    });

    return NextResponse.json({ data: resumes });
  } catch (error) {
    console.error("Fetch Resumes Error:", error);
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}