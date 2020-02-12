import React, { useEffect } from "react";
import {
  Flex,
  MaterialIconBase,
  StyledListItem,
  Text,
  AltSidebarLink
} from "../primitives/styled-rebass";
import {
  // LoadDirectMessageThreadsByTeamAndUserQuery,
  User
} from "../gql-gen/generated/apollo-graphql";

export interface DirectMessageListItemProps {
  messageThreadId: string;
  teamId: string;
  __typename: string;
  invitees: ({
    __typename?: "User" | undefined;
  } & Pick<User, "id" | "name">)[];
  highlight: boolean;
  // invitees: {
  //   id: string;
  //   name: string;
  // }[];
  last_message: string;
  selectedDirectMessageInvitees: ({
    __typename?: "User" | undefined;
  } & Pick<User, "id" | "name">)[];
  setSelectedDirectMessageInvitees: React.Dispatch<
    React.SetStateAction<
      ({
        __typename?: "User" | undefined;
      } & Pick<User, "id" | "name">)[]
    >
  >;
}
export const DirectMessageListItem: React.FunctionComponent<DirectMessageListItemProps> = ({
  highlight,
  invitees,
  last_message,
  messageThreadId,
  teamId,
  // selectedDirectMessageInvitees,
  setSelectedDirectMessageInvitees
}) => {
  useEffect(() => {
    if (invitees && setSelectedDirectMessageInvitees) {
      setSelectedDirectMessageInvitees(invitees);
    }
  }, [invitees, setSelectedDirectMessageInvitees]);
  return (
    <StyledListItem
      highlight={highlight}
      pl={2}
      py={1}
      key={`messageThread-${messageThreadId}`}
    >
      <AltSidebarLink
        href={`/messages/[teamId]/[threadId]`}
        as={`/messages/${teamId}/${messageThreadId}`}
        setOnClick={setSelectedDirectMessageInvitees}
        setOnClickValue={invitees}
      >
        <Flex alignItems="center">
          <Flex alignItems="center" mr={2}>
            <MaterialIconBase name="lens" size="1rem" fill="#38978D" />
          </Flex>
          <Flex alignItems="center" width={1}>
            <Flex
              width={1}
              mr="auto"
              flexWrap="nowrap"
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "block"
              }}
            >
              {last_message.slice(0, 25)}
            </Flex>
            <Flex pl={2}>
              {invitees.map(user => (
                <Flex
                  key={`direct-message-user-listing-${user.id}`}
                  flexDirection="column"
                  alignItems="center"
                  px={1}
                  // border="crimson"
                  style={{ overflowX: "auto" }}
                >
                  <MaterialIconBase
                    name="account_circle"
                    size="1rem"
                    fill="#38978D"
                  />
                  <Text fontSize=".3rem">{user.name?.slice(0, -3)}</Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </AltSidebarLink>
    </StyledListItem>
  );
};
