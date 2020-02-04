import { gql } from "apollo-boost";

export const NEW_DIRECT_MESSAGE_SUB = gql`
  subscription NewDirectMessageSub {
    newDirectMessageSub {
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
    }
  }
`;
