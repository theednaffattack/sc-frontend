import {
  GetAllTeamsForUserQuery
  // UserTeamRole
} from "../../modules/gql-gen/generated/apollo-graphql";

export type ImportedChannelType = GetAllTeamsForUserQuery["getAllTeamsForUser"][0]["channels"];

export const noChannelMany: ImportedChannelType = [
  {
    name: "no_channel_name",
    id: "no_channel_id",
    __typename: "Channel",
    invitees: [],
    last_message: "no_last_message"
  }
];
