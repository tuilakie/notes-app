"use client";
import NotesList from "@/components/notes/NotesList";
import React from "react";
import { useParams } from "next/navigation";

type Props = {};

const FolderSegment = (props: Props) => {
  const { workspaceId, folderId } = useParams();
  return (
    <>
      <NotesList folderId={folderId} />
    </>
  );
};

export default FolderSegment;
