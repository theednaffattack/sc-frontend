import {
  AbFlex,
  Flex,
  Button,
  MaterialIconBase
} from "../primitives/styled-rebass";

import { MessageBoxState } from "./add-channel-modal";

interface FormMessageBoxProps {
  dismissFunction: React.Dispatch<React.SetStateAction<MessageBoxState>>;
}

export const FormMessageBox: React.FunctionComponent<FormMessageBoxProps> = ({
  children,
  dismissFunction
}) => {
  return (
    <Flex bg="rgba(255, 0, 0, 0.3)" style={{ position: "relative" }}>
      <AbFlex position="absolute" right={0} top={0}>
        <Button
          ml="auto"
          p={0}
          bg="transparent"
          type="button"
          onClick={() => dismissFunction("isClosed")}
        >
          <MaterialIconBase name="close" size="1em" fill="grey" />
        </Button>
      </AbFlex>

      <span style={{ color: "crimson" }}>{children}</span>
    </Flex>
  );
};

interface AddTeamMemberFormMessageBoxProps {
  // dismissFunction: React.Dispatch<React.SetStateAction<MessageBoxState>>;
  dismissFunction: (key: string) => void;
  // clearError
}

export const AddTeamMemberFormMessageBox: React.FunctionComponent<AddTeamMemberFormMessageBoxProps> = ({
  children,
  dismissFunction
}) => {
  return (
    <Flex bg="rgba(255, 0, 0, 0.3)" style={{ position: "relative" }}>
      <AbFlex position="absolute" right={0} top={0}>
        <Button
          ml="auto"
          p={0}
          bg="transparent"
          type="button"
          onClick={() => dismissFunction("email")}
        >
          <MaterialIconBase name="close" size="1em" fill="grey" />
        </Button>
      </AbFlex>

      <span style={{ color: "crimson" }}>{children}</span>
    </Flex>
  );
};
