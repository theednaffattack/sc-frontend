import React from "react";

import { AvatarPlaceholder } from "../../profile/avatar-placeholder";
import {
  Flex,
  Text,
  UnstyledList,
  StyledListItem
} from "../../primitives/styled-rebass";

import { TeamMemberListProps } from "./team-member-list";

interface SelectedTeamMemberListProps extends TeamMemberListProps {}

export const SelectedTeamMemberList: React.FC<SelectedTeamMemberListProps> = ({
  // dataGetAllTeamMembers,
  invitees,
  // setInvitees,
  setFieldValue
}) => {
  return (
    <UnstyledList
      width={1}
      p={0}
      style={{
        border: "2px pink solid",
        minHeight: "55px",
        display: "flex"
      }}
    >
      {invitees?.map((invitee, index) => (
        <StyledListItem
          key={`${index} - ${invitee && invitee.id}`}
          onClick={() => {
            if (invitees.includes(invitee)) {
              console.log("SCENARIO 1 - INVITEES INCLUDES invitee");
              let filterOutinvitee = invitees.filter(
                invitee => invitee != invitee
              );
              console.log(
                "CHECK FILTER OUT invitee VARIABLE",
                filterOutinvitee
              );

              // setInvitees(filterOutinvitee);
              if (setFieldValue) {
                setFieldValue("invitees", filterOutinvitee);
              }
            }
            if (!invitees.includes(invitee)) {
              console.log("SCENARIO 2 - INVITEES DOES NOT INCLUDE invitee");
              // setInvitees([...invitees, invitee]);

              if (setFieldValue) {
                setFieldValue("invitees", [...invitees, invitee]);
              }
            }
          }}
        >
          <Flex flexDirection="column" border="crimson" alignItems="center">
            <AvatarPlaceholder size="2em" />
            <Text>{invitee.name}</Text>
          </Flex>
        </StyledListItem>
      ))}
    </UnstyledList>
  );
};
