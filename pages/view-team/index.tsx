import React from "react";

import { getLayout } from "../../modules/site-layout/grid-layout_v3";
import { NextContext } from "../../typings/NextContext";
import { isBrowser } from "../../lib/isBrowser";
import redirect from "../../lib/redirect";
import { Messages as ChannelMessages } from "../../modules/grid-pieces/messages";
import {
  User,
  MeQueryResult
} from "../../modules/gql-gen/generated/apollo-graphql";

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
  clonedChannelId: string;

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
    clonedChannelId
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

const ViewTeamIndex: ViewTeamIndexProps = ({ clonedChannelId, meData }) => {
  if (meData && meData.me) {
    return <ChannelMessages dataMe={meData.me} channelId={clonedChannelId} />;
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

  return {
    pathname,
    query,
    referer,
    userAgent
  };
};

ViewTeamIndex.displayName = "ViewTeamIndex";
ViewTeamIndex.getLayout = getLayout;
ViewTeamIndex.title = "View Team";

export default ViewTeamIndex;
