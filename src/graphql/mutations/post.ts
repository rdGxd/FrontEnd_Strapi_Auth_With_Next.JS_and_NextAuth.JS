import { gql } from "graphql-request";
import { GQL_FRAGMENT_POST } from "../fragments/post";

export const GQL_MUTATION_UPDATE_POST = gql`
  ${GQL_FRAGMENT_POST}

  mutation UPDATE_POST($id: ID!, $title: String, $content: String) {
    updatePost(id: $id, data: { title: $title, content: $content }) {
      data {
        id
        attributes {
          ...post
        }
      }
    }
}
`;

export const GQL_MUTATION_CREATE_POST = gql`
  ${GQL_FRAGMENT_POST}

  mutation CREATE_POST(
    $title: String!
    $content: String!
    $publishedAt: DateTime
  ) {
    createPost(
      data: {
        title: $title
        content: $content
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          ...post
        }
      }
    }
}
`;

export const GQL_MUTATION_DELETE_POST = gql`
  ${GQL_FRAGMENT_POST}

mutation DELETE_POST($id: ID!) {
  deletePost(id: $id) {
    data {
      id
      attributes {
        ...post
      }
    }
  }
}
`;
