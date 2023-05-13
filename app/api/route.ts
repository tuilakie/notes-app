import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = {
    message:
      "welcome to the api route!, please use the /api/graphql route to access the graphql api",
  };

  return NextResponse.json({ data });
}
