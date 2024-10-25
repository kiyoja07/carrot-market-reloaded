"use server";

import db from "@/lib/db";
// import { setQueryLog } from "@/lib/utils";

export const createLike = async (id: number, sessionId: number) => {
  const result = await db.like.create({
    data: {
      postId: id,
      userId: sessionId!,
    },
  });
  //   setQueryLog("좋아요", "likePost", result);
};

export const getLike = async (id: number, sessionId: number) => {
  const like = await db.like.findUnique({
    where: {
      id: {
        postId: id,
        userId: sessionId,
      },
    },
  });
  //   setQueryLog("좋아요 여부 확인", "getLike", like);
  return like;
};

export const delLike = async (id: number, sessionId: number) => {
  const result = await db.like.delete({
    where: {
      id: {
        postId: id,
        userId: sessionId,
      },
    },
  });
  //   setQueryLog("싫어요", "dislikePost", result);
};

export const getLikeCount = async (postId: number) => {
  const likeCounts = await db.like.count({
    where: {
      postId,
    },
  });
  // setQueryLog('좋아요 수 조회', 'getLikeCount', likeCounts);
  return likeCounts;
};

export const getPost = async (id: number) => {
  // 포스트 상세 조회는 조회수를 올려야 하므로 update 처리
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1, // 조회수 1씩 증가
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    // setQueryLog("동네생활 포스트 상세조회", "getPost", post);
    return post;
  } catch (err) {
    return null;
  }
};

export const createComment = async (
  postId: number,
  userId: number,
  payload: string
) => {
  const result = await db.comment.create({
    data: {
      payload,
      postId,
      userId,
    },
    select: { id: true },
  });
  //   setQueryLog("댓글 등록", "createComment", result);
  return result;
};

export const getComments = async (postId: number) => {
  const result = await db.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      created_at: "asc",
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  //   setQueryLog("댓글목록 불러오기", "getComments", result);
  return result;
};

export const delComment = async (commentId: number) => {
  const result = await db.comment.delete({
    where: {
      id: commentId,
    },
  });
  //   setQueryLog("댓글목록 불러오기", "getComments", result);
  return result;
};
