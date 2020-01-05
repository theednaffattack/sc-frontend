import { gql } from "apollo-boost";

export const ADD_MESSAGE_TO_CHANNEL = gql`
  mutation AddMessageToChannel($data: AddMessageToChannelInput!) {
    addMessageToChannel(data: $data) {
      success
    }
  }
`;
