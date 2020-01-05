// import Router from "next/router";
import { Flex, Image } from "../../modules/primitives/styled-rebass";
import { getLayout } from "../../modules/site-layout/main-v2";
import { NextContext } from "../../typings/NextContext";
import { isBrowser } from "../../lib/isBrowser";
import redirect from "../../lib/redirect";
import Accordion from "../../modules/profile/accordion";
import { MeComponent } from "../../modules/gql-gen/generated/apollo-graphql";
import AvatarPlaceholder from "../../modules/profile/avatar-placeholder";

type UsernameWithNextContext = {
  setAuthState?: React.Dispatch<React.SetStateAction<boolean>>;
  authState: boolean;
  hocLoginState: boolean;
  hocLogin: any;
  hocLogout: any;
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
    hocLogout
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

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Profile: ProfileProps = ({ token, hocLoginState }) => {
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
              {dataMe.me && dataMe.me.profileImageUri ? (
                <Image
                  src={dataMe.me.profileImageUri}
                  width="10rem"
                  sx={{ borderRadius: "50%" }}
                />
              ) : (
                <AvatarPlaceholder size="10rem" />
              )}
              <Accordion dataMe={dataMe} />
            </Flex>
          );
        } else {
          return <div>Error this state should not be possible</div>;
        }
      }}
    </MeComponent>
  );
};

Profile.getInitialProps = async ctx => {
  let { pathname, query, referer, userAgent } = ctx;

  if (!ctx.token && !isBrowser) {
    console.log("SSR redirect");
    redirect(ctx, "/login", { asPath: "/login", originalTarget: referer });
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

Profile.getLayout = getLayout;
Profile.title = "Profile";

export default Profile;
