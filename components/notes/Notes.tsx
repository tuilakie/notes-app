"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import { IoClose } from "react-icons/io5";

type Props = {
  noteId: string;
  noteContent: string;
  updatedAt: string;
};

const Notes = (props: Props) => {
  const { noteId, folderId, workspaceId } = useParams();
  const pathname = usePathname();

  return (
    <div
      className={
        "relative px-6 py-4 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
        (noteId === props.noteId
          ? " bg-orange-300 dark:bg-gray-700 text-black"
          : " bg-white dark:bg-gray-800 text-black")
      }
    >
      <Link
        href={`/workspace/${workspaceId}/folder/${folderId}/note/${props.noteId}`}
      >
        <div
          className="truncate"
          dangerouslySetInnerHTML={{
            __html: props.noteContent.substring(0, 30) || "Empty note",
          }}
        ></div>
        <h3 className=" text-sm italic font-light truncate">
          {moment(props.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
        </h3>
      </Link>
      <Link href={`${pathname}?popup=note&action=delete&arg=${props.noteId}`}>
        <IoClose className="text-xl absolute right-1 top-1 hover:text-rose-300" />
      </Link>
    </div>
  );
};

export default Notes;
