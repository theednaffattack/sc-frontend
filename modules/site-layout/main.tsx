import React from "react";
import Head from "next/head";
import { Flex as FlexBase } from "rebass/styled-components";
import { minHeight, borders } from "styled-system";
import styled from "styled-components";

import MyLink from "./my-link";

const Flex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

const FlexHeader = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

// const FlexFooter = styled(FlexBase)`
//   ${minHeight}
//   ${borders}
// `;

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title"
}) => {
  const breakWidths = [1, 1, 1, "690px"];
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
        <FlexHeader
          bg="transparent"
          color="white"
          width={breakWidths}
          style={{ border: "2px white dashed" }}
        >
          <nav>
            <MyLink shade="dark" prefetch href="/" name="home">
              <a>Home</a>
            </MyLink>{" "}
            |{" "}
            <MyLink shade="dark" prefetch href="/cars" name="cars">
              <a>Cars</a>
            </MyLink>{" "}
            |{" "}
            <MyLink shade="dark" prefetch href="/login" name="login">
              <a>Login</a>
            </MyLink>{" "}
            |{" "}
            <MyLink shade="dark" prefetch href="/register" name="register">
              <a>Register</a>
            </MyLink>{" "}
            |{" "}
            <MyLink shade="dark" prefetch href="/hello" name="hello">
              <a>Hello</a>
            </MyLink>{" "}
            |{" "}
            <MyLink
              shade="dark"
              prefetch
              href="/forgot-password"
              name="forgot-password"
            >
              <a>Forgot Password</a>
            </MyLink>{" "}
            |{" "}
            <MyLink shade="dark" prefetch href="/logout" name="logout">
              <a>Logout</a>
            </MyLink>
          </nav>
        </FlexHeader>
      </Flex>
      <Flex flexDirection="column">{children}</Flex>
    </Flex>
  );
};

export default Layout;
