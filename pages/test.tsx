// import Router from "next/router";
import { Button, Flex, Text } from "../modules/primitives/styled-rebass";
import { NextContext } from "../typings/NextContext";
import { isBrowser } from "../lib/isBrowser";
import redirect from "../lib/redirect";
import { MeComponent } from "../modules/gql-gen/generated/apollo-graphql";

type UsernameWithNextContext = {
  setAuthState?: React.Dispatch<React.SetStateAction<boolean>>;
  authState: boolean;
  hocLoginState: boolean;
  hocLogin: any;
  hocLogout: any;
  channelName: any;
  setChannelName: any;
} & NextContext;

interface ProfileProps {
  ({
    pathname,
    query,
    referer,
    userAgent,
    authState,
    setAuthState,
    hocLoginState,
    hocLogin,
    hocLogout,
    channelName,
    setChannelName
  }: UsernameWithNextContext): JSX.Element;

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

  // getLayout: (page: any) => JSX.Element;

  title: string;
}

const Test: ProfileProps = ({
  channelName,
  setChannelName,
  token,
  hocLoginState
}) => {
  let authCheck = token || hocLoginState;
  const breakWidths = [1, 1, "690px", "690px"];
  const pxWidths = [4, 4, 4, 4];

  if (!authCheck) {
    console.log("authCheck", authCheck);
    console.log("authCheck", { token, hocLoginState });
    // Router.push("/login", "/login");
  }
  return (
    <MeComponent>
      {({ data: dataMe, error: errorMe, loading: loadingMe }) => {
        if (errorMe) {
          return <div>Error Me, {JSON.stringify(errorMe, null, 2)}</div>;
        }
        if (loadingMe) {
          return <div>loading...</div>;
        }
        if (dataMe) {
          return (
            <Flex
              flexDirection="column"
              width={breakWidths}
              alignItems="center"
              justifyContent="center"
              px={pxWidths}
            >
              {dataMe.me ? <Text>{dataMe.me.name}</Text> : <Text>No data</Text>}
              <Button type="button" onClick={() => setChannelName("changed")}>
                click me to update channelName
              </Button>
            </Flex>
          );
        } else {
          return <div>Error this state should not be possible</div>;
        }
      }}
    </MeComponent>
  );
};

Test.getInitialProps = async ctx => {
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

// Test.getLayout = getLayout;
Test.title = "Test";

export default Test;
