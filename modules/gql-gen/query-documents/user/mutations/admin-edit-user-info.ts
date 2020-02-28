import { gql } from "apollo-boost";

export const ADMIN_EDIT_USER_INFO = gql`
  mutation AdminEditUserInfo($data: EditUserInput!) {
    adminEditUserInfo(data: $data) {
      id
      name
      email
      userToTeams {
        userToTeamId
        teamRoleAuthorizations
        teamId
        userId
      }
    }
  }
`;
