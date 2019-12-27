import React from "react";
import { useState } from "react";
import Head from "next/head";
import { Flex as FlexBase } from "rebass/styled-components";
import { minHeight, borders } from "styled-system";
import styled from "styled-components";

import Header from "./header";

// interface MenuState {
//   sidebarStatus: "open" | "closed";
// }

interface LayoutProps {
  title?: string;
  hocLoginState: boolean;
}

const Flex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

export const breakWidths = [1, 1, 1, "960px"];

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  hocLoginState,
  title = "This is the default title"
}) => {
  const initialState = true;
  // @ts-ignore
  const [authState, setAuthState] = useState(initialState);
  let elementWithAuthSetter;
  if (React.isValidElement(children)) {
    elementWithAuthSetter = React.cloneElement(children, {
      authState,
      setAuthState
    });
  }
  return (
    <Flex m={[0]} minHeight="100vh" flexDirection="column" width={[1]}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Flex
        justifyContent="center"
        alignItems="center"
        sx={{ border: "2px white dashed" }}
      >
        <Header hocLoginState={hocLoginState} />
      </Flex>
      <Flex flexDirection="column">{elementWithAuthSetter}</Flex>
    </Flex>
  );
};

export const getLayout = (page: any) => {
  console.log("VIEW GETLAYOUT PAGE (/modules/site-layout/main-v2.tsx)", page);

  return (
    <Layout hocLoginState={page.props.hocLoginState} title={page.props.title}>
      {page}
    </Layout>
  );
};

export default Layout;
