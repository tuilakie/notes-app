import React from "react";

type Props = {
  workspaceId: string;
  workspaceName: string;
  email: string;
  username: string;
};

// cards for an invitations sent and received by the user
export const SentCard = (props: Props) => {
  return (
    <div className="flex flex-col items-center px-4 gap-2 py-2 justify-center bg-slate-100 shadow-md rounded-lg">
      <div className="text-xl text-left w-full">{props.workspaceName}</div>
      <div className="text-lg text-left w-full"> {props.email}</div>
      <div className="text-sm italic text-left w-full">{props.username}</div>
      <div className=" text-left w-full text-sm italic">Status</div>
      <div className="flex flex-row w-full justify-end gap-8">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md">
          Remove
        </button>
      </div>
    </div>
  );
};
