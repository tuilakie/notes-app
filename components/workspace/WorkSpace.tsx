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
    <div
      className={
        "relative px-6 py-4 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
        (workspaceId === props.workspaceId
          ? " bg-orange-300 dark:bg-gray-700 text-black"
          : " bg-white dark:bg-gray-800 text-black")
      }
    >
      <Link
        className="flex flex-1 text-xl h-full truncate"
        href={`workspace/${props.workspaceId}`}
      >
        {props.workspaceName}
      </Link>
      <Link
        href={`${pathname}?popup=workspace&action=delete&arg=${props.workspaceId}`}
      >
        <IoClose className="text-xl absolute right-1 top-1 hover:text-rose-300" />
      </Link>
    </div>
  );
};

export default Workspace;
