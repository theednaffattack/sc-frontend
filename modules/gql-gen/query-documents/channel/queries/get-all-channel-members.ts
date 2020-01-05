import { gql } from "apollo-boost";

export const GET_ALL_CHANNEL_MEMBERS = gql`
  query GetAllChannelMembers($channelId: String!) {
    getAllChannelMembers(channelId: $channelId) {
      id
      name
    }
  }
`;
