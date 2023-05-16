"use client";
import React from "react";
import { FiFolderPlus } from "react-icons/fi";
import Folder from "./Folder";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GET_FOLDER_BY_WORKSPACEID } from "./folder.query";
import toast from "react-hot-toast";

type Props = {
  workspaceId: string;
};

const FolderList = (props: Props) => {
  const { workspaceId } = props;
  const { data, loading, error } = useQuery(GET_FOLDER_BY_WORKSPACEID, {
    variables: { workspaceId: workspaceId },
    onCompleted: (data) => {
      if (data?.workspace?.folders?.length === 0) {
        toast.success("You don't have any folder yet");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const pathname = usePathname();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-between items-center">
        <div>FolderList</div>
        <Link
          href={`${pathname}?popup=folder&action=create`}
          className="relative text-white  focus:ring-1 focus:outline-none focus:ring-blue-300 p-1 rounded-md group"
        >
          <FiFolderPlus className="text-2xl" />
          <div className="absolute z-10 invisible group-hover:visible bg-gray-400 right-full bot-full text-white text-xs rounded-sm shadow-lg p-1">
            Create Folder
          </div>
        </Link>
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
