import { gql } from "@apollo/client";

export const GET_FOLDER_BY_WORKSPACEID = gql`
  query ($workspaceId: ID!) {
    workspace(id: $workspaceId) {
      name
      folders {
        id
        name
      }
    }
  }
`;
