import { gql } from "apollo-boost";

export const ADD_CHANNEL_MEMBER = gql`
  mutation AddChannelMember($channelId: String!, $userId: ID!) {
    addChannelMember(channelId: $channelId, userId: $userId)
  }
`;
