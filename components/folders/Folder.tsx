"use client";
import React from "react";

type Props = {};

const Folder = (props: Props) => {
  const [active, setActive] = React.useState(false);
  return (
    <button
      className={
        "px-6 py-3 w-full font-normal text-lg text-left rounded-lg shadow-lg hover:opacity-90" +
        (active
          ? " bg-orange-300 dark:bg-gray-700 text-black"
          : " bg-white dark:bg-gray-800 text-black")
      }
      onClick={() => setActive(!active)}
    >
      New Folders
    </button>
  );
};

export default Folder;
