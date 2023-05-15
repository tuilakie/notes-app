"use client";
import React, { use, useEffect } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import { useParams } from "next/navigation";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

type Props = {};

const NoteText = (props: Props) => {
  const [editorState, setEditorState] = React.useState(() => {
    return EditorState.createEmpty();
  });

  const { noteId } = useParams();

  const getNotes = gql`
    query Note($noteId: ID!) {
      note(id: $noteId) {
        content
        id
        title
      }
    }
  `;

  const { data, loading, error } = useQuery(getNotes, {
    variables: { noteId },
  });

  useEffect(() => {
    if (data) {
      const blocksFromHTML = convertFromHTML(data.note.content);
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(content));
    }
  }, [data]);

  const handleOnchangeEditor = (editorState: EditorState) => {
    setEditorState(editorState);
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleOnchangeEditor}
        placeholder="Write something..."
      />
    </>
  );
};

export default NoteText;
