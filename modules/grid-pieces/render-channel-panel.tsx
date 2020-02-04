import React, { SetStateAction } from "react";
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
  setChannelName: React.Dispatch<SetStateAction<string>>;
  setOnClickValue: string;
  teamId: string;
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
  channelId?: string | undefined;
  highlight: boolean;
  setChannelName: React.Dispatch<SetStateAction<string>>;
  setOnClickValue: string;
  teamId: string;
}

export const RenderChannelPanel: React.FC<I_ChannelPanelInfo> = ({
  channelId,
  data,
  error,
  // loading,
  setChannelName,
  setOnClickValue,
  teamId
}) => {
  if (error)
    return (
      <div>AN ERROR OCCURRED LOADING CHANNEL DATA {JSON.stringify(error)}</div>
    );
  // if (loading) return <div>loading CHANNEL PANEL...</div>;
  // if (!data) return <div>CHANNEL PANEL DATA IS MISSING?</div>;
  // if (!teamId) return <div>CHANNEL PANEL TEAM ID IS MISSING</div>;
  if (data) {
    let mappedChannels: MappedChannelProps[] = data.loadChannelsByTeamId.map(
      (channel, index) => {
        const shouldIHighlight =
          channelId === channel.id
            ? true
            : !channelId && index === 0 // && messageId === undefined
            ? true
            : false;
        const returnChannelObj: MappedChannelProps = {
          __typename: channel.__typename,
          highlight: shouldIHighlight,
          id: channel.id,
          name: channel.name,
          invitees: channel.invitees,
          setChannelName,
          setOnClickValue,
          teamId
        };
        return returnChannelObj;
      }
    );
    return (
      <UnstyledList p={0} mx="auto">
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
