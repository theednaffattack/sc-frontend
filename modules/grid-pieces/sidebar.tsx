import { TeamWrapper, UnstyledList } from "modules/primitives/styled-rebass";
import { ModalStates } from "modules/site-layout/grid-layout";
import React from "react";
import { QueryResult } from "react-apollo";
import {
  GetAllTeamsForUserQuery,
  GetAllTeamsForUserQueryVariables,
  useMeQuery
} from "../gql-gen/generated/apollo-graphql";
import {
  ChannelInfoProps,
  ChannelInfoStateUpdate,
  TeamIdStateUpdate
} from "../prepare-to-delete/[channelId]";
import { AddChannelModal } from "./add-channel-modal";
import Channels from "./channels";
import { TeamListItem } from "./teams";


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
  setChannelModal: React.Dispatch<React.SetStateAction<ModalStates>>;
  teamId: string;
  setTeamId: TeamIdStateUpdate;
}



export const Sidebar: React.FC<SidebarProps> = ({
  getAllTeamsForUser,
  selectedTeamIndex,
  setSelectedTeamIndex,
  setChannelId,
  setChannelInfo,
  channelInfo,
  channelModal,
  setChannelModal,
  // teamId: teamIdProp
}) => {
  let username: string = "";
  // const { subscribeToMore } = getAllTeamsForUser;
  const { data: dataMe } = useMeQuery();

  if (dataMe && dataMe.me && dataMe.me.name) {
    username = dataMe.me.name;
  }

  // let fauxTeam: GetAllTeamsPropsType = {
  //   getAllTeamsForUser:[
  //   {
  //     channels: [],
  //     __typename:"Team",
  //     id: "no_team_id",
  //     name: "no_team_name",
  //     userToTeams: [],
  //     members: []
  //   }
  // ]};

  
  let teamName;

  let teamId: string = "isNull";
  let getChannels

  if(selectedTeamIndex && selectedTeamIndex !== -1){
    teamId = getAllTeamsForUser.data?.getAllTeamsForUser[selectedTeamIndex].id ?? "team ID missing";

    teamName = getAllTeamsForUser.data?.getAllTeamsForUser[selectedTeamIndex].name;
    getChannels = getAllTeamsForUser.data?.getAllTeamsForUser[selectedTeamIndex].channels
  }
  
  
  if (selectedTeamIndex === -1) {
    teamName = "select a team";
  }

  const renderTeamList = getAllTeamsForUser.data?.getAllTeamsForUser.map(({id, name})=>{
    return(
      <TeamListItem
      selectedTeamIndex={selectedTeamIndex}
      setChannelId={setChannelId}
      setChannelInfo={setChannelInfo}
      setSelectedTeamIndex={setSelectedTeamIndex}
      id={id}
      name={name}
      letter={name.split("")[0]}
      teamId={teamId} />
    )
  })

  
  return (
    <>

<TeamWrapper>
<UnstyledList p={0} mt={3}>
    {
renderTeamList
    }

</UnstyledList>
</TeamWrapper>
      {/* <Teams
        getAllTeamsForUser={getAllTeamsForUser}
        selectedTeamIndex={selectedTeamIndex}
        setChannelId={setChannelId}
        setChannelInfo={setChannelInfo}
        setSelectedTeamIndex={setSelectedTeamIndex}
        teamId={teamId}
      /> */}
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
