"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

type Props = {
  workspaceId: string;
  workspaceName: string;
};

const Workspace = (props: Props) => {
  const { workspaceId } = useParams();
  const pathname = usePathname();

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
        " relative px-6 py-4 w-full font-normal max-w-[60px] truncate whitespace-nowrap text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
        (workspaceId === props.workspaceId
          ? " bg-orange-300 dark:bg-gray-700 text-black"
          : " bg-white dark:bg-gray-800 text-black")
      }
    >
      <span>
        <Link
          href={`${pathname}?popup=workspace&action=delete&arg=${props.workspaceId}`}
        >
          <IoClose className="text-xl absolute right-0 top-0 hover:text-rose-300" />
        </Link>
      </span>
      <span className="text-lg font-semibold">{props.workspaceName}</span>
    </Link>
  );
};

export default Workspace;
