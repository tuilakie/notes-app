import { gql } from "@apollo/client";

export const GET_WORKSPACES = gql`
  query ($userId: ID!) {
    user(id: $userId) {
      ownedWorkspaces {
        name
        id
        owner {
          name
        }
        memberships {
          id
        }
      }
      workspaceMemberships {
        workspace {
          name
          id
          owner {
            name
          }
          memberships {
            userId
          }
        }
      }
    }
  }
`;
