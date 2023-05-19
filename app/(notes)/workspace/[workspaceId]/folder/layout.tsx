"use client";
import FolderList from "@/components/folders/FolderList";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

const query = gql`
  query ($workspaceId: ID!) {
    workspace(id: $workspaceId) {
      ownerId
      memberships {
        userId
      }
    }
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { workspaceId } = useParams();
  const { data, loading } = useQuery(query, {
    variables: { workspaceId },
  });
  const { data: session } = useSession() as any;
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-row w-full justify-end mb-2">
        {loading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        ) : session?.user.id === data?.workspace?.ownerId ? (
          <Link
            className="bg-teal-600 dark:bg-gray-900 text-white rounded-md shadow-md p-2"
            href={`${pathname}?popup=workspace&action=invite`}
          >
            Invite
          </Link>
        ) : (
          data?.workspace?.memberships?.some(
            (membership: any) => membership.userId === session?.user?.id
          ) && (
            <Link
              className="bg-teal-600 dark:bg-gray-900 text-white rounded-md shadow-md p-2"
              href={`${pathname}?popup=workspace&action=leave`}
            >
              Leave
            </Link>
          )
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 h-full min-h-[600px] text-white font-semibold shadow-lg text-xl">
        <div className="col-span-full md:col-span-3 py-2 px-4 bg-teal-600  dark:bg-gray-900 w-full h-full">
          <FolderList workspaceId={workspaceId} />
        </div>
        <div className="col-span-full md:col-span-9 bg-gray-100 dark:bg-gray-800 w-full h-full">
          {children}
        </div>
      </div>
    </>
  );
}
