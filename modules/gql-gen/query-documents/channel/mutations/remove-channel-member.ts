import { gql } from "apollo-boost";

export const REMOVE_CHANNEL_MEMBER = gql`
  mutation RemoveChannelMember($channelId: String!, $userId: ID!) {
    removeChannelMember(channelId: $channelId, userId: $userId)
  }
`;
