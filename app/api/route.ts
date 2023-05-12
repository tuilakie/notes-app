import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = {
    message: "Hello world",
  };

  return NextResponse.json({ data });
}
