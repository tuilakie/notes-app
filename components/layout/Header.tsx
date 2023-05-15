"use client";
import React from "react";
import UserMenu from "./UserMenu";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="bg-rose-300 text-white dark:bg-slate-400 container mx-auto px-4 py-2 mb-4 rounded-md">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Notes App</div>
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
