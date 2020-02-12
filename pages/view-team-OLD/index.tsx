// import Router from "next/router";
import React from "react";

// import GridLayout from "../../modules/site-layout/grid-layout";
// import { getLayout } from "../../modules/site-layout/main-v3";
import { getLayout } from "../../modules/site-layout/grid-layout_v2";

import { NextContext } from "../../typings/NextContext";
import { isBrowser } from "../../lib/isBrowser";
import redirect from "../../lib/redirect";

// import { DirectMessages } from "../grid-pieces/direct-messages/direct-message-messages";
import { Messages as ChannelMessages } from "../../modules/grid-pieces/messages";
import {
  useGetAllTeamsForUserQuery,
  User,
  MeQueryResult
  // useLoadChannelsByTeamIdLazyQuery
} from "../../modules/gql-gen/generated/apollo-graphql";
// import { MappedTeamsProps } from "../../modules/grid-pieces/team-list-item";
// import { ChannelListItemProps } from "../../modules/grid-pieces/channel-list-item";
// @ts-ignore
import { RenderChannelPanel } from "../../modules/grid-pieces/render-channel-panel";
// @ts-ignore
import { RenderTeamPanel } from "../../modules/grid-pieces/render-team-panel";

type UsernameWithNextContext = {
  setAuthState?: React.Dispatch<React.SetStateAction<boolean>>;
  authState: boolean;
  hocLoginState: boolean;
  hocLogin: any;
  hocLogout: any;
} & NextContext;

interface PageProps extends NextContext {
  channelName: string;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;

  meData: MeQueryResult["data"];
  channelId: string;

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

interface ViewTeamIndexProps {
  ({
    pathname,
    query,
    referer,
    userAgent,
    meData,
    channelId
  }: PageProps): JSX.Element;

  getInitialProps: ({
    pathname,
    query,
    referer,
    userAgent
  }: UsernameWithNextContext) => Promise<{
    pathname: NextContext["pathname"];
    query: NextContext["query"];
    referer: NextContext["referer"];
    userAgent: NextContext["userAgent"];
    // username: UsernameWithNextContext["setAuthState"];
  }>;

  displayName: string;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const ViewTeamIndex: ViewTeamIndexProps = ({
  channelId,
  meData
  // channelName,
  // setChannelName,
  // selectedDirectMessageInvitees,
  // setSelectedDirectMessageInvitees
}) => {
  // console.log("JUST TO REMOVE TS ERRORS I USE THESE HERE", {
  //   channelName,
  //   setChannelName,
  //   selectedDirectMessageInvitees,
  //   setSelectedDirectMessageInvitees
  // });
  let {
    data: dataGetAllTeamsForUserQuery,
    error: errorGetAllTeamsForUserQuery,
    loading: loadingGetAllTeamsForUserQuery,
    // @ts-ignore
    ...theRestGetAllTeamsForUserQuery
  } = useGetAllTeamsForUserQuery();

  // let {
  //   data: dataLoadDirectMessagesThreadByIdQuery,
  //   error: errorLoadDirectMessagesThreadByIdQuery,
  //   loading: loadingLoadDirectMessagesThreadByIdQuery
  // } = useLoadDirectMessagesThreadByIdQuery();

  // // GET ALL CHANNELS (NAMES, ID'S, ETC)
  // let [
  //   loadChannelsByTeamIdLazyQuery,
  //   {
  //     data: dataUseLoadChannelsByTeamIdQuery,
  //     error: errorUseLoadChannelsByTeamIdQuery,
  //     loading: loadingUseLoadChannelsByTeamIdQuery,
  //     // @ts-ignore
  //     ...theRestUseLoadChannelsByTeamIdQuery
  //   }
  // ] = useLoadChannelsByTeamIdLazyQuery();

  // // FETCH ALL DIRECT MESSAGES
  // let [
  //   loadDirectMessagesByTeamAndUser,
  //   {
  //     data: dataLoadDirectMessageThreadsByTeamAndUserQuery,
  //     error: errorLoadDirectMessageThreadsByTeamAndUserQuery,
  //     loading: loadingLoadDirectMessageThreadsByTeamAndUserQuery
  //   }
  // ] = useLoadDirectMessageThreadsByTeamAndUserLazyQuery();

  // useEffect(() => {
  //   if (dataGetAllTeamsForUserQuery) {
  //     loadChannelsByTeamIdLazyQuery({
  //       variables: {
  //         teamId: dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
  //       }
  //     });

  //     // loadDirectMessagesByTeamAndUser({
  //     //   variables: {
  //     //     teamId: dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
  //     //   }
  //     // });
  //   }
  // }, [dataGetAllTeamsForUserQuery]);

  // @ts-ignore
  // let mappedTeams: MappedTeamsProps[];
  // // let mappedMessages: MessageListItemProps[];
  // // @ts-ignore
  // let mappedChannels: ChannelListItemProps[];

  // let fakeMappedTeams: MappedTeamsProps[] = [
  //   {
  //     highlight: false,
  //     id: "no_team_id",
  //     name: "fake_name",
  //     channels: [
  //       {
  //         invitees: [{ name: "invitee_name", id: "id_invitee" }],
  //         name: "faux_TEAM_channels_name"
  //       }
  //     ]
  //   }
  // ];

  // let fakeMappedChannels: ChannelListItemProps[] = [
  //   {
  //     name: "",
  //     teamId: "no_team_id",
  //     highlight: false,
  //     invitees: [],
  //     setChannelName,
  //     setOnClickValue: ""
  //   }
  // ];

  // // MAP TEAMS
  // if (
  //   dataGetAllTeamsForUserQuery &&
  //   dataGetAllTeamsForUserQuery.getAllTeamsForUser
  // ) {
  //   mappedTeams = dataGetAllTeamsForUserQuery.getAllTeamsForUser.map(team => {
  //     let returnObj: MappedTeamsProps = {
  //       channels: team.channels,
  //       highlight: false,
  //       id: team.id,
  //       name: team.name,
  //       __typename: team.__typename
  //     };

  //     return returnObj;
  //   });
  // } else {
  //   mappedTeams = fakeMappedTeams;
  // }

  // // MAP CHANNELS
  // if (
  //   dataGetAllTeamsForUserQuery &&
  //   dataUseLoadChannelsByTeamIdQuery &&
  //   dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId
  // ) {
  //   mappedChannels = dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId.map(
  //     channel => {
  //       let highlight = false;

  //       let channelObj = {
  //         ...channel,
  //         teamId: dataGetAllTeamsForUserQuery
  //           ? dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
  //           : "",
  //         highlight,
  //         setChannelName,
  //         setOnClickValue: channel.name
  //       };
  //       return channelObj;
  //     }
  //   );
  // } else {
  //   mappedChannels = fakeMappedChannels;
  // }

  // MAPPED DIRECT MESSAGES

  //   // MAP DIRECT MESSAGES
  //   if (
  //     dataLoadDirectMessageThreadsByTeamAndUserQuery &&
  //     dataLoadDirectMessageThreadsByTeamAndUserQuery.loadDirectMessageThreadsByTeamAndUser
  //     // errorLoadDirectMessageThreadsByTeamAndUserQuery,
  //     // loadingLoadDirectMessageThreadsByTeamAndUserQuery
  //     //
  //     // dataUseLoadDirectMessagesThreadByIdQuery &&
  //     // dataUseLoadDirectMessagesThreadByIdQuery.loadDirectMessagesThreadById &&
  //     // dataUseLoadDirectMessagesThreadByIdQuery.loadDirectMessagesThreadById
  //     // .messages
  //   ) {
  //     mappedMessages = dataLoadDirectMessageThreadsByTeamAndUserQuery.loadDirectMessageThreadsByTeamAndUser.map(
  //       message => {
  //         const returnObj: MessageListItemProps = {
  // dataMeId,
  // fromMe,
  // id,
  // messagg
  //         }
  //         return returnObj;
  //         // {
  //         //   dataMeId: "",
  //         //   fromMe: "isLoggedInUser",
  //         //   id: message?.id ?? "message-id",
  //         //   messages:
  //         //   message: message?.message ?? "message",
  //         //   sentBy: { id: "what", name: "" },

  //         //   selectedDirectMessageInvitees,
  //         //   setSelectedDirectMessageInvitees
  //         // };
  //       }
  //     );
  //   } else {
  //     mappedMessages = Array.from({ length: 5 }).map((_, index) => {
  //       return {
  //         id: `fake_channel_id-${index}`,
  //         name: "not a real name",
  //         teamId: "fake_team_id",
  //         highlight: true,
  //         invitees: [{}],
  //         setMessageName: () => console.log("what"),
  //         setOnClickValue: "not a real name",
  //         __typename: "Message",
  //         fromMe: "isLoggedInUser",
  //         dataMeId: "",
  //         message: "",
  //         sentBy: { id: "", name: "" }
  //       };
  //     });
  //   }
  if (meData && meData.me) {
    return <ChannelMessages dataMe={meData.me} channelId={channelId} />;
  }
  return <div>huh?</div>;
};

ViewTeamIndex.getInitialProps = async ctx => {
  let { pathname, query, referer, userAgent } = ctx;

  if (!ctx.token && !isBrowser) {
    console.log("SSR redirect");
    redirect(ctx, "/login", {
      asPath: "/login"
    });
  }

  // let readyUsername: string | undefined;
  // readyUsername =
  //   query && query.username
  //     ? Array.isArray(query.username)
  //       ? query.username[0]
  //       : query.username
  //     : undefined;

  return {
    pathname,
    query,
    referer,
    userAgent
    // username: readyUsername
  };
};

ViewTeamIndex.displayName = "ViewTeamIndex";
ViewTeamIndex.getLayout = getLayout;
ViewTeamIndex.title = "View Team";

export default ViewTeamIndex;
