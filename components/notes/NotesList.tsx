"use client";
import React from "react";
import { FiFilePlus } from "react-icons/fi";
import Notes from "./Notes";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import NoteText from "./NoteText";
import { toast } from "react-hot-toast";

type Props = {
  folderId: string;
};

const query = gql`
  query ($folderId: ID!) {
    folder(id: $folderId) {
      notes {
        id
        content
        title
      }
      name
    }
  }
`;

const NotesList = (props: Props) => {
  const { data, loading, error } = useQuery(query, {
    variables: { folderId: props.folderId },
  });

  return (
    <>
      <div className="col-span-3 py-2 px-4 bg-stone-200 text-white font-medium dark:bg-gray-900 w-full h-full">
        <div className="flex justify-between items-center">
          <div>NotesList</div>
          <button
            type="button"
            className="relative text-white  focus:ring-1 focus:outline-none focus:ring-blue-300 p-1 rounded-md group"
          >
            <FiFilePlus className="text-2xl" />
            <div className="absolute invisible group-hover:visible bg-gray-400 right-full bot-full text-white text-xs rounded-sm shadow-lg p-1">
              Create Notes
            </div>
          </button>
        </div>
        <ul className="flex flex-col gap-2 max-h-[720px] overflow-y-auto">
          {data?.folder?.notes?.map((note: any) => (
            <li key={note.id}>
              <Notes noteTitle={note.title} noteId={note.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NotesList;
