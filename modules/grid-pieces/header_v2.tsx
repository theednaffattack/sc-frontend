import React from "react";

import { Flex, Heading, HeaderWrapper } from "../primitives/styled-rebass";
import { ViewerStateInterface } from "../site-layout/grid-layout_v2";

interface HeaderProps {
  data: ViewerStateInterface["headerInfo"];
}

type TIsStringEmpty =
  | "string_is_empty"
  | "string_is_NOT_empty"
  | "it's_NOT_a_string";

const Header: React.FunctionComponent<HeaderProps> = ({ data }) => {
  const isString = typeof data === "string";
  const isStringEmpty: TIsStringEmpty = data
    ? data && isString && data.length > 0
      ? "string_is_NOT_empty"
      : "it's_NOT_a_string"
    : "string_is_empty";

  return (
    <HeaderWrapper>
      <Flex
        justifyContent="center"
        sx={{
          height: "auto"
        }}
      >
        {isStringEmpty === "it's_NOT_a_string" &&
        data &&
        typeof data !== "string"
          ? data.map((item, index) => (
              <span key={item?.id ?? index}>{item.name}</span>
            ))
          : ""}

        {isString === true ? (
          <Heading pt={2} as="h1" fontFamily="main">{`${
            isStringEmpty === "string_is_NOT_empty" ? `#` : ""
          } ${data}`}</Heading>
        ) : (
          ""
        )}
      </Flex>
    </HeaderWrapper>
  );
};

export default Header;
