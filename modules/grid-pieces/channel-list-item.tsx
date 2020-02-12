import React from "react";
import Maybe from "graphql/tsutils/Maybe";

import { SidebarLink, StyledListItem } from "../primitives/styled-rebass";
import { SC_Word as Word } from "../grid-pieces/content-placeholder";
import { User } from "../gql-gen/generated/apollo-graphql";

export interface ChannelListItemProps {
  id?: string | null | undefined;
  name: string;
  teamId?: string | undefined;
  highlight: boolean;
  invitees: Maybe<
    Maybe<
      {
        __typename?: "User" | undefined;
      } & Pick<User, "id" | "name">
    >[]
  >;
  __typename?: "Channel" | undefined;
}

export const ChannelListItem: React.FunctionComponent<ChannelListItemProps> = (
  { id, name, highlight, teamId },
  index: number
) => {
  if (!id || !name) {
    return <div key={teamId}>error NULL detected</div>;
  } else {
    let newKey = `/view-team/${teamId}/channel/${id}`;

    return (
      <StyledListItem
        pl={2}
        py={1}
        key={`unique-channel-${id}-${index}`}
        highlight={highlight}
      >
        {teamId ? (
          <SidebarLink
            key={`anchor-unique-channel-${id}-${index}`}
            hoverColor="white"
            as={newKey}
            href={`/view-team/[teamId]/channel/[channelId]`}
          >
            {`# ${name}`}
          </SidebarLink>
        ) : (
          <Word width={1} />
        )}
      </StyledListItem>
    );
  }
};
