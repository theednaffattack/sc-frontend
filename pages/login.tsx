import React from "react";

import Login from "../modules/auth/login";
import { LoginForm } from "../modules/auth/login-form";
import { NextContext } from "../typings/NextContext";
import { getLayout } from "../modules/site-layout/main-v2";

interface LoginProps {
  hocLoginState: boolean;
  hocLogin: any;
  hocLogout: any;
  authState: boolean;
  referer: NextContext["referer"];
}

interface ILoginPage {
  ({
    hocLogin,
    hocLoginState,
    hocLogout,
    authState,
    referer
  }: LoginProps): JSX.Element;

  getInitialProps: ({
    referer
  }: NextContext) => Promise<{ referer: NextContext["referer"] }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const LoginPage: ILoginPage = ({
  hocLogin,
  hocLoginState,
  hocLogout,
  authState,
  referer
}) => (
  <Login referer={referer}>
    <LoginForm
      hocLogin={hocLogin}
      hocLogout={hocLogout}
      hocLoginState={hocLoginState}
      authState={authState}
    />
  </Login>
);

LoginPage.getInitialProps = async ({ query, referer }: NextContext) => {
  let setReferer = referer === undefined ? "/login" : referer;
  return { referer: setReferer, query };
};

LoginPage.getLayout = getLayout;
LoginPage.title = "Login";

export default LoginPage;
