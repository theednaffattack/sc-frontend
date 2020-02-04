import React from "react";
import { Flex, StyledListItem, Text } from "../primitives/styled-rebass";

import { AvatarPlaceholder } from "../profile/avatar-placeholder";

interface BasicUserData {
  id: string;
  name: string;
}

interface MessageReturnType {
  id: string;
  message: string;
  sentBy: BasicUserData;
}

export interface MessageListItemProps extends MessageReturnType {
  fromMe: "isLoggedInUser" | "is_NOT_LoggedInUser" | "error_unknown";
  dataMeId: string;
}

export const MessageListItem: React.FunctionComponent<MessageListItemProps> = ({
  id,

  fromMe,
  message,
  sentBy
}) => (
  <StyledListItem p={3} setBackgroundColor="rgba(218, 223, 225, 0.5)" key={id}>
    <Flex
      flexDirection="row"
      // border="2px pink dashed"
      alignItems="center"
      justifyContent="center"
    >
      {fromMe === "isLoggedInUser" ? (
        <Flex flexDirection="column" border="crimson" alignItems="center">
          <AvatarPlaceholder size="2em" />
          <Text>{sentBy.name}</Text>
        </Flex>
      ) : (
        ""
      )}
      <Flex
        flexDirection="column"
        border="lime"
        width={[1, 1, 2 / 3, 2 / 3, 2 / 3]}
      >
        {message}
      </Flex>
      {fromMe === "is_NOT_LoggedInUser" ? (
        <Flex flexDirection="column" border="crimson" alignItems="center">
          <AvatarPlaceholder size="2em" />
          <Text> {sentBy.name}</Text>
        </Flex>
      ) : (
        ""
      )}
    </Flex>
  </StyledListItem>
);
