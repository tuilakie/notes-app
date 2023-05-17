import gql from "graphql-tag";

export const CREATE_NOTE = gql`
  mutation Mutation($content: String!, $folderId: ID!) {
    createNote(content: $content, folderId: $folderId) {
      content
      id
      updatedAt
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($updateNoteId: ID!, $content: String) {
    updateNote(id: $updateNoteId, content: $content) {
      content
      updatedAt
    }
  }
`;
