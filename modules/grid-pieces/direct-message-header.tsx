import React from "react";

import {
  Flex,
  HeaderWrapper,
  Text,
  StyledListItem,
  UnstyledList
} from "../primitives/styled-rebass";
import { User } from "../gql-gen/generated/apollo-graphql";
import AvatarPlaceholder from "../profile/avatar-placeholder";

interface DirectMessageHeaderProps {
  threadId?: string;

  selectedDirectMessageInvitees: ({
    __typename?: "User" | undefined;
  } & Pick<User, "id" | "name">)[];
}

const DirectMessageHeader: React.FunctionComponent<DirectMessageHeaderProps> = ({
  selectedDirectMessageInvitees
}) => {
  return (
    <HeaderWrapper>
      <Flex justifyContent="center" width={1}>
        <UnstyledList
          width={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {selectedDirectMessageInvitees.map((invitee, index) => (
            <StyledListItem
              key={`thread-invitee-${invitee.id}` ?? `thread-invitee-${index}`}
              mx={2}
            >
              <Flex flexDirection="column" alignItems="center">
                <AvatarPlaceholder size="1.8rem" />
                <Text fontSize="1rem">{invitee.name}</Text>
              </Flex>
            </StyledListItem>
          ))}
        </UnstyledList>
      </Flex>
    </HeaderWrapper>
  );
};

export default DirectMessageHeader;
