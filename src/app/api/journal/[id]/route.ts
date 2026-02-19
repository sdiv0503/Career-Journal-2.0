import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// PATCH: Update an entry
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // FIX: Typed as a Promise
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { content } = await req.json();

    // Await params in Next.js 15+
    const { id } = await params;

    // Verify ownership before updating
    const existingEntry = await prisma.entry.findUnique({
      where: { id, userId },
    });

    if (!existingEntry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    const updatedEntry = await prisma.entry.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json({ data: updatedEntry });
  } catch (error) {
    return NextResponse.json({ error: "Error updating entry" }, { status: 500 });
  }
}

// DELETE: Remove an entry
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // FIX: Typed as a Promise
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    // Verify ownership before deleting
    const existingEntry = await prisma.entry.findUnique({
      where: { id, userId },
    });

    if (!existingEntry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    await prisma.entry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting entry" }, { status: 500 });
  }
}
