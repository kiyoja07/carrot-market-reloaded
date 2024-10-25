"use client";

import PostContent from "@/app/posts/[id]/components/post-content";
import CommentList from "@/app/posts/[id]/components/comment-list";
import { InitialComments, InitialPost } from "@/app/posts/[id]/types";
import { useComment } from "@/app/posts/[id]/hooks";

type PostContainerProps = {
  post: InitialPost;
  postId: number;
  isLiked: boolean;
  likeCount: number;
  initComments: InitialComments;
  userId: number;
};

const PostContainer = ({
  post,
  postId,
  isLiked,
  likeCount,
  initComments,
  userId,
}: PostContainerProps) => {
  const { isFolded, setIsFolded } = useComment();

  return (
    <div className="h-full overflow-hidden">
      {post && (
        <PostContent
          post={post}
          postId={postId}
          isLiked={isLiked}
          likeCount={likeCount}
          foldState={[isFolded, setIsFolded]}
        />
      )}
      <hr className="mb-4 mt-24" />
      <CommentList
        postId={postId}
        initComments={initComments}
        userId={userId}
        foldState={[isFolded, setIsFolded]}
      />
    </div>
  );
};

export default PostContainer;
