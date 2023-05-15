import FolderList from "@/components/folders/FolderList";
import NotesList from "@/components/notes/NotesList";
import WorkspaceList from "@/components/workspace/WorkspaceList";

export default function App() {
  const userId = "1";

  return (
    <div className="flex flex-col gap-2">
      <WorkspaceList userId={userId} />
      {/* <div className="grid grid-cols-12 h-full min-h-[600px] text-white font-semibold shadow-lg text-xl">
        <div className="col-span-3 py-2 px-4 bg-teal-600  dark:bg-gray-900 w-full h-full">
          <FolderList />
        </div>
        <div className="col-span-9 bg-gray-100 dark:bg-gray-800 w-full h-full">
          <NotesList />
        </div>
      </div> */}
    </div>
  );
}
