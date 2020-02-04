import React from "react";
import { Flex, ListItem, Text, LinkLink } from "../primitives/styled-rebass";

import { GetAllTeamsForUserQuery } from "../gql-gen/generated/apollo-graphql";

type ChannelsLikeType = GetAllTeamsForUserQuery["getAllTeamsForUser"][0]["channels"];

// I should rely on the generated types and index lookups
// rather than recreate the type
export type MappedTeamsProps = {
  highlight: boolean;
  __typename?: "Team" | undefined;
  id: string;
  name: string;
  channels: ChannelsLikeType;
};

// interface TeamListItemProps {
//   fromMe: "isLoggedInUser" | "is_NOT_LoggedInUser" | "error_unknown";
//   dataMeId: string;
// }

export const TeamListItem: React.FunctionComponent<MappedTeamsProps> = ({
  highlight,
  id,
  name
}) => {
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
      highlight={highlight}
    >
      <Flex
        px={2}
        pb={2}
        pt={1}
        alignItems="center"
        // onClick={() => {
        //   console.log("TEAM CLICKED", { id, highlight, name, index });
        //   // setSelectedTeamIndex(index);
        //   // if (index !== selectedTeamIndex) {
        //   //   setChannelId("");
        //   //   setChannelInfo({
        //   //     channelId: "",
        //   //     channelIndex: -1,
        //   //     channelName: "",
        //   //     invitees: []
        //   //   });
        //   // }
        // }}
        justifyContent="center"
      >
        <LinkLink
          href={`/view-team/[id]`}
          as={`/view-team/${id}`}
          hoverColor="white"
        >
          <Text fontSize="1.6rem" as="p" ml="3px">
            {firstLetter ? firstLetter : "NO"}
          </Text>
        </LinkLink>
      </Flex>
    </ListItem>
  );
};
