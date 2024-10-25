import { notFound } from "next/navigation";
import { getComments, getPost } from "@/app/posts/[id]/repositories";
import { getLikeStatus } from "@/app/posts/[id]/services";
import { unstable_cache as nextCache } from "next/cache";

import React from "react";
import { getSessionId, getUser } from "@/lib/session";
import PostContainer from "@/app/posts/[id]/components/PostContainer";
import CommentInput from "./components/comment-input";

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const user = await getUser();

  const getCachedPost = nextCache(getPost, ["post-detail"], {
    tags: ["post-detail"],
    revalidate: 30,
  });

  const getCachedComments = (postId: number) => {
    const cachedOperation = nextCache(getComments, ["post-comments"], {
      tags: [`post-comments-${postId}`],
    });
    return cachedOperation(postId);
  };

  const getCachedLikedStatus = async (postId: number, sessionId: number) => {
    const cachedOperation = nextCache(
      () => getLikeStatus(postId, sessionId), // Pass a function that returns the Promise
      ["product-like-status"],
      {
        tags: [`like-status-${postId}`],
      }
    );
    return cachedOperation(postId);
  };

  if (isNaN(id)) return notFound();

  const post = await getCachedPost(id);
  if (!post) return notFound();

  const sessionId = await getSessionId();

  const { likeCount, isLiked } = await getCachedLikedStatus(id, sessionId);
  const initComments = await getCachedComments(id);

  return (
    <div className="p-5 relative h-screen">
      <PostContainer
        post={post}
        postId={id}
        isLiked={isLiked}
        likeCount={likeCount}
        initComments={initComments}
        userId={user.id}
      />
      <CommentInput postId={id} userId={user.id} />
    </div>
  );
};

export default PostDetail;
