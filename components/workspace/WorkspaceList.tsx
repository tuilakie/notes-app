"use client";
import { useQuery } from "@apollo/client";
import React from "react";
import { usePathname } from "next/navigation";
import { FiFolderPlus } from "react-icons/fi";
import Workspace from "./WorkSpace";
import Link from "next/link";
import { GET_WORKSPACES } from "./workspace.query";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

type Props = {};

const WorkspaceList = (props: Props) => {
  const { data: session } = useSession() as any;
  const { data, loading, error } = useQuery(GET_WORKSPACES, {
    // @ts-ignore
    variables: { userId: session?.user?.id || "1" },
    onCompleted: (data) => {
      if (data?.user?.workspaces?.length === 0) {
        toast.success("You don't have any workspace yet");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const pathname = usePathname();

  return (
    <div className="bg-white dark:bg-gray-800 gap-2 flex flex-col rounded-md shadow-lg p-4 min-h-[80vh]">
      <div className="w-full flex justify-end">
        <Link
          href={`${pathname}?popup=workspace&action=create`}
          className="relative text-black p-1 rounded-md group"
        >
          <FiFolderPlus className="text-2xl" />
          <div className="absolute z-10 invisible group-hover:visible bg-gray-400 right-full bot-full text-black text-xs rounded-sm shadow-lg p-1">
            Create workspace
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-4 h-[80vh] relative p-6 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold text-center">
            Your workspaces
          </h1>
          <div className="grid grid-cols-1 h-full gap-8 p-4 bg-slate-50 overflow-auto pb-4">
            {data?.user?.ownedWorkspaces?.map((ownedWorkspaces: any) => (
              <Workspace
                key={ownedWorkspaces.id}
                workspaceName={ownedWorkspaces.name}
                owner={ownedWorkspaces.owner.name}
                totalMembers={ownedWorkspaces.memberships.length + 1}
                workspaceId={ownedWorkspaces.id}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 h-[80vh] relative p-6 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold text-center">
            Membership workspaces
          </h1>
          <div className="grid grid-cols-1 h-full gap-2 overflow-auto pb-4">
            {data?.user?.workspaceMemberships?.map((e: any) => (
              <Workspace
                key={e.workspace.id}
                workspaceName={e.workspace.name}
                owner={e.workspace.owner.name}
                totalMembers={e.workspace.memberships.length}
                workspaceId={e.workspace.id}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <h1 className="text-2xl font-semibold">Your workspaces</h1>
      <ul className="flex flex-row gap-2 mr-8">
        {data?.user?.ownedWorkspaces?.map((ownedWorkspaces: any) => (
          <li key={ownedWorkspaces.id}>
            <Workspace
              workspaceName={ownedWorkspaces.name}
              workspaceId={ownedWorkspaces.id}
            />
          </li>
        ))}
      </ul>
      <h1 className="text-2xl font-semibold">Membership workspaces</h1>
      <ul className="flex flex-row gap-2 mr-8">
        {data?.user?.ownedWorkspaces?.map((ownedWorkspaces: any) => (
          <li key={ownedWorkspaces.id}>
            <Workspace
              workspaceName={ownedWorkspaces.name}
              workspaceId={ownedWorkspaces.id}
            />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default WorkspaceList;
