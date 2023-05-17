import { authOptions, envAuth } from "@/lib/nextauth";
import NextAuth from "next-auth";

// console.log("env auth", envAuth);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
