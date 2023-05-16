"use client";
import { useQuery } from "@apollo/client";
import React from "react";
import { usePathname } from "next/navigation";
import { FiFolderPlus } from "react-icons/fi";
import Workspace from "./WorkSpace";
import Link from "next/link";
import { GET_WORKSPACES_BY_USERID } from "./workspace.query";

type Props = {
  userId: string;
};

const WorkspaceList = (props: Props) => {
  const { userId } = props;
  const { data, loading, error } = useQuery(GET_WORKSPACES_BY_USERID, {
    variables: { userId: userId },
  });
  const pathname = usePathname();

  return (
    <div className="bg-white dark:bg-gray-800 gap-2 flex flex-row justify-between rounded-md shadow-lg p-4 min-h-[110px] overflow-x-auto">
      <ul className="flex flex-row gap-2 mr-8">
        {data?.user?.workspaces?.map((workspace: any) => (
          <li key={workspace.id}>
            <Workspace
              workspaceName={workspace.name}
              workspaceId={workspace.id}
            />
          </li>
        ))}
      </ul>
      <Link
        href={`${pathname}?popup=workspace&action=create`}
        className="relative max-h-1 text-black p-1 rounded-md group"
      >
        <FiFolderPlus className="text-2xl" />
        <div className="absolute z-10 invisible group-hover:visible bg-gray-400 right-full bot-full text-black text-xs rounded-sm shadow-lg p-1">
          Create workspace
        </div>
      </Link>
    </div>
  );
};

export default WorkspaceList;
