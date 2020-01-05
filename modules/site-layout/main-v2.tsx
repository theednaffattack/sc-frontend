import React from "react";
// import { useState } from "react";
import Head from "next/head";
// import { minHeight, borders } from "styled-system";
// import styled from "styled-components";

import { Flex } from "../primitives/styled-rebass";
import Header from "./header";

// interface MenuState {
//   sidebarStatus: "open" | "closed";
// }

interface LayoutProps {
  title?: string;
  hocLoginState: boolean;
  hocLogin: () => void;
  hocLogout: () => void;
  referer: string;
  token?: string;
  syncLogout: () => void;
}

// const Flex = styled(FlexBase)`
//   ${minHeight}
//   ${borders}
// `;

export const breakWidths = [1, 1, 1, "960px"];

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  hocLoginState,
  hocLogout,
  referer,
  syncLogout,
  title = "This is the default title",
  token
}) => {
  // const initialState = true;
  // // @ts-ignore
  // const [authState, setAuthState] = useState(initialState);
  // let elementWithAuthSetter;
  // if (React.isValidElement(children)) {
  //   elementWithAuthSetter = React.cloneElement(children, {
  //     authState,
  //     setAuthState
  //   });
  // }
  return (
    <Flex m={[0]} minHeight="100vh" flexDirection="column" width={1}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Flex justifyContent="center" alignItems="center">
        <Header
          hocLogout={hocLogout}
          token={token}
          hocLoginState={hocLoginState}
          syncLogout={syncLogout}
          referer={referer}
        />
      </Flex>
      <Flex width={1} flexDirection="column" alignItems="center">
        {children}
      </Flex>
    </Flex>
  );
};

export const getLayout = (page: any) => {
  return (
    <Layout
      token={page.props.token}
      hocLoginState={page.props.hocLoginState}
      hocLogin={page.props.hocLogin}
      hocLogout={page.props.hocLogout}
      referer={page.props.referer}
      syncLogout={page.props.syncLogout}
      title={page.props.title}
    >
      {page}
    </Layout>
  );
};

export default Layout;
