import { useMutation } from "@apollo/client";
import React from "react";
import { REMOVE_INVITATION } from "./invitation.mutation";
import { toast } from "react-hot-toast";
import { SENT_INVITATIONS } from "./invitation.query";

type Props = {
  invitationId: string;
  workspaceName: string;
  email: string;
  username: string;
};

export const SentCard = (props: Props) => {
  const [removeInvitation, { loading, error, data }] =
    useMutation(REMOVE_INVITATION);

  return (
    <div className="flex flex-col items-center max-h-[164px] px-4 gap-2 py-2 justify-center bg-slate-100 shadow-md rounded-lg">
      <div className="text-xl text-left w-full">{props.workspaceName}</div>
      <div className="text-lg text-left w-full"> {props.email}</div>
      <div className="text-sm italic text-left w-full">{props.username}</div>
      <div className="flex flex-row w-full justify-end gap-8">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
          onClick={() => {
            toast.promise(
              removeInvitation({
                variables: {
                  deleteInvitationId: props.invitationId,
                },
                refetchQueries: [SENT_INVITATIONS],
                onCompleted: () => {
                  toast.success("Invitation removed");
                },
                onError: (error) => {
                  toast.error(error.message);
                },
              }),
              {
                loading: "Removing invitation",
                success: null,
                error: null,
              }
            );
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
