import { gql } from "apollo-boost";

export const CHANGE_PASSWORD_FROM_CTX_USERID = gql`
  mutation ChangePasswordFromContextUserid($data: PasswordInput!) {
    changePasswordFromContextUserid(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
