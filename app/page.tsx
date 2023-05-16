import WorkspaceList from "@/components/workspace/WorkspaceList";

export default function App() {
  const userId = "1";

  return (
    <div className="flex flex-col gap-2">
      <WorkspaceList userId={userId} />
    </div>
  );
}
