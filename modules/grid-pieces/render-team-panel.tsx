import React from "react";

import { SC_Word as Word } from "../../modules/grid-pieces/content-placeholder";
import {
  Flex,
  LinkLink,
  ListItem,
  UnstyledList,
  StyledListItem,
  Text
} from "../../modules/primitives/styled-rebass";
import {
  GetAllTeamsForUserQueryHookResult,
  useGetAllTeamsForUserQuery
} from "../../modules/gql-gen/generated/apollo-graphql";
import { MappedTeamsProps, TeamListItem } from "./team-list-item";
import { noQParams } from "../site-layout/grid-layout_v3";

interface I_TeamPanelInfo extends GetAllTeamsForUserQueryHookResult {
  selectedTeamId: string;
}

const Pre = (props: any) => (
  <Text
    {...props}
    as="pre"
    sx={{
      fontFamily: "mono",
      p: 2,
      color: "secondary",
      bg: "muted",
      overflowX: "auto"
    }}
  />
);

export const RenderTeamPanelReal: React.FC<I_TeamPanelInfo> = () => {
  const { data, error, loading } = useGetAllTeamsForUserQuery();
  if (loading) return <UnstyledList>loading Team panel...</UnstyledList>;
  if (error)
    return (
      <UnstyledList>
        <Text> Error loading Team panel!:</Text>
        <Pre>{JSON.stringify(error, null, 2)}</Pre>
      </UnstyledList>
    );
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
  loading,
  selectedTeamId
}) => {
  if (error)
    return (
      <Flex flexDirection="column">
        <UnstyledList>
          ERROR Loading Team Panel Information
          {JSON.stringify(error, null, 2)}
        </UnstyledList>
      </Flex>
    );
  if (loading)
    return (
      <Flex flexDirection="column">
        <UnstyledList>
          {Array.from({ length: 5 }).map((_, index) => (
            <StyledListItem key={index}>
              <Word width={1} />
            </StyledListItem>
          ))}
        </UnstyledList>
      </Flex>
    );
  if (data) {
    let mappedTeams: MappedTeamsProps[] = data.getAllTeamsForUser.map(
      (team, index) => {
        let returnTeamObj;
        if (selectedTeamId !== noQParams.teamId) {
          returnTeamObj = {
            __typename: team.__typename,
            highlight: team.id === selectedTeamId ? true : false,
            id: team.id,
            name: team.name,
            channels: team.channels
          };
        } else {
          returnTeamObj = {
            __typename: team.__typename,
            highlight: index === 0 ? true : false,
            id: team.id,
            name: team.name,
            channels: team.channels
          };
        }
        return returnTeamObj;
      }
    );

    return (
      <Flex flexDirection="column" width={1} alignItems="center">
        <UnstyledList p={0}>
          {mappedTeams.length > 0 ? (
            mappedTeams.map(TeamListItem)
          ) : (
            <TeamListItem id="#" name="???" highlight={true} />
          )}
          <ListItem
            height="50px"
            width="50px"
            borderRadius="15px"
            bg="#676066"
            mx={3}
            my={2}
            highlight={false}
          >
            <Flex
              px={2}
              pb={2}
              pt={1}
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="1.6rem" as="p" ml="3px">
                <LinkLink
                  href={`/create-team`}
                  as={`/create-team`}
                  hoverColor="white"
                >
                  +
                </LinkLink>
              </Text>
            </Flex>
          </ListItem>
        </UnstyledList>
      </Flex>
    );
  }
  return (
    <Flex flexDirection="column">
      <UnstyledList>
        {Array.from({ length: 5 }).map((_, index) => (
          <StyledListItem key={index}>
            <Word width={1} />
          </StyledListItem>
        ))}
      </UnstyledList>
    </Flex>
  );
};
