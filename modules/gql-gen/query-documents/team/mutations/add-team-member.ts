import { gql } from "apollo-boost";

export const ADD_TEAM_MEMBER = gql`
  mutation AddTeamMember($teamId: String!, $userId: String!) {
    addTeamMember(teamId: $teamId, userId: $userId)
  }
`;
