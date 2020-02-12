import React from "react";
import styled from "styled-components";

import { Flex } from "../primitives/styled-rebass";

export const MessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
  /* border: 2px pink solid; */
  overflow-y: auto;
`;

interface EmptyMessagesWrapperProps {}

export const EmptyMessagesWrapper: React.FunctionComponent<EmptyMessagesWrapperProps> = ({
  children
}) => {
  return (
    <MessageWrapper>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        {children}
      </Flex>
    </MessageWrapper>
  );
};
