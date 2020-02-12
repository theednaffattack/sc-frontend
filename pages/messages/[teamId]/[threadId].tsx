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
import { DirectMessages } from "../../../modules/grid-pieces/direct-messages/direct-message-messages";

interface PageProps extends NextContext {
  teamId: string;
  threadId: string;
  clonedThreadId: string;
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
    threadId,
    clonedThreadId,
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
    threadId: string;
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
  displayName: string;
}

const ViewTeamById: ViewTeamByIdProps = ({
  meData,
  clonedThreadId,
  // viewerDispatch,
  viewerState,
  threadId
  // teamId
  // channelName,
  // setChannelName,
  // teamId,
  // selectedDirectMessageInvitees,
  // setSelectedDirectMessageInvitees
}) => {
  if (meData && clonedThreadId) {
    return <DirectMessages dataMe={meData.me} threadId={clonedThreadId} />;
  }
  return (
    <div>
      LOOKS EMPTY??? {JSON.stringify({ viewerState, threadId }, null, 2)}
    </div>
  );
};

ViewTeamById.getInitialProps = async ctx => {
  let { pathname, query, referer, userAgent } = ctx;

  const { teamId: teamIdBase, threadId: threadIdBase } = query;

  const teamId = typeof teamIdBase === "string" ? teamIdBase : teamIdBase[0];
  const threadId =
    typeof threadIdBase === "string" ? threadIdBase : threadIdBase[0];

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
    teamId,
    threadId
  };
};

ViewTeamById.getLayout = getLayout;

ViewTeamById.title = "View Team";
ViewTeamById.displayName = "View Team by teamId";

export default ViewTeamById;
