"use client";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

import { useRouter } from "next/navigation";

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
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 overflow-x-auto">
      <ul className="flex flex-row gap-2 ">
        {data?.user?.workspaces?.map((workspace: any) => (
          <li key={workspace.id}>
            <button
              onClick={() => {
                router.push(`/workspace/${workspace.id}`);
              }}
              className="whitespace-nowrap px-6 py-3 font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90 bg-white dark:bg-gray-800 text-black"
            >
              {workspace.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceList;
