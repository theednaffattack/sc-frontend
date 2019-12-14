import { gql } from "apollo-boost";

export const EDIT_USER_INFO = gql`
  mutation EditUserInfo($data: EditUserInput!) {
    editUserInfo(data: $data) {
      firstName
      lastName
      email
      name
      id
      profileImageUri
    }
  }
`;
