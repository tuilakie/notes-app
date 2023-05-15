"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  workspaceId: string;
  workspaceName: string;
};

const Workspace = (props: Props) => {
  const { workspaceId } = useParams();

  return (
    // <button
    //   className={
    //     "px-6 py-4 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
    //     (noteId === props.noteId
    //       ? " bg-orange-300 dark:bg-gray-700 text-black"
    //       : " bg-white dark:bg-gray-800 text-black")
    //   }
    //   onClick={() => {
    //     router.push(
    //       `workspace/${workspaceId}/folder/${folderId}/note/${props.noteId}`
    //     );
    //   }}
    // >
    //   {props.noteTitle}
    // </button>
    <Link
      href={`/workspace/${props.workspaceId}`}
      className={
        " block px-6 py-4 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
        (workspaceId === props.workspaceId
          ? " bg-orange-300 dark:bg-gray-700 text-black"
          : " bg-white dark:bg-gray-800 text-black")
      }
    >
      {props.workspaceName}
    </Link>
  );
};

export default Workspace;
