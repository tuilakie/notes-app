"use client";
import React from "react";
import { RecivedCard } from "./RecivedCard";
import { SentCard } from "./SentCard";
import { useMutation, useQuery } from "@apollo/client";
import { RECIVED_INVITATIONS, SENT_INVITATIONS } from "./invitation.query";
import { useSession } from "next-auth/react";

export type Props = {};

const Invitation = (props: Props) => {
  const { data: session } = useSession();

  const { data: recived } = useQuery(RECIVED_INVITATIONS);

  const { data: sent } = useQuery(SENT_INVITATIONS);

  console.log(sent);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
      <div className="w-full flex flex-col justify-between gap-4 h-[80vh] relative p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-center">
          Your sent invitation
        </h1>
        <div className="grid grid-cols-2 h-full gap-2 overflow-auto pb-4">
          {sent?.sentInvitations?.map((e: any) => (
            <SentCard
              key={e.id}
              invitationId={e.id}
              workspaceName={e.workspace.name}
              email={e.email}
              username={e.name}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col justify-between gap-4 h-[80vh] relative p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-center">
          Your recived invitation
        </h1>
        <div className="grid grid-cols-2 h-full gap-2 overflow-auto pb-4">
          {recived?.recivedInvitations.map((e: any) => (
            <RecivedCard
              key={e.id}
              invitationId={e.id}
              workspaceId={e.workspace.id}
              workspaceName={e.workspace.name}
              email={e.email}
              username={e.workspace.owner.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invitation;
