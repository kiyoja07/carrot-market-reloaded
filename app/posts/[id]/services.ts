"use server";

import {
  createLike,
  delComment,
  delLike,
  getLike,
  getLikeCount,
} from "@/app/posts/[id]/repositories";
import getSession, { getSessionId } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getIsLiked = async (postId: number, sessionId: number) => {
  //   const sessionId = await getSessionId();
  const like = await getLike(postId, sessionId!);
  return Boolean(like);
};

export const likePost = async (postId: number) => {
  // await new Promise((r) => setTimeout(r, 5000));
  try {
    const sessionId = await getSessionId();
    await createLike(Number(postId), sessionId!);
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
};

export const dislikePost = async (postId: number) => {
  // await new Promise((r) => setTimeout(r, 5000));
  try {
    const sessionId = await getSessionId();
    await delLike(Number(postId), sessionId!);
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
};

export const getLikeStatus = async (id: number, sessionId: number) => {
  const likeCount = await getLikeCount(Number(id));
  const isLiked = await getIsLiked(Number(id), Number(sessionId));

  return {
    likeCount,
    isLiked,
  };
};

export const fetchComment = async (postId: number) => {
  revalidateTag(`post-comments-${postId}`);
};

export const removeComment = async (commentId: number, postId: number) => {
  await delComment(commentId);
  await fetchComment(postId);
};
