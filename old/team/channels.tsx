import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";

import {
  Box,
  Button,
  Flex,
  Heading,
  MaterialIconBase as Icon,
  Text,
  StyledListItem,
  UnstyledList,
  MaterialIconBase
} from "../primitives/styled-rebass";
import { FakeDirectMessageItemProps } from "./sidebar";
import {
  useLoadChannelsByTeamIdQuery,
  Channel as ChannelType
} from "../gql-gen/generated/apollo-graphql";
import {
  ChannelInfoProps,
  ChannelInfoStateUpdate
} from "../prepare-to-delete/[channelId]";
import { DirectMessages } from "../team/direct-messages-v2";

const textColor = "#958993";

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: ${textColor};
  overflow-x: hidden;
  overflow-y: auto;
`;

// type MaybeChannel = Maybe<
//   Maybe<
//     {
//       __typename?: "Channel" | undefined;
//     } & Pick<ChannelType, "id" | "name">
//   >[]
// >;

interface ChannelProps {
  teamId: string;
  teamName: string | undefined;
  username: string;
  channels: ChannelType[];
  users: any[];
  directMessages: FakeDirectMessageItemProps[];

  // getAllTeamsForUser: GetAllTeamsForUserQueryResult;
  selectedTeamIndex: number;
  setSelectedTeamIndex: React.Dispatch<React.SetStateAction<number>>;
  setChannelId: React.Dispatch<React.SetStateAction<string>>;
  setChannelInfo: ChannelInfoStateUpdate;
  channelInfo: ChannelInfoProps;
  channelModal: string;
  setChannelModal: React.Dispatch<React.SetStateAction<string>>;
}

export interface ListItemProps {
  id?: string | null | undefined;
  name?: string | null | undefined;
}

export interface ChannelListItemProps {
  id?: string | null | undefined;
  name?: string | null | undefined;
  teamId?: string;
  applyHightlight?: boolean;
}

interface StyledLinkProps {
  shade?: string;
}

const StyledLink = styled.a<StyledLinkProps>`
  text-decoration: none;
  color: ${(props: any) =>
    props.shade === "dark" ? props.theme.colors.text : "white"};
`;

const ChannelListItem: React.FunctionComponent<ChannelListItemProps> = (
  { id, name, applyHightlight, teamId },
  index: number
) => {
  if (!id || !name) {
    return <div>error NULL detected</div>;
  } else {
    return (
      <StyledListItem
        pl={2}
        py={1}
        key={`channel-${id}-${index}`}
        highlight={applyHightlight}
      >
        <Link href={`/view-team/${teamId}/channel/${id}`}>
          <StyledLink>{`# ${name}`}</StyledLink>
        </Link>
      </StyledListItem>
    );
  }
};

const UserListItem: React.FunctionComponent<ListItemProps> = ({ id, name }) => (
  <StyledListItem pl={2} py={1} key={`user-${id}`}>
    <Flex>
      <Flex>
        <MaterialIconBase name="lens" size="1rem" fill="limegreen" />
      </Flex>
      <Flex>{name}</Flex>
    </Flex>
  </StyledListItem>
);

const ChannelIfTeamIdIsDefined: React.FunctionComponent<ChannelProps> = ({
  channels,
  setChannelId,
  setChannelInfo,
  channelInfo,
  channelModal,
  setChannelModal,
  teamId,
  teamName,
  username
}) => {
  let initialState = -1;
  // channels && channels[selectedTeamIndex] ? channels[selectedTeamIndex] : -1;
  let mappedChannels;

  const [selectedChannelIndex, setSelectedChannelIndex] = useState<number>(
    initialState
  );

  let { data } = useLoadChannelsByTeamIdQuery({
    variables: {
      teamId
    }
  });

  if (data) {
    mappedChannels = data.loadChannelsByTeamId.map(item => {
      let returnObj = {
        ...item,
        teamId,
        applyHightlight: channelInfo.channelId === item.id
      };
      return returnObj;
    });
  }
  // let channelId =
  //   channels && channels[selectedChannelIndex]
  //     ? channels[selectedChannelIndex].id
  //     : "";
  let modalToggle = channelModal === "isOpen" ? "isClosed" : "isOpen";
  return (
    <ChannelWrapper>
      <Heading ml={2} fontFamily="text" as="h1" color="white">
        {teamName}
      </Heading>
      <Text mb={3} ml={2}>
        {username}
      </Text>
      <Flex>
        <Box>
          <Text fontSize="1.1rem" ml={2}>
            Channels
          </Text>
        </Box>
        <Box my="auto" ml={2}>
          <Button
            bg="transparent"
            p={0}
            onClick={() => setChannelModal(modalToggle)}
            type="button"
          >
            <Icon name="add_circle" size="1rem" fill={textColor} />
          </Button>
        </Box>
      </Flex>
      <UnstyledList p={0} mt={1} mb={3}>
        {channels && channels.length > 0
          ? channels.map((channel, index) => {
              if (channel && channel.id) {
                let channelId = channel.id || "";

                return (
                  <StyledListItem
                    pl={2}
                    py={1}
                    key={`channel-${channel.id}`}
                    highlight={channelInfo.channelId === channelId}
                    onClick={() => {
                      setSelectedChannelIndex(index);
                      setChannelId(channelId);
                      setChannelInfo({
                        channelId: channelId,
                        channelIndex: index,
                        channelName: channel.name,
                        invitees: []
                      });
                    }}
                  >{`# ${channel.name}`}</StyledListItem>
                );
              } else {
                return channel;
              }
            })
          : mappedChannels && mappedChannels.length > 0
          ? mappedChannels.map(ChannelListItem)
          : "no data"}
      </UnstyledList>

      <Text fontSize="1.1rem" ml={2}>
        Direct Messages
      </Text>
      {teamId && teamId !== "isNull" ? (
        <DirectMessages teamId={teamId} />
      ) : (
        <UnstyledList p={0} mt={1} mb={3}>
          {[{ id: "123", name: "slackbot" }].map(UserListItem)}
        </UnstyledList>
      )}
    </ChannelWrapper>
  );
};

const ChannelIfTeamIdIsUndefined: React.FunctionComponent = () => {
  return <ChannelWrapper />;
};

const Channel: React.FunctionComponent<ChannelProps> = ({
  channels,
  directMessages,
  selectedTeamIndex,
  setSelectedTeamIndex,
  setChannelId,
  setChannelInfo,
  channelInfo,
  channelModal,
  setChannelModal,
  teamId,
  teamName,
  username,
  users
}) => {
  if (teamId && teamId !== "isNull") {
    return (
      <ChannelIfTeamIdIsDefined
        channels={channels}
        directMessages={directMessages}
        selectedTeamIndex={selectedTeamIndex}
        setSelectedTeamIndex={setSelectedTeamIndex}
        setChannelId={setChannelId}
        setChannelInfo={setChannelInfo}
        channelInfo={channelInfo}
        channelModal={channelModal}
        setChannelModal={setChannelModal}
        teamId={teamId}
        teamName={teamName}
        username={username}
        users={users}
      />
    );
  } else {
    return <ChannelIfTeamIdIsUndefined />;
  }
};

export default Channel;
