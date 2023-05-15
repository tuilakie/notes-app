"use client";
import gql from "graphql-tag";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const getOwnerWorkspaces = gql`
  query GetOwnerWorkspaces {
    getOwnerWorkspaces {
      id
      name
      ownerId
    }
  }
`;
export function middleware(request: NextRequest) {}
