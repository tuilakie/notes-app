import { gql } from "@apollo/client";

export const CREATE_WORKSPACE = gql`
  mutation Mutation($name: String!, $ownerId: ID!) {
    createWorkspace(name: $name, ownerId: $ownerId) {
      ownerId
      name
    }
  }
`;

export const DELETE_WORKSPACE = gql`
  mutation Mutation($deleteWorkspaceId: ID!) {
    deleteWorkspace(id: $deleteWorkspaceId) {
      id
      name
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation Mutation($name: String!, $workspaceId: ID!) {
    createFolder(name: $name, workspaceId: $workspaceId) {
      id
      name
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation Mutation($deleteFolderId: ID!) {
    deleteFolder(id: $deleteFolderId) {
      id
      name
    }
  }
`;
