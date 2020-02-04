import React from "react";
import Maybe from "graphql/tsutils/Maybe";

import { SidebarLink, StyledListItem } from "../primitives/styled-rebass";
import { User } from "../gql-gen/generated/apollo-graphql";

export interface ChannelListItemProps {
  id?: string | null | undefined;
  name: string;
  teamId: string;
  highlight: boolean;
  invitees: Maybe<
    Maybe<
      {
        __typename?: "User" | undefined;
      } & Pick<User, "id" | "name">
    >[]
  >;
  __typename?: "Channel" | undefined;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
  setOnClickValue: string;
}

export const ChannelListItem: React.FunctionComponent<ChannelListItemProps> = (
  { id, name, highlight, setChannelName, setOnClickValue, teamId },
  index: number
) => {
  if (!id || !name) {
    console.log("WAIT, WHAT IS THIS???", { id, teamId });

    return <div key={teamId}>error NULL detected</div>;
  } else {
    let newKey = `/view-team/${teamId}/channel/${id}`;
    console.log("NEW KEY", newKey);
    return (
      <StyledListItem
        pl={2}
        py={1}
        key={`unique-channel-${id}-${index}`}
        highlight={highlight}
      >
        <SidebarLink
          key={`anchor-unique-channel-${id}-${index}`}
          hoverColor="white"
          as={newKey}
          href={`/view-team/[teamId]/channel/[channelId]`}
          setOnClick={setChannelName}
          setOnClickValue={setOnClickValue}
        >
          {`# ${name}`}
        </SidebarLink>
      </StyledListItem>
    );
  }
};
