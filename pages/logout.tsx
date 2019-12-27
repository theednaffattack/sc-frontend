import { LogoutDocument } from "../modules/gql-gen/generated/apollo-graphql";
import redirect from "../lib/redirect";
import { NextContext } from "../typings/NextContext";
import { logout } from "../lib/logout";
import { getLayout } from "../modules/site-layout/main-v2";
// import { isBrowser } from "../lib/isBrowser";

interface OtherLogoutProps {
  authState: boolean;
  hocLogout: any;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
  referer: NextContext["referer"];
}

interface LogoutProps {
  ({ authState, hocLogout, setAuthState, referer }: OtherLogoutProps): any;

  getInitialProps: ({
    apolloClient,
    referer
  }: NextContext) => Promise<{
    // apolloCient: NextContext["apolloClient"];
    // referer: NextContext["referer"];
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Logout: LogoutProps = ({ hocLogout, setAuthState }) => {
  hocLogout();
  setAuthState(false);
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: NextContext) => {
  if (apolloClient) {
    let processLogout = await apolloClient.mutate({
      mutation: LogoutDocument
    });

    // await apolloClient.resetStore();
    await apolloClient.clearStore();

    logout();

    // const fullUrl = "http://192.168.1.24:3000/login";
    const targetUrl = "/login?auth=false";

    if (
      processLogout &&
      processLogout.data &&
      processLogout.data.logout === true
    ) {
      redirect(ctx, targetUrl);
    }
    return {};
  } else {
    throw Error("No initial props");
  }
};

Logout.getLayout = getLayout;

Logout.title = "Logout";

export default Logout;
