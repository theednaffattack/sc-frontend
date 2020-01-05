import { gql } from "apollo-boost";

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($name: String!) {
    createChannel(name: $name) {
      id
      name
    }
  }
`;
