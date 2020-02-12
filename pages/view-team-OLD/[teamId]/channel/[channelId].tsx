import React, { useEffect } from "react";

import { NextContext } from "../../../../typings/NextContext";
import redirect from "../../../../lib/redirect";
import { isBrowser } from "../../../../lib/isBrowser";
import {
  getLayout,
  ViewerActionType,
  ViewerStateInterface
} from "../../../../modules/site-layout/grid-layout_v2";
import {
  User,
  MeQueryResult
} from "../../../../modules/gql-gen/generated/apollo-graphql";
import { Messages } from "../../../../modules/grid-pieces/messages";

interface PageProps extends NextContext {
  channelId: string;
  meData: MeQueryResult["data"];
  teamId: string;
  channelName: string;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
  viewerDispatch: React.Dispatch<ViewerActionType>;
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

interface ClonedFromGridLayoutProps {
  viewerState: ViewerStateInterface;
}

interface ViewChannelByIdProps {
  ({
    pathname,
    meData,
    query,
    referer,
    userAgent,
    channelName,
    setChannelName,
    channelId,
    teamId,
    selectedDirectMessageInvitees,
    setSelectedDirectMessageInvitees,
    viewerDispatch,
    viewerState
  }: PageProps & ClonedFromGridLayoutProps): JSX.Element;

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
  channelId,
  meData,
  teamId,
  viewerDispatch,
  viewerState
}) => {
  // useLoadChannelsByTeamIdLazyQuery({
  //   variables: {
  //     teamId: viewerState.teamIdShowing
  //   }
  // })
  // const { data, loading } = useLoadChannelsByTeamIdQuery({
  //   variables: {
  //     teamId
  //   }
  // });
  // console.log("VIEW LOAD CHANNEL BY TEAM ID QUERY ", { data, loading });
  useEffect(() => {
    // if the TEAM ID needs to be updated dispatch changes
    if (channelId && teamId !== viewerState.teamIdShowing) {
      viewerDispatch({
        type: "updateViewerModeAndHeaderInfo",
        mode: "channel",
        data: channelId
      });
      viewerDispatch({
        type: "updateTeamId",
        data: teamId
      });
    }

    // if the CHANNEL ID needs to be updated dispatch changes
    // and we're switching channel to channel
    if (
      viewerState.teamIdShowing === teamId &&
      viewerState.idShowing &&
      viewerState.viewerMode === "channel" &&
      channelId
    ) {
      viewerDispatch({
        type: "updateViewerModeAndHeaderInfo",
        mode: viewerState.viewerMode,
        data: channelId
      });
      viewerDispatch({
        type: "updateTeamId",
        data: viewerState.teamIdShowing
      });
    }

    // if the CHANNEL ID needs to be updated dispatch changes
    // and we're coming from other routes
    if (
      viewerState.teamIdShowing === teamId &&
      viewerState.idShowing &&
      viewerState.viewerMode &&
      viewerState.viewerMode !== "channel" &&
      channelId
    ) {
      viewerDispatch({
        type: "updateViewerModeAndHeaderInfo",
        mode: viewerState.viewerMode,
        data: channelId
      });
      viewerDispatch({
        type: "updateTeamId",
        data: viewerState.teamIdShowing
      });
    }
  }, [channelId, teamId, viewerState.teamIdShowing]);

  if (meData) {
    return <Messages dataMe={meData.me} channelId={channelId} />;
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
