import { gql } from "apollo-boost";

export const ADD_TEAM_MEMBER = gql`
  mutation AddTeamMember(
    $roles: [TeamRoleEnum!]!
    $teamId: String!
    $email: String!
  ) {
    addTeamMember(roles: $roles, teamId: $teamId, email: $email) {
      userId
      teamId
      teamRoleAuthorizations
    }
  }
`;
