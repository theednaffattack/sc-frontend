import React from "react";
// import { minHeight, borders } from "styled-system";
import styled from "styled-components";

import { Flex, Image } from "../primitives/styled-rebass";
import MyLink from "./my-link";
import {
  width,
  WidthProps,
  borders,
  BordersProps,
  minHeight,
  MinHeightProps
} from "styled-system";

interface HeaderProps {
  hocLoginState: boolean;
  hocLogout: () => void;
  token?: string;
}

const Nav = styled.nav<WidthProps & BordersProps & MinHeightProps>`
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  ${minHeight}
  ${width}
  ${borders}
`;

const RenderLoginLink = () => {
  return (
    <>
      <MyLink shade="dark" href="/login" name="login">
        Login
      </MyLink>
    </>
  );
};

interface RenderLogoutProps {
  hocLogout?: () => void;
}

const RenderLogout: React.FunctionComponent<RenderLogoutProps> = ({
  hocLogout
}) => {
  return (
    <MyLink hocLogout={hocLogout} shade="dark" href="/logout" name="/logout">
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

// interface RenderForgotPasswordProps {}

// const RenderForgotPassword: React.FunctionComponent<RenderForgotPasswordProps> = () => {
//   return (
//     <MyLink shade="dark" href="/forgot-password" name="forgot-password">
//       Forgot Password
//     </MyLink>
//   );
// };

// @ts-ignore
const Header: React.FunctionComponent<HeaderProps> = ({
  hocLoginState,
  hocLogout,
  token
}) => {
  const breakWidths = [1, 1, 1, "690px"];

  const isAuthenticated = token || hocLoginState === true;

  return (
    <Flex flexDirection="column">
      <Nav minHeight="58px" width={breakWidths}>
        <MyLink shade="dark" href="/" name="home">
          Home
        </MyLink>{" "}
        {!isAuthenticated ? <RenderLoginLink /> : <RenderAvatarLink />}
        {isAuthenticated ? <RenderLogout hocLogout={hocLogout} /> : ""}
      </Nav>
    </Flex>
  );
};

export default Header;
