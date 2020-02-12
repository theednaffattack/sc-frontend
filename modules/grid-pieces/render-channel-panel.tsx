import React from "react";
import Maybe from "graphql/tsutils/Maybe";

import { SC_Word as Word } from "../../modules/grid-pieces/content-placeholder";
import { ChannelListItem } from "../../modules/grid-pieces/channel-list-item";
import {
  UnstyledList,
  StyledListItem
} from "../../modules/primitives/styled-rebass";
import {
  User,
  LoadChannelsByTeamIdQueryHookResult
} from "../../modules/gql-gen/generated/apollo-graphql";

interface I_ChannelPanelInfo extends LoadChannelsByTeamIdQueryHookResult {
  channelId: string | undefined;
  teamId: string;
  viewerState?: any;
  viewerDispatch?: any;
}

interface ChannelProps {
  __typename: "Channel" | undefined;
  id: string | null | undefined;
  name: string;
  invitees: Maybe<
    Maybe<
      {
        __typename?: "User" | undefined;
      } & Pick<User, "id" | "name">
    >[]
  >;
}

interface MappedChannelProps extends ChannelProps {
  highlight: boolean;
  teamId?: string;
}

export const RenderChannelPanel: React.FC<I_ChannelPanelInfo> = ({
  channelId,
  data,
  error,
  // loading,
  teamId,
  // viewerDispatch,
  viewerState
}) => {
  if (error)
    return (
      <div>AN ERROR OCCURRED LOADING CHANNEL DATA {JSON.stringify(error)}</div>
    );

  if (data) {
    let mappedChannels: MappedChannelProps[] = data.loadChannelsByTeamId.map(
      channel => {
        let shouldIHighlight = false;

        if (channelId === channel.id) {
          shouldIHighlight = true;
        }
        if (viewerState && channel.id === viewerState.idShowing) {
          shouldIHighlight = true;
        }

        if (teamId) {
          const returnChannelObj: MappedChannelProps = {
            __typename: channel.__typename,
            id: channel.id,
            name: channel.name,
            invitees: channel.invitees,
            highlight: shouldIHighlight,
            teamId
          };
          return returnChannelObj;
        }
        return {
          __typename: channel.__typename,
          id: channel.id,
          name: channel.name,
          invitees: channel.invitees,
          highlight: shouldIHighlight,
          teamId: ""
        };
      }
    );
    return (
      <UnstyledList p={0} width={1} mx="auto">
        {mappedChannels.map(ChannelListItem)}
      </UnstyledList>
    );
  }

  return (
    <UnstyledList p={0} pr={2}>
      {Array.from({ length: 8 }).map((_, index) => (
        <StyledListItem pl={2} py={1} key={`channel-skeleton-${index}`}>
          <Word
            bg="rgba(255,255,255,0.4)"
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
