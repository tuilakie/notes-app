import { gql } from "@apollo/client";

export const REMOVE_INVITATION = gql`
  mutation Mutation($deleteInvitationId: ID!) {
    deleteInvitation(id: $deleteInvitationId) {
      id
      name
    }
  }
`;

export const ACCEPT_INVITATION = gql`
  mutation Mutation($email: String!, $workspaceId: ID!) {
    acceptInvitation(email: $email, workspaceId: $workspaceId) {
      id
      user {
        name
        email
      }
      workspace {
        name
        memberships {
          user {
            name
          }
        }
      }
    }
  }
`;
