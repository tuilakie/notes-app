import { gql } from "@apollo/client";

export const GET_WORKSPACES_BY_USERID = gql`
  query ($userId: ID!) {
    user(id: $userId) {
      workspaces {
        name
        id
      }
    }
  }
`;
