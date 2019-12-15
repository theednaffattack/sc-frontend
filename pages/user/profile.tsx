import { Flex } from "../../modules/primitives/styled-rebass";
import { getLayout } from "../../modules/site-layout/main-v2";
import { NextContext } from "../../typings/NextContext";
import { isBrowser } from "../../lib/isBrowser";

// type TokenWithNextContext = { token: string } & NextContext;

interface ProfileProps {
  ({ pathname, query, referer, userAgent }: NextContext): JSX.Element;

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
    // userId: TokenWithNextContext["apolloClient"]
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Profile: ProfileProps = () => {
  return (
    <Flex
      flexDirection="column"
      width={[1]}
      alignItems="center"
      justifyContent="center"
    >
      PROFILE
      {isBrowser ? window.navigator.userAgent : ""}
      {isBrowser ? window.navigator.userAgent : ""}
    </Flex>
  );
};

Profile.getInitialProps = async ({ pathname, query, referer, userAgent }) => {
  console.log("WHAT IS NEXT USER AGENT?", userAgent);
  console.log("WHAT IS NEXT REFERER?", referer);

  // if (query && query.token && query.token.constructor === Array) {
  //   const { token } = query;
  //   return { pathname, query, token: token[0] };
  // }
  // if (query && query.token && typeof query.token === "string") {
  //   const { token } = query;
  //   return { pathname, query,  token };
  // } else {
  //   return { pathname, query, token: "" };
  // }
  return { pathname, query, referer, userAgent };
};

Profile.getLayout = getLayout;
Profile.title = "Profile";

export default Profile;
