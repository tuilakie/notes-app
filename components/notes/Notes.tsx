"use client";
import React, { use, useEffect } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type Props = {};
const note = {
  id: "1",
  title: "Note 1",
  content: "This is the content of note 1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const Notes = (props: Props) => {
  const [editorState, setEditorState] = React.useState(() => {
    return EditorState.createEmpty();
  });

  const [rawHTML, setRawHTML] = React.useState("");

  const handleOnchangeEditor = (editorState: EditorState) => {
    setEditorState(editorState);
    setRawHTML(draftToHtml(convertToRaw(editorState?.getCurrentContent())));
  };

  useEffect(() => {
    const blocksFromHtml = convertFromHTML(rawHTML);
    const state = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [rawHTML]);

  useEffect(() => {
    setRawHTML(note.content);
  }, []);

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

export default Notes;
