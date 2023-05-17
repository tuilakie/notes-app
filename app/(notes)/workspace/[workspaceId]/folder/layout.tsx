"use client";
import FolderList from "@/components/folders/FolderList";
import WorkspaceList from "@/components/workspace/WorkspaceList";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { workspaceId } = useParams();
  return (
    <>
      <div className="col-span-3 py-2 px-4 bg-teal-600  dark:bg-gray-900 w-full h-full">
        <FolderList workspaceId={workspaceId} />
      </div>
      <div className="col-span-9 bg-gray-100 dark:bg-gray-800 w-full h-full">
        {children}
      </div>
    </>
  );
}
