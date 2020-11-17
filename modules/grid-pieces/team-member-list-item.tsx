import React from "react";

import {
  Button,
  Flex,
  MaterialIconBase,
  StyledListItem
} from "../primitives/styled-rebass";
import { ModalViewStatesType } from "../site-layout/grid-layout_v3";
import { User } from "../gql-gen/generated/apollo-graphql";

// interface UserLikeProps {
//   id: string;
//   name: string;
//   // __typename: string;
// }

type UserLikeProps = Pick<User, "id" | "name">;

export interface TeamMemberListItemProps {
  // userToTeamId: string;
  // teamId: string;
  // user: UserLikeProps
  __typename?: "UserToTeam";

  isMe?: boolean;
  // id?: string | null | undefined;
  name?: string | null | undefined;

  userToTeamId?: string;
  teamId?: string;

  user?: UserLikeProps;

  adminEditUserModalState?: ModalViewStatesType;
  setAdminEditUserModalState?: React.Dispatch<
    React.SetStateAction<ModalViewStatesType>
  >;
}

export const TeamMemberListItem: React.FunctionComponent<TeamMemberListItemProps> = (
  {
    user,
    // id,
    isMe,
    setAdminEditUserModalState,
    adminEditUserModalState
  },
  index
) => {
  return (
    <StyledListItem pl={2} py={1} key={`user-${index}`}>
      <Flex>
        <Flex alignItems="center" mr={2}>
          <MaterialIconBase
            name="lens"
            size="1em"
            fill={isMe ? "yellow" : "#38978D"}
          />
        </Flex>
        <Flex alignItems="center">{user ? user.name : "NO USER"}</Flex>
        <Flex ml="auto" mr={2}>
          {user && user.id !== "fake" ? (
            <Button
              type="button"
              onClick={() => {
                setAdminEditUserModalState !== undefined
                  ? setAdminEditUserModalState(
                      adminEditUserModalState === "isClosed"
                        ? "isOpen"
                        : "isClosed"
                    )
                  : null;
              }}
            >
              Edit
            </Button>
          ) : (
            ""
          )}
        </Flex>
      </Flex>
    </StyledListItem>
  );
};
