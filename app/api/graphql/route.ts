import { schema } from "@/graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextauth";

const server = new ApolloServer({ schema, cache: "bounded" });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => {
    return (await getServerSession(authOptions)) || {};
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
