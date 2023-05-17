"use client";
import Image from "next/image";
import logo from "@/app/note_logo1.ico";
import { signIn, signOut } from "next-auth/react";
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full flex flex-col justify-between h-[50vh] relative max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <Image
          src={logo}
          alt="logo"
          width={144}
          height={144}
          className=" block mx-auto my-8 animate-bounce"
        />
        <div>
          <button
            className="block w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
          >
            Sign in with Google
          </button>
          <button
            className="block w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
            onClick={() => {
              signIn("github", { callbackUrl: "/" });
            }}
          >
            Sign in with GitHub
          </button>
          {/* <button
            className="block w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
            onClick={() => {
              // signIn("github", { callbackUrl: "/" });
              signOut();
            }}
          >
            Sign out
          </button> */}
        </div>
      </div>
    </div>
  );
}
