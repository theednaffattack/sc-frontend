import { GetAllTeamsForUserQueryResult } from "../gql-gen/generated/apollo-graphql";

export interface GetAllTeamsForUserQueryTypes {
  loadingUserTeams: GetAllTeamsForUserQueryResult["loading"];
  errorUserTeams: GetAllTeamsForUserQueryResult["error"];
  dataUserTeams: GetAllTeamsForUserQueryResult["data"];
}
