import styled from "styled-components";
import React from "react";
import {
  borders,
  space,
  SpaceProps,
  flexbox,
  color,
  width,
  height,
  BordersProps,
  ColorProps,
  FlexboxProps,
  HeightProps,
  WidthProps,
  // fontSize,
  // lineHeight,
  // FontSizeProps,
  // LineHeightProps
} from "styled-system";
import {
  Flex,
  Text,
  UnstyledList,
} from "../../modules/primitives/styled-rebass";
import { GetAllTeamsForUserQueryResult } from "../../modules/gql-gen/generated/apollo-graphql";
import { ChannelInfoStateUpdate } from "../../modules/prepare-to-delete/[channelId]";
// import { GetAllTeamsForUserQueryTypes } from "../shared-module-typings/types";

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;

interface ListItemProps
  extends ColorProps,
    BordersProps,
    SpaceProps,
    FlexboxProps,
    HeightProps,
    WidthProps {
  highlight?: boolean;
}

// interface StyledLinkProps extends ColorProps, FontSizeProps, LineHeightProps {}

const ListItem = styled.li<ListItemProps>`
${color}
  ${borders}
  ${flexbox}
  ${height}
  ${space}
  ${width}
  
  border-style: solid;
    border-width: thick;
    border-color: ${(props) => (props.highlight ? "#767676" : "transparent")};
  :hover{
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }

  transition: 0.3s;
`;

// const StyledLink = styled.a<StyledLinkProps>`
//   ${color}
//   ${fontSize}
//   ${lineHeight}
//   text-decoration: none;
// `;

interface TeamDetailProps {
  id: string;
  letter?: string;
  name?: string;
  setChannelId: React.Dispatch<React.SetStateAction<string>>;
  selectedTeamIndex: number;
  setSelectedTeamIndex: React.Dispatch<React.SetStateAction<number>>;
  setChannelInfo: ChannelInfoStateUpdate;
  teamId: string;
}

interface TeamProps {
  // teams: TeamDetailProps[];
  getAllTeamsForUser: GetAllTeamsForUserQueryResult;

  selectedTeamIndex: number;
  setSelectedTeamIndex: React.Dispatch<React.SetStateAction<number>>;
  setChannelId: React.Dispatch<React.SetStateAction<string>>;
  setChannelInfo: ChannelInfoStateUpdate;
  teamId: string;
}

const TeamListItem: React.FunctionComponent<TeamDetailProps> = (
  {
    id,
    letter,
    name,
    setSelectedTeamIndex,
    selectedTeamIndex,
    setChannelId,
    setChannelInfo,
    teamId,
  },
  index: number
) => {
  let firstLetter;
  if (name) {
    const [getFirstLetter] = name;
    firstLetter = getFirstLetter.toUpperCase();
  }

  return (
    <ListItem
      height="50px"
      width="50px"
      key={`team-${id}`}
      borderRadius="15px"
      bg="#676066"
      mx={3}
      my={2}
      highlight={teamId === id}
    >
      <Flex
        px={2}
        pb={2}
        pt={1}
        alignItems="center"
        onClick={() => {
          setSelectedTeamIndex(index);
          if (index !== selectedTeamIndex) {
            setChannelId("");
            setChannelInfo({
              channelId: "",
              channelIndex: -1,
              channelName: "",
              invitees: [],
            });
          }
        }}
        justifyContent="center"
      >
        <Text fontSize="1.6rem">{firstLetter ? firstLetter : letter}</Text>
      </Flex>
    </ListItem>
  );
};

const Teams: React.FunctionComponent<TeamProps> = ({
  // teams,
  getAllTeamsForUser,
  selectedTeamIndex,
  setSelectedTeamIndex,
  setChannelId,
  setChannelInfo,
  teamId,
}) => {
  const userTeamsToMap =
    getAllTeamsForUser &&
    getAllTeamsForUser.data &&
    getAllTeamsForUser.data.getAllTeamsForUser;
  let newMapWithSetter;
  if (userTeamsToMap) {
    newMapWithSetter = userTeamsToMap.map((item) => {
      let newItems = {
        ...item,
        setSelectedTeamIndex,
        selectedTeamIndex,
        setChannelId,
        setChannelInfo,
        teamId,
      };
      return newItems;
    });

    return (
      <TeamWrapper>
        <UnstyledList p={0} mt={3}>
          {newMapWithSetter ? newMapWithSetter.map(TeamListItem) : ""}
        </UnstyledList>
      </TeamWrapper>
    );
  } else {
    return <TeamWrapper>NO TEAMS FOUND</TeamWrapper>;
  }
};

export default Teams;
