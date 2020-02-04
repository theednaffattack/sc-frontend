import { gql } from "apollo-boost";

export const CREATE_TEAM = gql`
  mutation CreateDirectMessage($input: CreateDirectMessageInput!) {
    createDirectMessage(input: $input) {
      success
      threadId
      invitees {
        id
        name
      }
      message {
        id
        message
        sentBy {
          id
          name
        }
      }
    }
  }
`;
