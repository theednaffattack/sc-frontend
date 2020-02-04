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
  threadId: string;
  // selectedDirectMessageInvitees: string;
  // setSelectedDirectMessageInvitees: React.Dispatch<
  //   React.SetStateAction<string>
  // >;

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

// type TIsStringEmpty = "string_is_empty" | "string_is_NOT_empty";

const DirectMessageHeader: React.FunctionComponent<DirectMessageHeaderProps> = ({
  selectedDirectMessageInvitees
}) => {
  // const isStringEmpty: TIsStringEmpty =
  //   typeof selectedDirectMessageInvitees === "string" &&
  //   selectedDirectMessageInvitees.length > 0
  //     ? "string_is_NOT_empty"
  //     : "string_is_empty";
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
            // <span key={invitee.id ?? index}>{invitee.name}</span>
            <StyledListItem
              key={invitee.id ?? `thread-invitee-${index}`}
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
