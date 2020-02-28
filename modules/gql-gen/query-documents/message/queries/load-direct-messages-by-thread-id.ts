import { gql } from "apollo-boost";

export const LOAD_DIRECT_MESSAGES_BY_THREAD_ID = gql`
  query LoadDirectMessagesThreadById($threadId: String!, $teamId: String!) {
    loadDirectMessagesThreadById(threadId: $threadId, teamId: $teamId) {
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
