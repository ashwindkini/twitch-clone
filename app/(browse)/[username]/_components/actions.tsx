"use client";

import { onBlock, onUnblock } from "@/app/actions/block";
import { onFollow, onUnfollow } from "@/app/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.followee.username}`)
        )
        .catch(() => toast.error("Failed to follow the user"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You are no longer following ${data.followee.username}`)
        )
        .catch(() => toast.error("Failed to unfollow the user"));
    });
  };

  const onClick = isFollowing ? handleUnfollow : handleFollow;

  const handleBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`Unblocked the user ${data?.blocked.username}`)
        )
        .catch(() => toast.error("Failed to block the user"));
    });
  };

  return (
    <>
      <Button disabled={isPending} variant="primary" onClick={onClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        Block
      </Button>
    </>
  );
};
