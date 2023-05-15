import React from "react";
import { FiFilePlus } from "react-icons/fi";
import Notes from "./Notes";

type Props = {};

const NotesList = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-9 h-full">
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
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <button className="px-6 py-3 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90 bg-white dark:bg-gray-800 text-black">
                  New Notes
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 py-2 px-4 bg-gray-100 dark:bg-gray-800 w-full h-full text-black">
          <Notes />
        </div>
      </div>
    </>
  );
};

export default NotesList;
