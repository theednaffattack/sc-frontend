import React from "react";

import { AbFlex, Button } from "../../modules/primitives/styled-rebass";
import Icon from "../../modules/icon/m-icon";

interface CloseButtonProps {
  close: () => void;
  size: string;
  fill: string;
}

export const CloseButton: React.FunctionComponent<CloseButtonProps> = ({
  close,
  size = "1em",
  fill
}) => (
  <AbFlex position="absolute" left={0} top="3px" right="3px">
    <Button
      bg="transparent"
      p={0}
      mb={0}
      ml="auto"
      onClick={close}
      type="button"
    >
      <Icon size={size} name="cancel" fill={fill} />
    </Button>
  </AbFlex>
);
