"use client";

import React, { useEffect } from "react";
import Input from "@/components/input";
import { useComment } from "@/app/posts/[id]/hooks";
import { CommentRefIds } from "@/app/posts/[id]/types";
import Button0 from "@/components/button0";

const CommentInput = ({ postId, userId }: CommentRefIds) => {
  const { errors, register, reset, onValid, setCommentRefId } = useComment();

  useEffect(() => {
    setCommentRefId({ postId, userId });
  }, [postId, setCommentRefId, userId]);

  return (
    <div className="flex flex-col gap-2 justify-between absolute bottom-3 left-0 max-w-screen-sm w-full mx-auto p-6 bg-gray-100 dark:bg-gray-800">
      <form className="flex gap-2" action={onValid} onSubmit={(e) => reset(e)}>
        <div className="w-full">
          <Input
            type="text"
            errors={[errors.payload?.message ?? ""]}
            required
            {...register("payload")}
          />
        </div>
        <div className="w-24">
          <Button0 type="submit" outlined>
            등록
          </Button0>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
