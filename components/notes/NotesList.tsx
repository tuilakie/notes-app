"use client";
import React from "react";
import { FiFilePlus } from "react-icons/fi";
import Notes from "./Notes";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_NOTES_BY_FOLDERID } from "./notes.query";
import { CREATE_NOTE } from "./notes.mutation";

type Props = {
  folderId: string;
};

const NotesList = (props: Props) => {
  const { data, loading, error } = useQuery(GET_NOTES_BY_FOLDERID, {
    variables: { folderId: props.folderId },
    onCompleted: (data) => {
      if (data?.folder?.notes?.length === 0) {
        toast.success("You don't have any notes yet");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [createNotes] = useMutation(CREATE_NOTE);

  const handleCreateNotes = () => {
    toast.promise(
      createNotes({
        variables: {
          folderId: props.folderId,
          content: "",
        },
        refetchQueries: [
          {
            query: GET_NOTES_BY_FOLDERID,
            variables: { folderId: props.folderId },
          },
        ],
      }),
      {
        loading: "Creating notes...",
        success: (data) => {
          return "Notes created";
        },
        error: (error) => {
          return error.message;
        },
      }
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="col-span-3 py-2 px-4 bg-stone-200 text-white font-medium dark:bg-gray-900 w-full h-full">
        <div className="flex justify-between items-center">
          <div>NotesList</div>
          <button
            onClick={handleCreateNotes}
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
              <Notes
                noteId={note.id}
                noteContent={note.content}
                updatedAt={note.updatedAt}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NotesList;
