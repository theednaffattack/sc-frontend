import { gql } from "apollo-boost";

export const ADD_TEAM_MEMBER = gql`
  query GetAllTeamsForUser {
    getAllTeamsForUser {
      id
      name
      channels {
        id
        name
        last_message
        invitees {
          id
          name
        }
        # messages {
        #   id
        #   message
        # }
      }
    }
  }
`;
