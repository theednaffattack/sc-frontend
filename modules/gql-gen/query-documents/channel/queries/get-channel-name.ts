import { gql } from "apollo-boost";

export const GET_CHANNEL_NAME = gql`
  query GetChannelName($channelId: String!) {
    getChannelName(channelId: $channelId)
  }
`;
