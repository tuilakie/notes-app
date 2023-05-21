import { gql } from "@apollo/client";

export const REMOVE_INVITATION = gql`
  mutation Mutation($deleteInvitationId: ID!) {
    deleteInvitation(id: $deleteInvitationId) {
      id
      name
    }
  }
`;
