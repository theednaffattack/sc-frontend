import React from "react";

import { MessageWrapper } from "./messages";
import { Flex } from "../../modules/primitives/styled-rebass";

interface EmptyMessagesWrapperProps {}

export const EmptyMessagesWrapper: React.FunctionComponent<
  EmptyMessagesWrapperProps
> = ({ children }) => {
  return (
    <MessageWrapper>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="crimson"
      >
        {children}
      </Flex>
    </MessageWrapper>
  );
};
