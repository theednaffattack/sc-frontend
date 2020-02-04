import React from "react";

import { SC_Word as Word } from "../../modules/grid-pieces/content-placeholder";
import {
  UnstyledList,
  StyledListItem,
  Text
} from "../../modules/primitives/styled-rebass";
import {
  GetAllTeamsForUserQueryHookResult,
  useGetAllTeamsForUserQuery
} from "../../modules/gql-gen/generated/apollo-graphql";
import { MappedTeamsProps, TeamListItem } from "./team-list-item";

interface I_TeamPanelInfo extends GetAllTeamsForUserQueryHookResult {}

export const RenderTeamPanelReal: React.FC<I_TeamPanelInfo> = () => {
  const { data, error, loading } = useGetAllTeamsForUserQuery();
  if (loading) return <UnstyledList>of something</UnstyledList>;
  if (error) return <UnstyledList>of something</UnstyledList>;
  const listLength = 5;
  return (
    <UnstyledList>
      {Array.from({ length: listLength }).map((_, index) => (
        <StyledListItem key={index}>
          {loading ? (
            <Word width={1} />
          ) : data ? (
            <Text>{data.getAllTeamsForUser[index].name}</Text>
          ) : (
            <Word width={1} />
          )}
        </StyledListItem>
      ))}
    </UnstyledList>
  );
};

export const RenderTeamPanel: React.FC<I_TeamPanelInfo> = ({
  data,
  error,
  loading
}) => {
  if (error)
    return (
      <UnstyledList>
        ERROR Loading Team Panel Information
        {JSON.stringify(error, null, 2)}
      </UnstyledList>
    );
  if (loading)
    return (
      <UnstyledList>
        {Array.from({ length: 5 }).map((_, index) => (
          <StyledListItem key={index}>
            <Word width={1} />
          </StyledListItem>
        ))}
      </UnstyledList>
    );
  if (data) {
    let mappedTeams: MappedTeamsProps[] = data.getAllTeamsForUser.map(
      (team, index) => {
        const returnTeamObj = {
          __typename: team.__typename,
          highlight: index === 0 ? true : false,
          id: team.id,
          name: team.name,
          channels: team.channels
        };
        return returnTeamObj;
      }
    );
    return (
      <UnstyledList p={0} mx="auto">
        {mappedTeams.map(TeamListItem)}
      </UnstyledList>
    );
  }
  return (
    <UnstyledList>
      {Array.from({ length: 5 }).map((_, index) => (
        <StyledListItem key={index}>
          <Word width={1} />
        </StyledListItem>
      ))}
    </UnstyledList>
  );
};
