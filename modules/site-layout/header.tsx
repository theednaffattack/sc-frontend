import React from "react";
import { Flex as FlexBase } from "rebass/styled-components";
import { minHeight, borders } from "styled-system";
import styled from "styled-components";

import MyLink from "./my-link";

interface HeaderProps {}

const Flex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

const FlexHeader = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

const Header: React.FunctionComponent<HeaderProps> = () => {
  const breakWidths = [1, 1, 1, "690px"];
  return (
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
          <MyLink shade="dark" href="/" name="home">
            <a>Home</a>
          </MyLink>{" "}
          |{" "}
          <MyLink shade="dark" href="/cars" name="cars">
            <a>Cars</a>
          </MyLink>{" "}
          |{" "}
          <MyLink shade="dark" href="/login" name="login">
            <a>Login</a>
          </MyLink>{" "}
          |{" "}
          <MyLink shade="dark" href="/register" name="register">
            <a>Register</a>
          </MyLink>{" "}
          |{" "}
          <MyLink shade="dark" href="/hello" name="hello">
            <a>Hello</a>
          </MyLink>{" "}
          |{" "}
          <MyLink shade="dark" href="/forgot-password" name="forgot-password">
            <a>Forgot Password</a>
          </MyLink>{" "}
          |{" "}
          <MyLink shade="dark" href="/logout" name="logout">
            <a>Logout</a>
          </MyLink>{" "}
          |{" "}
          <MyLink shade="dark" href="/user/profile" name="profile">
            <a>Profile</a>
          </MyLink>
        </nav>
      </FlexHeader>
    </Flex>
  );
};

export default Header;
