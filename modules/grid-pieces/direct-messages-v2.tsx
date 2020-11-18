import React from "react";
// import { UserListItem } from "../grid-pieces/user-list-item";

import { ListItemProps } from "../../old/team/channels";

import {
  Flex,
  MaterialIconBase,
  StyledListItem,
  UnstyledList,
} from "../primitives/styled-rebass";
import { useGetAllTeamMembersQuery } from "../gql-gen/generated/apollo-graphql";

interface DirectMessagesProps {
  teamId: string;
}

const UserListItem: React.FunctionComponent<ListItemProps> = (
  { id, name },
  index
) => (
  <StyledListItem pl={2} py={1} key={`user-${id}-${index}`}>
    <Flex>
      <Flex>
        <MaterialIconBase name="lens" size="1rem" fill="limegreen" />
      </Flex>
      <Flex>{name}</Flex>
    </Flex>
  </StyledListItem>
);

export const DirectMessages: React.FunctionComponent<DirectMessagesProps> = ({
  teamId,
}) => {
  const slackBot = { id: "123", name: "slackbot" };
  const {
    data: dataTeamMembers,
    // error: errorTeamMembers,
    // loading: loadingTeamMembers
  } = useGetAllTeamMembersQuery({ variables: { teamId } });

  if (teamId === undefined || teamId === "isNull") {
    return (
      <UnstyledList p={0} mt={1} mb={3}>
        {[slackBot].map(UserListItem)}
      </UnstyledList>
    );
  }
  if (teamId) {
    
      const transformQuery = dataTeamMembers?.getAllTeamMembers?.map((teamMember)=>{
        return({
          id: teamMember.user.id || "",
          name: teamMember.user.name || ""
        })
      }) ?? [];
    let addSlackBot = [slackBot, ...transformQuery];
    
    return (
      <UnstyledList p={0} mt={1} mb={3}>
        {addSlackBot.map(UserListItem)}
      </UnstyledList>
    );
  } else {
    console.error("oh no this should be unreachable");
    return (
      <UnstyledList p={0} mt={1} mb={3}>
        <li>NO USES FOUND</li>
        {/* {[slackBot].map(UserListItem)} */}
      </UnstyledList>
    );
  }
};
