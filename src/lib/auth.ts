import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export const getUserByClerkID = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  // 1. Try to find the user in our DB
  const user = await prisma.user.findUnique({
    where: {
      id: clerkUser.id,
    },
  });

  // 2. If found, return it
  if (user) {
    return user;
  }

  // 3. If not found, create them (Lazy Sync)
  const newUser = await prisma.user.create({
    data: {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      imageUrl: clerkUser.imageUrl,
    },
  });

  return newUser;
};