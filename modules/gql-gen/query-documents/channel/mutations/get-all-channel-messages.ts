import { gql } from "apollo-boost";

export const GET_ALL_CHANNEL_MESSAGES = gql`
  query GetAllChannelMessages($channelId: String!, $teamId: String!) {
    getAllChannelMessages(channelId: $channelId, teamId: $teamId) {
      id
      message
      sentBy {
        id
        name
      }
    }
  }
`;
