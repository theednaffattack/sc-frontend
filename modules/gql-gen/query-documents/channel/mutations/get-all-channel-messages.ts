import { gql } from "apollo-boost";

export const GET_ALL_CHANNEL_MESSAGES = gql`
  query GetAllChannelMessages($channelId: String!, $teamId: String!) {
    getAllChannelMessages(channelId: $channelId, teamId: $teamId) {
      id
      message
      files {
        id
        uri
        file_type
      }
      created_at
      #     images {
      #       id
      #       uri

      #     }
      sentBy {
        id
        name
      }
    }
  }
`;
