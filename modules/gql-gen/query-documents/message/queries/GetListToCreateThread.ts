import { gql } from "apollo-boost";

export const GET_ALL_MY_MESSAGES = gql`
  query GetListToCreateThread($teamId: String!) {
    getListToCreateThread(teamId: $teamId) {
      id
      firstName
      lastName
    }
  }
`;
