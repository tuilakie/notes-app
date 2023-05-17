import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   // console.log("signIn", { user, account, profile, email, credentials });
    //   const isExist = await prisma.user.upsert({
    //     where: { email: user.email || undefined },
    //     create: {
    //       email: user.email || "Anonymous",
    //       name: user.name,
    //       avatar: user.image,
    //     },
    //     update: {},
    //   });
    //   // add user id to session
    //   user.id = isExist.id;
    //   return true;
    // },
    session: async ({ session, user, token }) => {
      // console.log("session", { session, user, token });
      const userId = await prisma.user.upsert({
        where: { email: session.user?.email || undefined },
        create: {
          email: session.user?.email || "Anonymous",
          name: session.user?.name,
          avatar: session.user?.image,
        },
        update: {},
        select: { id: true },
      });
      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: userId.id,
        },
      };
      return newSession;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const envAuth = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
};
