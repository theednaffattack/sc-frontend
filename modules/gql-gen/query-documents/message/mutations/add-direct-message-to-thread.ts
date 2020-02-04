import { gql } from "apollo-boost";

export const ADD_DIRECT_MESSAGE_TO_THREAD = gql`
  mutation AddDirectMessageToThread($input: AddDirectMessageToThreadInput!) {
    addDirectMessageToThread(input: $input) {
      success
      threadId
      message {
        id
        message
      }
      sentBy {
        id
        name
      }
      invitees {
        id
        name
      }
    }
  }
`;
