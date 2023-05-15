import React from "react";

type Props = {};

const WorkspaceList = (props: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 overflow-x-auto">
      <ul className="flex flex-row gap-2 ">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}>
            <button className="whitespace-nowrap px-6 py-3 font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90 bg-white dark:bg-gray-800 text-black">
              New workspace
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceList;
