import React from "react";

import { GetAllTeamMembersQuery } from "../../gql-gen/generated/apollo-graphql";
import { AvatarPlaceholder } from "../../profile/avatar-placeholder";
import {
  Flex,
  Text,
  UnstyledList,
  StyledListItem,
  MaterialIconBase
} from "../../primitives/styled-rebass";

export interface TeamMemberListProps {
  dataGetAllTeamMembers?: GetAllTeamMembersQuery;
  filterTeammates?: GetAllTeamMembersQuery["getAllTeamMembers"];
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  // setInvitees: any;
  invitees: any[];
}

export const TeamMemberList: React.FC<TeamMemberListProps> = ({
  // dataGetAllTeamMembers,
  filterTeammates,
  invitees,
  // setInvitees,
  setFieldValue
}) => {
  return (
    <UnstyledList
      width={["350px"]}
      p={0}
      style={{
        border: "2px pink solid",
        minHeight: "200px",
        overflowY: "auto"
      }}
    >
      {filterTeammates
        ? filterTeammates.map((user, index) => (
            <StyledListItem
              key={
                `modal-list-team-members-${index}` ?? index + "-team-member-key"
              }
              style={{
                cursor: "pointer"
              }}
            >
              <Flex
                alignItems="center"
                onClick={() => {
                  if (invitees && invitees.includes(user)) {
                    let filterOutUser = invitees.filter(
                      invitee => invitee != user
                    );

                    if (setFieldValue) {
                      setFieldValue("invitees", filterOutUser);
                    }
                  }
                  if (invitees && !invitees.includes(user)) {
                    if (setFieldValue) {
                      setFieldValue("invitees", [...invitees, user]);
                    }
                  }
                  if (!invitees && setFieldValue) {
                    setFieldValue("invitees", [user]);
                  } else {
                    console.log("SELECTION CLICK", { invitees, user });
                  }
                }}
              >
                <Flex alignItems="center">
                  <AvatarPlaceholder size="2em" />
                  {/* <Text>{user.name}</Text> */}
                  <Text>username here</Text>
                </Flex>
                <Flex ml="auto">
                  {invitees && invitees.includes(user) ? (
                    <MaterialIconBase
                      name="check"
                      fill="limegreen"
                      size="1.5rem"
                    />
                  ) : (
                    ""
                  )}
                </Flex>
              </Flex>
            </StyledListItem>
          ))
        : ""}
    </UnstyledList>
  );
};
