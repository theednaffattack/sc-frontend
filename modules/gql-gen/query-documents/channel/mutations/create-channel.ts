import { gql } from "apollo-boost";

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($input: AddChannelInput!) {
    createChannel(input: $input) {
      id
      name
      invitees {
        id
        name
      }
      last_message
    }
  }
`;
