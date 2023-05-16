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
