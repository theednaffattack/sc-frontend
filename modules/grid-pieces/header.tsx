import React from "react";

import { Flex, Heading, HeaderWrapper } from "../primitives/styled-rebass";

interface HeaderProps {
  channelName: string;
  channelId: string;
}

type TIsStringEmpty = "string_is_empty" | "string_is_NOT_empty";

const Header: React.FunctionComponent<HeaderProps> = ({
  channelId,
  channelName
}) => {
  console.log("WHAT IS CHANNEL ID IN HEADER COMPONENT", channelId);
  const isStringEmpty: TIsStringEmpty =
    typeof channelName === "string" && channelName.length > 0
      ? "string_is_NOT_empty"
      : "string_is_empty";
  return (
    <HeaderWrapper>
      <Flex
        justifyContent="center"
        sx={{
          height: "auto"
        }}
      >
        <Heading pt={2} as="h1" fontFamily="main">{`${
          isStringEmpty === "string_is_NOT_empty" ? `#` : ""
        } ${channelName}`}</Heading>
      </Flex>
    </HeaderWrapper>
  );
};

export default Header;
