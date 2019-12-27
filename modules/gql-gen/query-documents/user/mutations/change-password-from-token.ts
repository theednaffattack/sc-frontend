import { gql } from "apollo-boost";

export const CHANGE_PASSWORD_FROM_TOKEN = gql`
  mutation ChangePasswordFromToken($data: ChangePasswordInput!) {
    changePasswordFromToken(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
