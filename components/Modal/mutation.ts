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

export const CREATE_NOTE = gql`
  mutation Mutation($content: String!, $folderId: ID!) {
    createNote(content: $content, folderId: $folderId) {
      content
      id
      updatedAt
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation Mutation($deleteNoteId: ID!) {
    deleteNote(id: $deleteNoteId) {
      id
      content
    }
  }
`;

export const CREATE_INVITATION = gql`
  mutation Mutation($email: String!, $workspaceId: ID!) {
    createInvitation(email: $email, workspaceId: $workspaceId) {
      id
      email
    }
  }
`;

export const LEAVE_WORKSPACE = gql`
  mutation Mutation($userId: ID!, $workspaceId: ID!) {
    leaveMembership(userId: $userId, workspaceId: $workspaceId) {
      id
    }
  }
`;
