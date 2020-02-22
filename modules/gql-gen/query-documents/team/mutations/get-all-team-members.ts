import { gql } from "apollo-boost";

export const GET_ALL_TEAM_MEMBERS = gql`
  query GetAllTeamMembers($teamId: String!) {
    getAllTeamMembers(teamId: $teamId) {
      id
      name
      # teamRoles {
      #   id
      #   teamRole
      #   userForRole {
      #     id
      #     name
      #   }
      # }
    }
  }
`;
