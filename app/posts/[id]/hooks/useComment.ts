"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { commentScheme, CommentType } from "@/app/posts/[id]/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentRefIds, InitialComments } from "@/app/posts/[id]/types";
import { fetchComment } from "@/app/posts/[id]/services";
import { setCommentInfo } from "../commentAction";

export const useComment = () => {
  const [isFolded, setIsFolded] = useState<boolean>(false);
  const [comments, setComments] = useState<InitialComments>([]);
  const [commentRefId, setCommentRefId] = useState<CommentRefIds>({
    postId: 0,
    userId: 0,
  });

  const { postId, userId } = commentRefId;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentType>({
    resolver: zodResolver(commentScheme),
  });

  const onSubmit = handleSubmit(async (data: CommentType) => {
    const formData = new FormData();

    formData.append("payload", data.payload);

    await setCommentInfo(formData, postId, userId);
    await fetchComment(postId);
  });

  const onValid = async () => await onSubmit();

  const reset = (e: any) => e.target.reset();

  return {
    isFolded,
    setIsFolded,
    setCommentRefId,
    errors,
    register,
    reset,
    comments,
    setComments,
    onValid,
  };
};
