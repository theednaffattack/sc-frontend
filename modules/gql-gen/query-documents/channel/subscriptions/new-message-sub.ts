import { gql } from "apollo-boost";

export const ADD_CHANNEL_MEMBER = gql`
  subscription NewMessageSub($data: AddMessageToChannelInput!) {
    newMessageSub(data: $data) {
      id
      created_at
      message
      created_at
      files {
        id
        uri
        file_type
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
