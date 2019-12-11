import { gql } from "apollo-boost";

export const ME_QUERY = gql`
  query me {
    me {
      firstName
      lastName
      email
      name
      id
      profileImageUri
    }
  }
`;
