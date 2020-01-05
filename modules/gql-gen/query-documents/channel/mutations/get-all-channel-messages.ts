import { gql } from "apollo-boost";

export const GET_ALL_CHANNEL_MESSAGES = gql`
  query GetAllChannelMessages($channelId: String!) {
    getAllChannelMessages(channelId: $channelId) {
      id
      message
    }
  }
`;
