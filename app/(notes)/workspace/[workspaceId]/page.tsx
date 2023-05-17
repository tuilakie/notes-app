"use client";
import FolderList from "@/components/folders/FolderList";
import React from "react";
import { useParams, useRouter } from "next/navigation";

type Props = {};

const WorkspaceSegment = (props: Props) => {
  const { workspaceId } = useParams();
  const router = useRouter();
  if (!workspaceId) {
    router.push("/");
  }

  return (
    <>
      <div className="col-span-3 py-2 px-4 bg-teal-600  dark:bg-gray-900 w-full h-full">
        <FolderList workspaceId={workspaceId} />
      </div>
    </>
  );
};

export default WorkspaceSegment;
