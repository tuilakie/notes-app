import { gql } from "@apollo/client";

export const GET_NOTES_BY_FOLDERID = gql`
  query ($folderId: ID!) {
    folder(id: $folderId) {
      notes {
        id
        content
        updatedAt
      }
      name
    }
  }
`;

export const GET_NOTE_BY_ID = gql`
  query Query($noteId: ID!) {
    note(id: $noteId) {
      content
    }
  }
`;
