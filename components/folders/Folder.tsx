"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

type Props = {
  folderName: string;
  folderId: string;
};

const Folder = (props: Props) => {
  const { folderId, workspaceId } = useParams();
  const pathname = usePathname();

  return (
    // <button
    //   className={
    //     "px-6 py-4 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
    //     (folderId === props.folderId
    //       ? " bg-orange-300 dark:bg-gray-700 text-black"
    //       : " bg-white dark:bg-gray-800 text-black")
    //   }
    //   onClick={() => {
    //     router.push(`workspace/${workspaceId}/folder/${props.folderId}`);
    //   }}
    // >
    //   {props.folderName}
    // </button>
    <div
      className={
        "relative px-6 py-4 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
        (folderId === props.folderId
          ? " bg-orange-300 dark:bg-gray-700 text-black"
          : " bg-white dark:bg-gray-800 text-black")
      }
    >
      <Link
        className="flex flex-1 text-xl truncate"
        href={`/workspace/${workspaceId}/folder/${props.folderId}`}
      >
        {props.folderName}
      </Link>
      <Link
        href={`${pathname}?popup=folder&action=delete&arg=${props.folderId}`}
      >
        <IoClose className="text-xl absolute right-1 top-1 hover:text-rose-300" />
      </Link>
    </div>
  );
};

export default Folder;
