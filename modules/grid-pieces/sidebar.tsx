import React from "react";
import { QueryResult } from "react-apollo";

import Channels from "./channels";
import Teams from "./teams";
import {
  GetAllTeamsForUserQuery,
  GetAllTeamsForUserQueryVariables,
  useMeQuery
  // useGetAllTeamsForUserQuery
} from "../gql-gen/generated/apollo-graphql";
import { AddChannelModal } from "./add-channel-modal";
import {
  ChannelInfoProps,
  ChannelInfoStateUpdate,
  TeamIdStateUpdate
} from "../prepare-to-delete/[channelId]";

export interface ViewTeamProps {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

export interface FakeListItemProps {
  id: string;
  name: string;
}

export interface FakeTeamItemProps {
  id: string;
  letter: string;
}

export interface FakeDirectMessageItemProps {
  id: string;
  username: string;
  online_status: string;
}

// const FakeChannels: FakeListItemProps[] = [
//   {
//     id: "1",
//     name: "random"
//   },
//   {
//     id: "2",
//     name: "general"
//   },
//   {
//     id: "3",
//     name: "channel three"
//   }
// ];

const FakeUsers: FakeListItemProps[] = [
  {
    id: "1",
    name: "user one"
  },
  {
    id: "2",
    name: "user two"
  },
  {
    id: "3",
    name: "user three"
  }
];

// const FakeTeams: FakeTeamItemProps[] = [
//   { id: "1", letter: "F" },
//   { id: "2", letter: "E" }
// ];

const FakeDirectMessages: FakeDirectMessageItemProps[] = [
  { id: "1", username: "slackbot", online_status: "online" },
  { id: "2", username: "user1", online_status: "offline" }
];

interface SidebarProps {
  getAllTeamsForUser: QueryResult<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >;
  selectedTeamIndex: number;
  setSelectedTeamIndex: React.Dispatch<React.SetStateAction<number>>;
  setChannelId: React.Dispatch<React.SetStateAction<string>>;
  setChannelInfo: ChannelInfoStateUpdate;
  channelInfo: ChannelInfoProps;
  channelModal: string;
  setChannelModal: React.Dispatch<React.SetStateAction<string>>;
  teamId: string;
  setTeamId: TeamIdStateUpdate;
}

type GetAllTeamsPropsType = GetAllTeamsForUserQuery["getAllTeamsForUser"];

export const Sidebar: React.FC<SidebarProps> = ({
  getAllTeamsForUser,
  selectedTeamIndex,
  setSelectedTeamIndex,
  setChannelId,
  setChannelInfo,
  channelInfo,
  channelModal,
  setChannelModal,
  teamId: teamIdProp
}) => {
  let username: string = "";
  // const { subscribeToMore } = getAllTeamsForUser;
  const { data: dataMe } = useMeQuery();

  if (dataMe && dataMe.me && dataMe.me.name) {
    username = dataMe.me.name;
  }

  let fauxTeam: GetAllTeamsPropsType = [
    {
      id: "no_team_id",
      name: "no_team_name",
      channels: []
    }
  ];

  // const { data } = getAllTeamsForUser;

  // const userTeamsToMap = data ? data.getAllTeamsForUser : [fauxTeam];

  const userTeamsToMap = getAllTeamsForUser.data?.getAllTeamsForUser ?? [
    fauxTeam
  ];

  console.log("userTeamsToMap".toUpperCase(), userTeamsToMap);

  let teamName;

  let teamId = teamIdProp
    ? teamIdProp
    : userTeamsToMap && selectedTeamIndex !== -1
    ? userTeamsToMap[selectedTeamIndex].id
    : "isNull";

  if (userTeamsToMap && selectedTeamIndex !== -1) {
    teamName = userTeamsToMap[selectedTeamIndex].name;
  }

  if (selectedTeamIndex === -1) {
    teamName = "select a team";
  }

  let getChannels =
    userTeamsToMap &&
    userTeamsToMap[0] &&
    userTeamsToMap[0].id !== "no_team_id" &&
    userTeamsToMap[0].channels &&
    selectedTeamIndex !== -1 &&
    userTeamsToMap[selectedTeamIndex] &&
    userTeamsToMap[selectedTeamIndex].channels
      ? userTeamsToMap[selectedTeamIndex].channels
      : [noChannel];

  return (
    <>
      <Teams
        getAllTeamsForUser={getAllTeamsForUser}
        selectedTeamIndex={selectedTeamIndex}
        setChannelId={setChannelId}
        setChannelInfo={setChannelInfo}
        setSelectedTeamIndex={setSelectedTeamIndex}
        teamId={teamId}
      />
      <Channels
        channels={getChannels}
        setChannelId={setChannelId}
        setChannelInfo={setChannelInfo}
        channelInfo={channelInfo}
        directMessages={FakeDirectMessages}
        // getAllTeamsForUser={getAllTeamsForUser}
        selectedTeamIndex={selectedTeamIndex}
        setSelectedTeamIndex={setSelectedTeamIndex}
        teamId={teamId}
        teamName={teamName}
        users={FakeUsers}
        username={username}
        channelModal={channelModal}
        setChannelModal={setChannelModal}
      />
      {teamId && teamId !== "isNull" && selectedTeamIndex !== -1 ? (
        <AddChannelModal
          teamId={teamId}
          channelModal={channelModal}
          setChannelModal={setChannelModal}
        />
      ) : (
        ""
      )}
    </>
  );
};
