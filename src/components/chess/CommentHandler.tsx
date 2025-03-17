"use client";

import { useEffect, useState } from "react";
import { useChessboard } from "./ChessboardProvider";
import { dbg } from "@/lib/helpers";
import { Comment } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime } from "@/lib/i18n";
import { Button } from "../ui/button";
import FormAddComment from "@/app/comments/_components/add/FormAddComment";
import FormEditComment from "@/app/comments/_components/edit/FormEditComment";
import Spinner from "../loaders/Spinner";
import GeneralError from "../errors/GeneralError";
import ButtonDeleteComment from "@/app/comments/_components/delete/ButtonDeleteComment";
import CommentProvider from "@/app/comments/_components/CommentProvider";
import ModalDeleteComment from "@/app/comments/_components/delete/ModalDeleteComment";

const CommentHandler = () => {
  const { node, directory } = useChessboard();
  const [editMode, setEditMode] = useState<boolean>(false);
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ["comments", directory.id],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3000/comments/api?positionId=" + node.position.id
      );
      return await response.json();
    },
  });

  useEffect(() => {
    dbg.debug("request comments for position: " + node.position.id);
    refetch();
  }, [node]);

  if (isFetching) {
    return <Spinner />;
  }

  if (error)
    return (
      <GeneralError>
        Une erreur s'est produite lors de la récupération du commentaire
      </GeneralError>
    );

  if (data.comments.length === 0) {
    return (
      <FormAddComment
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
          ajouté le {formatDateTime(comment.createdAt)}
        </div>
        <div className="mt-2 flex">
          <div className="flex-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditMode(true)}
            >
              modifier
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
