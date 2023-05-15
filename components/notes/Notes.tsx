"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

type Props = {
  noteId: string;
  noteTitle: string;
};

const Notes = (props: Props) => {
  const { noteId, folderId, workspaceId } = useParams();
  const router = useRouter();

  return (
    <button
      className={
        "px-6 py-4 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
        (noteId === props.noteId
          ? " bg-orange-300 dark:bg-gray-700 text-black"
          : " bg-white dark:bg-gray-800 text-black")
      }
      onClick={() => {
        router.push(
          `workspace/${workspaceId}/folder/${folderId}/note/${props.noteId}`
        );
      }}
    >
      {props.noteTitle}
    </button>
  );
};

export default Notes;
