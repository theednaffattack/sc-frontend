import React from "react";
import {
  Flex,
  MaterialIconBase,
  StyledListItem
} from "../primitives/styled-rebass";

export interface UserListItemProps {
  isMe?: boolean;
  id?: string | null | undefined;
  name?: string | null | undefined;
}

export const UserListItem: React.FunctionComponent<UserListItemProps> = ({
  id,
  isMe,
  name
}) => (
  <StyledListItem pl={2} py={1} key={`user-${id}`}>
    <Flex>
      <Flex alignItems="center" mr={2}>
        <MaterialIconBase
          name="lens"
          size="1em"
          fill={isMe ? "yellow" : "#38978D"}
        />
      </Flex>
      <Flex>{name}</Flex>
    </Flex>
  </StyledListItem>
);
