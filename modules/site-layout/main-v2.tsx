import React from "react";
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
}

const Flex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

export const breakWidths = [1, 1, 1, "960px"];

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title = "This is the default title"
}) => {
  return (
    <Flex
      // border="3px crimson solid"
      m={[0]}
      minHeight="100vh"
      flexDirection="column"
      width={[1]}
    >
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
        <Header />
      </Flex>
      <Flex flexDirection="column">{children}</Flex>
    </Flex>
  );
};

export const getLayout = (page: any) => {
  return <Layout title={page.props.title}>{page}</Layout>;
};

export default Layout;
