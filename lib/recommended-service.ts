import { db } from "@/lib/db";
import { getSelf } from "./auth-service";
import { User } from "@prisma/client";

export const getRecommended = async () => {
  let userId = null;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    console.log("error", error);
  }
  let users: User[] = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followee: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocker: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
