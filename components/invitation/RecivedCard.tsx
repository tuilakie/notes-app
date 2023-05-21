import { useMutation } from "@apollo/client";
import { type } from "os";
import React from "react";
import { REMOVE_INVITATION } from "./invitation.mutation";
import toast from "react-hot-toast";
import { RECIVED_INVITATIONS } from "./invitation.query";

type Props = {
  invitationId: string;
  workspaceName: string;
  email: string;
  username: string;
};

export const RecivedCard = (props: Props) => {
  const [removeInvitation, { loading, error, data }] =
    useMutation(REMOVE_INVITATION);

  return (
    <div className="flex flex-col max-h-[162px] items-center px-4 gap-2 py-2 justify-center bg-slate-100 shadow-md rounded-lg">
      <div className="text-xl text-left w-full">{props.workspaceName}</div>
      <div className="text-lg text-left w-full"> {props.email}</div>
      <div className="text-sm italic text-left w-full">{props.username}</div>
      <div className="flex flex-row gap-8">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md">
          Accept
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
          onClick={() => {
            toast.promise(
              removeInvitation({
                variables: {
                  deleteInvitationId: props.invitationId,
                },
                refetchQueries: [RECIVED_INVITATIONS],
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
          Decline
        </button>
      </div>
    </div>
  );
};
