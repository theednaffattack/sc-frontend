import React from "react";

import Login from "../modules/auth/login";
import { NextContext } from "../typings/NextContext";
import { getLayout } from "../modules/site-layout/main-v2";

interface LoginProps {
  referer: NextContext["referer"];
}

interface ILoginPage {
  ({ referer }: LoginProps): JSX.Element;

  getInitialProps: ({
    referer
  }: NextContext) => Promise<{ referer: NextContext["referer"] }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const LoginPage: ILoginPage = ({ referer }) => <Login referer={referer} />;

LoginPage.getInitialProps = async ({ referer }: NextContext) => {
  let setReferer = referer === undefined ? "/login" : referer;
  return { referer: setReferer };
};

LoginPage.getLayout = getLayout;
LoginPage.title = "Login";

export default LoginPage;
