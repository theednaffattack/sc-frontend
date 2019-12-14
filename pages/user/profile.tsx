import { Flex } from "../../modules/primitives/styled-rebass";
import { getLayout } from "../../modules/site-layout/main-v2";
import { NextContext } from "../../typings/NextContext";

type TokenWithNextContext = { token: string } & NextContext;

interface ProfileProps {
  ({ pathname, query, token }: TokenWithNextContext): JSX.Element;

  getInitialProps: ({
    pathname,
    query,
    token
  }: TokenWithNextContext) => Promise<{
    pathname: TokenWithNextContext["pathname"];
    query: TokenWithNextContext["query"];
    token: TokenWithNextContext["token"];
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Profile: ProfileProps = () => (
  <Flex
    flexDirection="column"
    width={[1]}
    alignItems="center"
    justifyContent="center"
  >
    PROFILE
  </Flex>
);

Profile.getInitialProps = async ({ pathname, query }) => {
  if (query && query.token && query.token.constructor === Array) {
    const { token } = query;
    return { pathname, query, token: token[0] };
  }
  if (query && query.token && typeof query.token === "string") {
    const { token } = query;
    return { pathname, query, token };
  } else {
    return { pathname, query, token: "" };
  }
};

Profile.getLayout = getLayout;
Profile.title = "Profile";

export default Profile;
