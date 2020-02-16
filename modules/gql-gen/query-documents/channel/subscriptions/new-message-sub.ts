import { gql } from "apollo-boost";

export const ADD_CHANNEL_MEMBER = gql`
  subscription NewMessageSub($data: AddMessageToChannelInput!) {
    newMessageSub(data: $data) {
      id
      created_at
      message
      images {
        id
        uri
      }
      sentBy {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
`;
