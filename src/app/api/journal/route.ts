import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserByClerkID } from "@/lib/auth"; // Import our helper

export async function GET() {
  try {
    // 1. Get the REAL user (creates them if they don't exist)
    const user = await getUserByClerkID();

    const entries = await prisma.entry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: entries });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    // 1. Get the REAL user
    const user = await getUserByClerkID();
    const json = await request.json();

    const entry = await prisma.entry.create({
      data: {
        title: json.title,
        content: json.content,
        date: new Date(json.date),
        userId: user.id, // Link to the Clerk ID
      },
    });

    return NextResponse.json({ data: entry });
  } catch (error) {
    return NextResponse.json({ error: "Error creating entry" }, { status: 500 });
  }
}