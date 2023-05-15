"use client";
import React from "react";
import { FiFolderPlus } from "react-icons/fi";
import Folder from "./Folder";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";

type Props = {
  workspaceId: string;
};

const query = gql`
  query ($workspaceId: ID!) {
    workspace(id: $workspaceId) {
      name
      folders {
        id
        name
      }
    }
  }
`;

const FolderList = (props: Props) => {
  const { workspaceId } = props;
  const { data, loading, error } = useQuery(query, {
    variables: { workspaceId: workspaceId },
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <div>FolderList</div>
        <button
          type="button"
          className="relative text-white  focus:ring-1 focus:outline-none focus:ring-blue-300 p-1 rounded-md group"
        >
          <FiFolderPlus className="text-2xl" />
          <div className="absolute invisible group-hover:visible bg-gray-400 right-full bot-full text-white text-xs rounded-sm shadow-lg p-1">
            Create Folder
          </div>
        </button>
      </div>
      <ul className="flex flex-col gap-2 max-h-[720px] overflow-y-auto">
        {data?.workspace?.folders?.map((folder: any) => (
          <li key={folder.id}>
            <Folder folderName={folder.name} folderId={folder.id} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FolderList;
