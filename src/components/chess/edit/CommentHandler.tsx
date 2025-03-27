"use client";

import { useEffect, useState } from "react";
import { useChessboard } from "./EditChessboardProvider";
import { Comment } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime } from "@/lib/i18n";
import { Button } from "../../ui/button";
import FormAddComment from "@/app/(private)/comments/_components/add/FormAddComment";
import FormEditComment from "@/app/(private)/comments/_components/edit/FormEditComment";
import Spinner from "../../loaders/Spinner";
import GeneralError from "../../errors/GeneralError";
import ButtonDeleteComment from "@/app/(private)/comments/_components/delete/ButtonDeleteComment";
import CommentProvider from "@/app/(private)/comments/_components/CommentProvider";
import ModalDeleteComment from "@/app/(private)/comments/_components/delete/ModalDeleteComment";

const CommentHandler = () => {
  const { node, directory } = useChessboard();
  const [editMode, setEditMode] = useState<boolean>(false);
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ["comments", directory.id],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/comments/api?positionId=" +
          node.position.id
      );
      return await response.json();
    },
  });

  useEffect(() => {
    refetch();
  }, [node]);

  if (isFetching) {
    return <Spinner />;
  }

  if (error)
    return (
      <GeneralError>An error occurred while fetching the comment.</GeneralError>
    );

  if (data.comments.length === 0) {
    return (
      <FormAddComment
        directory={directory}
        position={node.position}
        onSuccess={() => {
          refetch();
        }}
      />
    );
  }

  const comment = data.comments[0] as Comment;

  if (editMode) {
    return (
      <FormEditComment
        comment={comment}
        onSuccess={() => {
          setEditMode(false);
          refetch();
        }}
        onCancel={() => {
          setEditMode(false);
        }}
      />
    );
  }

  return (
    <CommentProvider>
      <div className="bg-slate-800 p-2 rounded-md">
        <div>{comment.content}</div>
        <div className="text-xs mt-2">
          added on {formatDateTime(comment.createdAt)}
        </div>
        <div className="mt-2 flex">
          <div className="flex-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditMode(true)}
            >
              update
            </Button>
          </div>
          <div>
            <ButtonDeleteComment comment={comment} />
          </div>
        </div>
      </div>
      <ModalDeleteComment
        onSuccess={() => {
          refetch();
        }}
      />
    </CommentProvider>
  );
};

export default CommentHandler;
