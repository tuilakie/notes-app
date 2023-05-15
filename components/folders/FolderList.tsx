import React from "react";
import { FiFolderPlus } from "react-icons/fi";
import Folder from "./Folder";

type Props = {};

const FolderList = (props: Props) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>FolderList</div>
        <button
          type="button"
          className="relative text-white  focus:ring-1 focus:outline-none focus:ring-blue-300 p-1 rounded-md group"
        >
          <FiFolderPlus className="text-2xl" />
          <div className="absolute invisible group-hover:visible bg-gray-400 right-full bot-full text-white text-xs rounded-sm shadow-lg p-1">
            Create Folder
          </div>
        </button>
      </div>
      <ul className="flex flex-col gap-2 max-h-[720px] overflow-y-auto">
        {Array.from({ length: 20 }).map((_, i) => (
          <li key={i}>
            <Folder />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FolderList;
