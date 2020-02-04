import { gql } from "apollo-boost";

export const LOAD_DIRECT_MESSAGES_BY_THREAD_ID = gql`
  query LoadDirectMessagesThreadById($threadId: String!) {
    loadDirectMessagesThreadById(threadId: $threadId) {
      id
      invitees {
        id
        name
      }
      messages {
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
