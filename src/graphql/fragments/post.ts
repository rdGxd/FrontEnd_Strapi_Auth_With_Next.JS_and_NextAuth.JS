import { gql } from "graphql-request";

export const GQL_FRAGMENT_POST = gql`
  fragment post on Post {
    title
    content
    user {
      data {
        id
        attributes {
          username
          email
        }
      }
    }
    createdAt
  }
`;
