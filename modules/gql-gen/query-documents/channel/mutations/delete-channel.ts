import { gql } from "apollo-boost";

export const DELETE_CHANNEL = gql`
  mutation DeleteChannel($channelId: String!, $channelName: String!) {
    deleteChannel(channelId: $channelId, channelName: $channelName)
  }
`;
