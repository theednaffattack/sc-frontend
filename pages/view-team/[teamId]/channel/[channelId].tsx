import React from "react";

import { NextContext } from "../../../../typings/NextContext";
import GridLayout from "../../../../modules/site-layout/grid-layout";
import redirect from "../../../../lib/redirect";
import { isBrowser } from "../../../../lib/isBrowser";
import { getLayout } from "../../../../modules/site-layout/main-v3";
import {
  useGetAllTeamsForUserQuery,
  useGetAllChannelMembersQuery,
  useLoadChannelsByTeamIdQuery,
  useLoadDirectMessageThreadsByTeamAndUserQuery,
  User
} from "../../../../modules/gql-gen/generated/apollo-graphql";
import { ChannelListItemProps } from "../../../../modules/grid-pieces/channel-list-item";
import { MappedTeamsProps } from "../../../../modules/grid-pieces/team-list-item";
import { RenderChannelPanel } from "../../../../modules/grid-pieces/render-channel-panel";

interface PageProps extends NextContext {
  channelId: string;
  teamId: string;
  channelName: string;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;

  selectedDirectMessageInvitees: ({
    __typename?: "User" | undefined;
  } & Pick<User, "id" | "name">)[];

  setSelectedDirectMessageInvitees: React.Dispatch<
    React.SetStateAction<
      ({
        __typename?: "User" | undefined;
      } & Pick<User, "id" | "name">)[]
    >
  >;
}

interface ViewChannelByIdProps {
  ({
    pathname,
    query,
    referer,
    userAgent,
    channelName,
    setChannelName,
    channelId,
    teamId,
    selectedDirectMessageInvitees,
    setSelectedDirectMessageInvitees
  }: PageProps): JSX.Element;

  getInitialProps: ({
    pathname,
    query,
    referer,
    userAgent
  }: NextContext) => Promise<{
    pathname: NextContext["pathname"];
    query: NextContext["query"];
    referer: NextContext["referer"];
    userAgent: NextContext["userAgent"];
    channelId: string;
    teamId: string;
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
  displayName: string;
}

const ViewChannelById: ViewChannelByIdProps = ({
  channelName,
  setChannelName,
  teamId,
  channelId,

  selectedDirectMessageInvitees,
  setSelectedDirectMessageInvitees
}) => {
  let mappedTeams: MappedTeamsProps[];
  let mappedChannels: ChannelListItemProps[];
  // @ts-ignore
  let mappedChannelMembers;

  // GET ALL TEAMS
  let { data: dataUseGetAllTeamsForUserQuery } = useGetAllTeamsForUserQuery();

  // GET ALL CHANNELS (NAMES, ID'S, ETC)
  let {
    data: dataUseLoadChannelsByTeamIdQuery,
    error: errorUseLoadChannelsByTeamIdQuery,
    loading: loadingUseLoadChannelsByTeamIdQuery,
    ...theRestUseLoadChannelsByTeamIdQuery
  } = useLoadChannelsByTeamIdQuery({
    variables: {
      teamId
    }
  });

  let {
    data: dataLoadDirectMessageThreadsByTeamAndUserQuery
  } = useLoadDirectMessageThreadsByTeamAndUserQuery({ variables: { teamId } });

  // GET ALL CHANNEL MEMBERS (WORTHLESS HERE???)
  let {
    data: dataUseGetAllChannelMembersQuery
  } = useGetAllChannelMembersQuery({ variables: { channelId: channelId } });

  if (
    dataUseGetAllTeamsForUserQuery &&
    dataUseGetAllTeamsForUserQuery.getAllTeamsForUser
  ) {
    mappedTeams = dataUseGetAllTeamsForUserQuery.getAllTeamsForUser.map(
      team => {
        let returnTeamObj = {
          ...team,
          highlight: team.id === teamId
        };
        return returnTeamObj;
      }
    );
  } else {
    mappedTeams = [
      {
        highlight: false,
        id: "no_team_id",
        name: "fake_name",
        channels: [
          {
            invitees: [{ name: "invitee_name", id: "id_invitee" }],
            name: "faux_TEAM_channels_name"
          }
        ]
      }
    ];
  }

  if (
    dataUseLoadChannelsByTeamIdQuery &&
    dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId
  ) {
    mappedChannels = dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId.map(
      channel => {
        let highlight = channel.id === channelId;

        let channelObj = {
          ...channel,
          teamId: teamId,
          highlight,
          setChannelName,
          setOnClickValue: channel.name
        };
        return channelObj;
      }
    );
  } else {
    mappedChannels = [1, 2, 3].map((item: number) => {
      return {
        id: `fake_channel_id-${item}`,
        name: "not a real name",
        teamId: "fake_team_id",
        highlight: true,
        invitees: [{}],
        setChannelName,
        setOnClickValue: "not a real name",
        __typename: "Channel"
      };
    });
  }

  if (
    dataUseGetAllChannelMembersQuery &&
    dataUseGetAllChannelMembersQuery.getAllChannelMembers
  ) {
    mappedChannelMembers = dataUseGetAllChannelMembersQuery.getAllChannelMembers.map(
      channelMember => {
        let returnChannelMemberObj = {
          ...channelMember,
          highlight: false
        };
        return returnChannelMemberObj;
      }
    );
  } else {
    mappedChannelMembers = [1, 2, 3].map(item => {
      return {
        id: `fake-user-id-${item}`,
        name: "fake user name"
      };
    });
  }

  // dataLoadDirectMessageThreadsByTeamAndUserQuery;

  if (mappedTeams) {
    return (
      <GridLayout>
        {{
          directMessageThreads: dataLoadDirectMessageThreadsByTeamAndUserQuery,
          teamId,
          mappedTeams,
          mappedChannels,
          channelId,
          channelName,

          renderChannelPanel: (
            <RenderChannelPanel
              data={dataUseLoadChannelsByTeamIdQuery} // errorUseLoadChannelsByTeamIdQuery
              error={errorUseLoadChannelsByTeamIdQuery}
              loading={loadingUseLoadChannelsByTeamIdQuery}
              channelId={channelId}
              setChannelName={setChannelName}
              setOnClickValue=""
              teamId={teamId}
              {...theRestUseLoadChannelsByTeamIdQuery}
            />
          ),
          setChannelName,

          selectedTeamName: mappedTeams[0].name,
          selectedDirectMessageInvitees,
          setSelectedDirectMessageInvitees
        }}
      </GridLayout>
    );
  }
  return <div>LOOKS EMPTY???</div>;
};

ViewChannelById.getInitialProps = async ctx => {
  let { pathname, query, referer, userAgent } = ctx;

  const { channelId: channelIdBase, teamId: teamIdBase } = query;

  const channelId =
    typeof channelIdBase === "string" ? channelIdBase : channelIdBase[0];
  const teamId = typeof teamIdBase === "string" ? teamIdBase : teamIdBase[0];

  if (!ctx.token && !isBrowser) {
    console.log("SSR redirect");
    redirect(ctx, "/login", {
      asPath: "/login"
    });
  }

  return {
    pathname,
    query,
    referer,
    userAgent,
    channelId,
    teamId
  };
};

ViewChannelById.getLayout = getLayout;

ViewChannelById.title = "View Channel";
ViewChannelById.displayName = "ViewChannelById";

export default ViewChannelById;
