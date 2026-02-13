import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserByClerkID } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Keep the async params fix!
) {
  try {
    const user = await getUserByClerkID();
    const { id } = await params;

    // Security Check: Ensure the entry belongs to THIS user
    const entry = await prisma.entry.findUnique({
      where: { id, userId: user.id },
    });

    if (!entry) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    await prisma.entry.delete({
      where: { id },
    });

    return NextResponse.json({ data: { message: "Deleted" } });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting" }, { status: 500 });
  }
}