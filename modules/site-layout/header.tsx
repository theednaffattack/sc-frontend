import React from "react";
// import { minHeight, borders } from "styled-system";
import styled from "styled-components";

import { Flex, Image } from "../primitives/styled-rebass";
import MyLink from "./my-link";
import { width, WidthProps, borders, BordersProps } from "styled-system";

interface HeaderProps {
  hocLoginState: boolean;
}

const Nav = styled.nav<WidthProps & BordersProps>`
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  ${width}
  ${borders}
`;

const RenderHiddenLinks = () => {
  return (
    <>
      <MyLink shade="dark" href="/login" name="login">
        Login
      </MyLink>
      <MyLink shade="dark" href="/register" name="register">
        Register
      </MyLink>
    </>
  );
};

const RenderLogout = () => {
  return (
    <MyLink shade="dark" href="/logout" name="logout">
      Logout
    </MyLink>
  );
};

const RenderAvatarLink = () => {
  return (
    <MyLink hover={false} shade="dark" href="/user/profile" name="profile">
      <Image
        src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          paddingBottom: 0,
          verticalAlign: "middle"
        }}
      />
    </MyLink>
  );
};

// const RenderAvatarPlaceholder = () => {
//   return (
//     <svg
//       viewBox="0 0 50 50"
//       style={{
//         minWidth: "48px",
//         minHeight: "48px",
//         borderBottom: "2px transparent solid",
//         paddingBottom: "8px"
//       }}
//     >
//       <circle cx="25" cy="25" r="25" fill="pink"></circle>
//     </svg>
//   );
// };

interface RenderForgotPasswordProps {}

const RenderForgotPassword: React.FunctionComponent<RenderForgotPasswordProps> = () => {
  return (
    <MyLink shade="dark" href="/forgot-password" name="forgot-password">
      Forgot Password
    </MyLink>
  );
};

const Header: React.FunctionComponent<HeaderProps> = ({ hocLoginState }) => {
  const breakWidths = [1, 1, 1, "690px"];
  return (
    <Flex flexDirection="column">
      <Nav width={breakWidths} style={{ minHeight: "58px" }}>
        <MyLink shade="dark" href="/" name="home">
          Home
        </MyLink>{" "}
        {hocLoginState === true ? "" : <RenderHiddenLinks />}
        {hocLoginState === true ? "" : <RenderForgotPassword />}
        {hocLoginState === true ? <RenderLogout /> : ""}
        {hocLoginState === true ? <RenderAvatarLink /> : ""}
      </Nav>
    </Flex>
  );
};

export default Header;
