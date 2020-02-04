import React from "react";
// import { Field, Formik } from "formik";

import { NextContext } from "../../../typings/NextContext";
import GridLayout from "../../../modules/site-layout/grid-layout";
import { getLayout } from "../../../modules/site-layout/main-v3";

import redirect from "../../../lib/redirect";
import { isBrowser } from "../../../lib/isBrowser";

import {
  useGetAllTeamsForUserQuery,
  // useGetAllChannelMembersQuery,
  useLoadDirectMessagesThreadByIdQuery,
  useLoadChannelsByTeamIdQuery,
  User
} from "../../../modules/gql-gen/generated/apollo-graphql";
import {
  // MessageListItem,
  MessageListItemProps
} from "../../../modules/grid-pieces/message-list-item";
import { MappedTeamsProps } from "../../../modules/grid-pieces/team-list-item";
import { ChannelListItemProps } from "../../../modules/grid-pieces/channel-list-item";
import { RenderChannelPanel } from "../../../modules/grid-pieces/render-channel-panel";

interface PageProps extends NextContext {
  messageId: string;
  threadId: string;
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

interface ViewMessagesByThreadIdProps {
  ({
    pathname,
    query,
    referer,
    userAgent,
    // setMessageName,

    selectedDirectMessageInvitees,
    setSelectedDirectMessageInvitees,
    messageId,
    teamId,
    threadId
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
    messageId?: string;
    teamId: string;
    threadId: string;
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
  displayName: string;
}

const ViewDirectMessageThreadById: ViewMessagesByThreadIdProps = ({
  channelName,
  messageId,
  setChannelName,
  selectedDirectMessageInvitees,
  setSelectedDirectMessageInvitees,
  teamId,
  threadId
}) => {
  let mappedTeams: MappedTeamsProps[];
  let mappedMessages: MessageListItemProps[];
  let mappedChannels: ChannelListItemProps[];

  // GET ALL TEAMS
  let {
    data: dataUseGetAllTeamsForUserQuery
    // error: errorUseGetAllTeamsForUserQuery,
    // loading: loadingUseGetAllTeamsForUserQuery
  } = useGetAllTeamsForUserQuery();

  // GET ALL CHANNELS
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

  // GET ALL DIRECT MESSAGES
  let {
    data: dataUseLoadDirectMessagesThreadByIdQuery
    // error: errorUseLoadMessagesByTeamIdQuery,
    // loading: loadingUseLoadMessagesByTeamIdQuery
  } = useLoadDirectMessagesThreadByIdQuery({
    variables: {
      threadId
    }
  });

  // MAP TEAMS
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

  // MAP CHANNELS
  if (
    dataUseLoadChannelsByTeamIdQuery &&
    dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId
  ) {
    mappedChannels = dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId.map(
      channel => {
        let highlight = false;

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

  // MAP DIRECT MESSAGES
  if (
    dataUseLoadDirectMessagesThreadByIdQuery &&
    dataUseLoadDirectMessagesThreadByIdQuery.loadDirectMessagesThreadById &&
    dataUseLoadDirectMessagesThreadByIdQuery.loadDirectMessagesThreadById
      .messages
  ) {
    mappedMessages = dataUseLoadDirectMessagesThreadByIdQuery.loadDirectMessagesThreadById.messages.map(
      message => {
        return {
          dataMeId: "",
          fromMe: "isLoggedInUser",
          id: message?.id ?? "id",
          message: message?.message ?? "message",
          sentBy: { id: "what", name: "" },

          selectedDirectMessageInvitees,
          setSelectedDirectMessageInvitees
        };
      }
    );
  } else {
    mappedMessages = [1, 2, 3].map((item: number) => {
      return {
        id: `fake_channel_id-${item}`,
        name: "not a real name",
        teamId: "fake_team_id",
        highlight: true,
        invitees: [{}],
        setMessageName: () => console.log("what"),
        setOnClickValue: "not a real name",
        __typename: "Message",
        fromMe: "isLoggedInUser",
        dataMeId: "",
        message: "",
        sentBy: { id: "", name: "" }
      };
    });
  }

  if (mappedTeams && mappedMessages) {
    return (
      <GridLayout>
        {{
          teamId,
          mappedChannels,
          mappedTeams,
          mappedMessages,
          messageId,
          threadId,
          channelName,

          renderChannelPanel: (
            <RenderChannelPanel
              channelId={undefined}
              data={dataUseLoadChannelsByTeamIdQuery}
              error={errorUseLoadChannelsByTeamIdQuery}
              loading={loadingUseLoadChannelsByTeamIdQuery}
              setChannelName={setChannelName}
              setOnClickValue=""
              teamId={teamId}
              {...theRestUseLoadChannelsByTeamIdQuery}
            />
          ),
          selectedTeamName: mappedTeams[0].name,
          setChannelName,
          selectedDirectMessageInvitees,
          setSelectedDirectMessageInvitees
        }}
      </GridLayout>
    );
  }
  return <div>LOOKS EMPTY???</div>;
};

ViewDirectMessageThreadById.getInitialProps = async ctx => {
  let { pathname, query, referer, userAgent } = ctx;

  const { threadId: threadIdBase, teamId: teamIdBase } = query;

  const threadId =
    typeof threadIdBase === "string" ? threadIdBase : threadIdBase[0];

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
    threadId,
    teamId
  };
};

ViewDirectMessageThreadById.getLayout = getLayout;

ViewDirectMessageThreadById.title = "Direct Message";
ViewDirectMessageThreadById.displayName = "ViewDirectMessageThreadById";

export default ViewDirectMessageThreadById;
