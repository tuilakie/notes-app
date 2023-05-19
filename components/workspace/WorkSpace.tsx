"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

type Props = {
  workspaceId: string;
  workspaceName: string;
  owner: string;
  totalMembers: number;
};

const Workspace = (props: Props) => {
  const { workspaceId } = useParams();
  const pathname = usePathname();

  return (
    <div
      className={
        "relative px-6 py-4 w-full font-normal max-h-[15vh] text-lg text-left rounded-lg shadow-lg hover:bg-orange-300"
      }
    >
      <Link
        className="flex flex-col flex-1 font-semibold text-2xl h-full"
        href={`workspace/${props.workspaceId}`}
      >
        {props.workspaceName}
        <span className="text-lg font-normal italic">
          {"author: " + props.owner}
        </span>
        <span className="text-lg font-normal italic">
          {"member: " + props.totalMembers}
        </span>
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
