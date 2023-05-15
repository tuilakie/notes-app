"use client";
import NotesList from "@/components/notes/NotesList";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { folderId } = useParams();
  return (
    <>
      <div className="grid grid-cols-9 h-full">
        <NotesList folderId={folderId} />
        <div className="col-span-6 py-2 px-4 bg-gray-100 dark:bg-gray-800 w-full h-full text-black">
          {children}
        </div>
      </div>
    </>
  );
}
