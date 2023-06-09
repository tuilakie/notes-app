"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const UserMenu = (props: Props) => {
  const [theme, setTheme] = React.useState("light"); // 'light' | 'dark'
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };
  const [isOpened, setIsOpened] = React.useState(false);

  const handleOutsideClick = (e: any) => {
    if (e.target.closest(".relative")) return;
    setIsOpened(false);
  };
  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOnClickLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const router = useRouter();

  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className="relative inline-flex cursor-pointer">
      <div className="flex items-center" onClick={() => setIsOpened(!isOpened)}>
        <div className="text-xl font-semibold mr-2">{session?.user?.name}</div>
        {/* <Image className="w-12 h-12 rounded-full bg-gray-400"></Image> */}
        <Image
          loader={() => session?.user?.image || ""}
          src={session?.user?.image || ""}
          alt="Picture of the author"
          className="w-12 h-12 rounded-full bg-gray-400"
          width={50}
          height={50}
        />
      </div>
      <div
        className="absolute z-50 top-full text-center right-0 mt-1 rounded-lg shadow-lg bg-gray-400 text-white font-semibold opacity-70"
        style={{ width: "200px", display: isOpened ? "block" : "none" }}
      >
        {/* <div className="py-2 px-4 w-full border-b-2">
          <div className="flex justify-around items-center duration-200 rounded-lg border-2">
            <button
              className="flex-1 border-r-2 dark:bg-rose-300"
              disabled={theme === "dark"}
              onClick={toggleTheme}
            >
              Dark
            </button>
            <button
              disabled={theme === "light"}
              onClick={toggleTheme}
              className="flex-1 border-l-2 bg-rose-300 dark:bg-gray-400"
            >
              Light
            </button>
          </div>
        </div> */}
        <button
          className="py-2 px-4 w-full border-b-2"
          onClick={() => {
            router.push("/");
            setIsOpened(false);
          }}
        >
          Workspace
        </button>
        <button
          className="py-2 px-4 w-full border-b-2"
          onClick={() => {
            router.push("/invitation");
            setIsOpened(false);
          }}
        >
          Invitation
        </button>
        <button
          className="py-2 px-4 w-full border-b-2"
          onClick={handleOnClickLogout}
        >
          Log out
        </button>
        {/* <button
          className="py-2 px-4 w-full border-b-2"
          onClick={handleOnClickAboutMe}
        >
          About me
        </button> */}
      </div>
    </div>
  );
};

export default UserMenu;
