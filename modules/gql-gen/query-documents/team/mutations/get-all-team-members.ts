import { gql } from "apollo-boost";

export const GET_ALL_TEAM_MEMBERS = gql`
  query GetAllTeamMembers($teamIds: [ID!]!) {
    teamMembers(teamIds: $teamIds) {
      id
      name
      teamRole
    }
  }
`;
