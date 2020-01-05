import React from "react";
import { useState } from "react";

import Login from "../modules/auth/login";
import { LoginForm } from "../modules/auth/login-form";
import { NextContext } from "../typings/NextContext";
import { getLayout } from "../modules/site-layout/main-v2";
import { Text } from "../modules/primitives/styled-rebass";

import { FlashMessage } from "../modules/auth/flash-message";

interface LoginProps {
  hocLoginState: boolean;
  hocLogin: any;
  hocLogout: any;
  authState: boolean;
  referer: NextContext["referer"];
  query?: NextContext["query"];
}

interface ILoginPage {
  ({
    authState,
    hocLogin,
    hocLoginState,
    hocLogout,
    query,
    referer
  }: LoginProps): JSX.Element;

  getInitialProps: ({
    query,
    referer
  }: NextContext) => Promise<{
    query: NextContext["query"];
    referer: NextContext["referer"];
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

export interface FlashProps {
  flashIsOpen: boolean;
  setFlashIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RenderFlashMessageProps extends FlashProps {
  getQuery: string;
  referer?: string | undefined;
}

export const RenderFlashMessage: React.FunctionComponent<RenderFlashMessageProps> = ({
  flashIsOpen,
  getQuery,
  referer,
  setFlashIsOpen
}) => {
  return (
    <FlashMessage flashIsOpen={flashIsOpen} setFlashIsOpen={setFlashIsOpen}>
      <Text color="text">{getQuery}</Text>

      {referer && referer.includes("/login") ? (
        ""
      ) : (
        <Text my={2} color="text">
          referer: {referer}
        </Text>
      )}
    </FlashMessage>
  );
};

const LoginPage: ILoginPage = ({
  hocLogin,
  hocLoginState,
  hocLogout,
  authState,
  referer,
  query
}) => {
  let getQuery: string;

  let isAnArray =
    query && query.message instanceof Array ? query.message[0] : undefined;
  let isAString =
    query && typeof query.message === "string" ? query.message : undefined;

  getQuery = isAString ? isAString : isAnArray ? isAnArray : "unknown";

  let initialState =
    getQuery === "logout" || getQuery === "unknown" ? false : true;

  const [flashIsOpen, setFlashIsOpen] = useState<boolean>(initialState);

  return (
    <Login
      renderFlashMessage={() => {
        if (getQuery !== undefined && getQuery !== "unknown") {
          return (
            <RenderFlashMessage
              getQuery={getQuery}
              referer={referer}
              flashIsOpen={flashIsOpen}
              setFlashIsOpen={setFlashIsOpen}
            />
          );
        } else {
          return "";
        }
      }}
      referer={referer}
    >
      <LoginForm
        hocLogin={hocLogin}
        hocLogout={hocLogout}
        hocLoginState={hocLoginState}
        authState={authState}
        referer={referer}
      />
    </Login>
  );
};

LoginPage.getInitialProps = async ({ query, referer }: NextContext) => {
  console.log("login GET INITIAL PROPS", query);
  let setReferer = referer === undefined ? "/login" : referer;
  return { referer: setReferer, query };
};

LoginPage.getLayout = getLayout;
LoginPage.title = "Login";

export default LoginPage;
