"use client";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

import { useRouter } from "next/navigation";
import { FiFolderPlus } from "react-icons/fi";
import Workspace from "./WorkSpace";

type Props = {
  userId: string;
};

const query = gql`
  query ($userId: ID!) {
    user(id: $userId) {
      workspaces {
        name
        id
      }
    }
  }
`;

const WorkspaceList = (props: Props) => {
  const { userId } = props;
  const { data, loading, error } = useQuery(query, {
    variables: { userId: userId },
  });
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 flex flex-row justify-between rounded-md shadow-lg p-4 overflow-x-auto">
      <ul className="flex flex-row gap-2 ">
        {data?.user?.workspaces?.map((workspace: any) => (
          <li key={workspace.id}>
            <Workspace
              workspaceName={workspace.name}
              workspaceId={workspace.id}
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          // router.push(`/workspace/create`);
          console.log("create workspace");
        }}
        className="relative max-h-1 text-black p-1 rounded-md group"
      >
        <FiFolderPlus className="text-2xl" />
        <div className="absolute z-1 invisible group-hover:visible bg-gray-400 right-full bot-full text-black text-xs rounded-sm shadow-lg p-1">
          Create workspace
        </div>
      </button>
    </div>
  );
};

export default WorkspaceList;
