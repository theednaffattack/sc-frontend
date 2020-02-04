import { gql } from "apollo-boost";

export const LOAD_CHANNELS_BY_TEAM_ID = gql`
  query LoadChannelsByTeamId($teamId: String!) {
    loadChannelsByTeamId(teamId: $teamId) {
      id
      name
      invitees {
        id
        name
      }
    }
  }
`;
