"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (userId: string) => {
  try {
    const followedUser = await followUser(userId);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.followee.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error("Internal error");
  }
};

export const onUnfollow = async (userId: string) => {
  try {
    const unfollowedUser = await unfollowUser(userId);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.followee.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error("Internal error");
  }
};
