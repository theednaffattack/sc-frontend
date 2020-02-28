import React from "react";

import { NextContext } from "../../../typings/NextContext";
import { getLayout } from "../../../modules/site-layout/grid-layout_v3";
import redirect from "../../../lib/redirect";
import { isBrowser } from "../../../lib/isBrowser";
import {
  User,
  MeQuery
} from "../../../modules/gql-gen/generated/apollo-graphql";
import {
  ViewerActionType,
  ViewerStateInterface
} from "../../../modules/site-layout/grid-layout_v3";
import { Messages } from "../../../modules/grid-pieces/messages";

interface PageProps extends NextContext {
  teamId: string;
  clonedChannelId: string;
  channelName: string;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
  meData: MeQuery;
  viewerDispatch: React.Dispatch<ViewerActionType>;
  viewerState: ViewerStateInterface;
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

interface ViewTeamByIdProps {
  ({
    pathname,
    query,
    referer,
    userAgent,
    channelName,
    setChannelName,
    teamId,
    clonedChannelId,
    // clonedTeamId,
    viewerDispatch,
    viewerState,
    meData
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
    teamId: string;
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
  displayName: string;
}

const ViewTeamById: ViewTeamByIdProps = ({
  meData,
  clonedChannelId,
  teamId
}) => {
  if (meData && meData.me && clonedChannelId !== "channelIdUndefined") {
    return (
      <Messages
        dataMe={meData.me}
        channelId={clonedChannelId}
        teamId={teamId}
      />
    );
  }

  return <div>LOOKS EMPTY???</div>;
};

ViewTeamById.getInitialProps = async ctx => {
  let { pathname, query, referer, userAgent } = ctx;

  const { teamId: teamIdBase } = query;

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
    teamId
  };
};

ViewTeamById.getLayout = getLayout;

ViewTeamById.title = "View Team";
ViewTeamById.displayName = "View Team by teamId";

export default ViewTeamById;
