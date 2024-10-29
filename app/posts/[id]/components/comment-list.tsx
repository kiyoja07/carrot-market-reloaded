"use client";

import Image from "next/image";
import { formatToTimeAgo } from "@/lib/utils";
import { InitialComments } from "@/app/posts/[id]/types";
import { useEffect } from "react";
import noUserImg from "@/public/no_user.png";
import { removeComment } from "@/app/posts/[id]/services";
import { useComment } from "@/app/posts/[id]/hooks";
import Button0 from "@/components/button0";

type CommentListProps = {
  postId: number;
  initComments: InitialComments;
  userId: number;
  foldState: [boolean, (val: boolean) => void];
};

const CommentList = ({
  postId,
  initComments,
  userId,
  foldState,
}: CommentListProps) => {
  const { comments, setComments } = useComment();
  const [isFolded, setIsFolded] = foldState;

  useEffect(() => {
    setComments(initComments);
  }, [initComments, setComments]);

  return (
    <div className="h-full">
      <div className="my-2 flex justify-between items-center w-full">
        <div className="w-full">댓글 ({comments.length})</div>
        {comments && comments.length > 0 && (
          <button className="w-12" onClick={() => setIsFolded(!isFolded)}>
            {isFolded ? "보기" : "닫기"}
          </button>
        )}
      </div>
      <div className="h-1/4 overflow-y-auto">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <div
              key={comment.id}
              className="my-4 border-b border-b-neutral-500"
              style={{ display: isFolded ? "none" : "block" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center w-full gap-2 mb-2 overflow-y-auto">
                  <Image
                    width={28}
                    height={28}
                    className="size-7 rounded-full"
                    style={{
                      border: comment.user.avatar
                        ? undefined
                        : "1px solid gray",
                    }}
                    src={comment.user.avatar ?? noUserImg}
                    alt={comment.user.username}
                  />
                  <div>
                    <span className="text-sm font-semibold">
                      {comment.user.username}
                    </span>
                    <div className="text-xs">
                      <span>
                        {formatToTimeAgo(comment.created_at.toString())}
                      </span>
                    </div>
                  </div>
                </div>
                {userId === comment.userId && (
                  <div className="w-24">
                    <Button0
                      outlined
                      rounded
                      onClick={() => removeComment(comment.id, postId)}
                    >
                      삭제
                    </Button0>
                  </div>
                )}
              </div>
              <div className="my-4 w-full">{comment.payload}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
