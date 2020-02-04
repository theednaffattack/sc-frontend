import { gql } from "apollo-boost";

export const LOAD_DIRECT_MESSAGE_THREADS_BY_TEAM_AND_USER = gql`
  query LoadDirectMessageThreadsByTeamAndUser($teamId: String!) {
    loadDirectMessageThreadsByTeamAndUser(teamId: $teamId) {
      id
      last_message
      # team {
      #   id
      #   name
      # }
      invitees {
        id
        name
      }
      messages {
        id
        message
      }
    }
  }
`;
