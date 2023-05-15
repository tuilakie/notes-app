import WorkspaceList from "@/components/workspace/WorkspaceList";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <WorkspaceList userId="1" />
        <div className="grid grid-cols-12 h-full min-h-[600px] text-white font-semibold shadow-lg text-xl">
          {children}
        </div>
      </div>
    </>
  );
}
