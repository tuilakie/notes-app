"use client";
import NotesList from "@/components/notes/NotesList";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { folderId } = useParams();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-9 h-full">
        <NotesList folderId={folderId} />
        <div className="col-span-full md:col-span-6 p-2 bg-gray-100 dark:bg-gray-800 w-full h-full overflow-auto text-black">
          {children}
        </div>
      </div>
    </>
  );
}
