import React from "react";
import { UserListItem } from "./user-list-item";
import { UnstyledList, StyledListItem } from "../primitives/styled-rebass";
import {
  LoadDirectMessageThreadsByTeamAndUserQueryResult,
  MeQueryResult
} from "../gql-gen/generated/apollo-graphql";
import { DirectMessageListItem } from "./direct-message-list-item";
import { SC_Word as Word } from "../grid-pieces/content-placeholder";

interface RenderDirectMessagesPanelProps {
  data: LoadDirectMessageThreadsByTeamAndUserQueryResult["data"];
  loading: LoadDirectMessageThreadsByTeamAndUserQueryResult["loading"];
  dataMeQuery: MeQueryResult["data"];
  setSelectedDirectMessageInvitees: any;
  selectedDirectMessageInvitees: any;
  teamId: string;
  threadId: string;
}

export const RenderDirectMessagesPanel: React.FC<RenderDirectMessagesPanelProps> = ({
  data,
  dataMeQuery,
  setSelectedDirectMessageInvitees,
  selectedDirectMessageInvitees,
  teamId,
  threadId
}) => {
  if (data && data.loadDirectMessageThreadsByTeamAndUser) {
    return (
      <UnstyledList pl={0} my={0} width={1}>
        <UserListItem isMe={true} name={`${dataMeQuery?.me?.name} (you)`} />
        {data && data.loadDirectMessageThreadsByTeamAndUser
          ? data.loadDirectMessageThreadsByTeamAndUser.map((dm, index) => {
              if (
                setSelectedDirectMessageInvitees &&
                selectedDirectMessageInvitees
              ) {
                return (
                  <DirectMessageListItem
                    highlight={threadId ? threadId === dm.id : false}
                    __typename={dm.__typename ?? ""}
                    key={`${index} - ${dm.__typename}`}
                    last_message={dm.last_message ?? ""}
                    messageThreadId={dm.id ?? ""}
                    teamId={teamId ?? ""}
                    invitees={dm.invitees ?? []}
                    selectedDirectMessageInvitees={
                      selectedDirectMessageInvitees
                    }
                    setSelectedDirectMessageInvitees={
                      setSelectedDirectMessageInvitees
                    }
                  />
                );
              }
              return dm;
            })
          : Array.from({ length: 7 }).map(() => <Word width={1} />)}
      </UnstyledList>
    );
  }

  return (
    <UnstyledList pl={0} my={0} width={1}>
      {Array.from({ length: 7 }).map((_, index) => (
        <StyledListItem key={`dm-placeholder-${index}`}>
          <Word
            bg="rgba(255,255,255,0.4)"
            // mb={2}
            // mr={2}
            borderRadius="8px"
            height="18px"
            width={1}
            sx={{
              display: "inline-block"
            }}
          />
        </StyledListItem>
      ))}
    </UnstyledList>
  );
};
