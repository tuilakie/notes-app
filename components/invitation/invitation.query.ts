import { gql } from "@apollo/client";

export const RECIVED_INVITATIONS = gql`
  query Query {
    recivedInvitations {
      email
      id
      workspace {
        name
        id
        owner {
          name
        }
      }
    }
  }
`;

export const SENT_INVITATIONS = gql`
  query Query {
    sentInvitations {
      email
      id
      name
      workspace {
        id
        name
        owner {
          name
        }
      }
    }
  }
`;
