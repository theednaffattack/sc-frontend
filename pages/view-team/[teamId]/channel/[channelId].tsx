import React from "react";

import { NextContext } from "../../../../typings/NextContext";
import redirect from "../../../../lib/redirect";
import { isBrowser } from "../../../../lib/isBrowser";
import {
  getLayout,
  ViewerActionType,
  ViewerStateInterface
} from "../../../../modules/site-layout/grid-layout_v3";
import {
  User,
  MeQueryResult
} from "../../../../modules/gql-gen/generated/apollo-graphql";
import { Messages } from "../../../../modules/grid-pieces/messages";

interface PageProps extends NextContext {
  clonedChannelId: string;
  meData: MeQueryResult["data"];
  teamId: string;
  channelId: string;
  clonedTeamId: string;
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
    clonedChannelId,
    clonedTeamId,
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
  clonedChannelId,
  clonedTeamId,
  meData
}) => {
  if (meData) {
    return (
      <Messages
        teamId={clonedTeamId}
        dataMe={meData.me}
        channelId={clonedChannelId}
      />
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
