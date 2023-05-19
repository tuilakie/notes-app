import WorkspaceList from "@/components/workspace/WorkspaceList";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
