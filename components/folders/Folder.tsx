"use client";
import React from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

type Props = {
  folderName: string;
  folderId: string;
};

const Folder = (props: Props) => {
  const { folderId, workspaceId } = useParams();
  const router = useRouter();

  return (
    <button
      className={
        "px-6 py-4 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
        (folderId === props.folderId
          ? " bg-orange-300 dark:bg-gray-700 text-black"
          : " bg-white dark:bg-gray-800 text-black")
      }
      onClick={() => {
        router.push(`workspace/${workspaceId}/folder/${props.folderId}`);
      }}
    >
      {props.folderName}
    </button>
  );
};

export default Folder;
