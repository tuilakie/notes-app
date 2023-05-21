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
import { gql, useMutation, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import { useParams } from "next/navigation";
import { GET_NOTE_BY_ID } from "./notes.query";
import debounce from "lodash.debounce";
import { UPDATE_NOTE } from "./notes.mutation";
import toast from "react-hot-toast";
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

  const { data, loading, error } = useQuery(GET_NOTE_BY_ID, {
    variables: { noteId },
  });
  const [updateNote] = useMutation(UPDATE_NOTE);

  useEffect(() => {
    if (data) {
      const blocksFromHTML = convertFromHTML(data?.note.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.note.id]);

  const debounceMemorized = React.useMemo(() => {
    return debounce((data, editorState) => {
      if (
        !data ||
        data.note.content ===
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
      )
        return;
      updateNote({
        variables: {
          updateNoteId: data.note.id,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        },
        onCompleted: (data) => {
          toast.success("Note updated");
        },
        onError: (error) => {
          toast.error(error.message);
        },
        refetchQueries: [
          { query: GET_NOTE_BY_ID, variables: { noteId: data.note.id } },
        ],
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    debounceMemorized(data, editorState);
    // return () => {
    //   debounceMemorized.cancel();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState.getCurrentContent(), noteId]);

  const handleOnchangeEditor = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="max-h-[732px] overflow-y-auto"
          editorClassName="bg-white min-h-[654px] p-4"
          onEditorStateChange={handleOnchangeEditor}
        />
      </div>
    </>
  );
};

export default NoteText;
