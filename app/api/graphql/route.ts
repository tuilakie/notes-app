import { schema } from "@/graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export const bodyParser = true;
// // export const cors = true;

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }

  return handler(request);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }
  return handler(request);
}
