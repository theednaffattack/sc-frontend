import { gql } from "apollo-boost";

export const ADD_TEAM_MEMBER = gql`
  mutation AddTeamMember($teamId: String!, $email: String!) {
    addTeamMember(teamId: $teamId, email: $email)
  }
`;
