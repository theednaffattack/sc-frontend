import {
  AbFlex,
  Flex,
  Button,
  MaterialIconBase,
} from "../../modules/primitives/styled-rebass";

interface FormMessageBoxProps {
  dismissFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormMessageBox: React.FunctionComponent<FormMessageBoxProps> = ({
  children,
  dismissFunction,
}) => {
  return (
    <Flex bg="rgba(255, 0, 0, 0.3)" style={{ position: "relative" }}>
      <AbFlex position="absolute" right={0} top={0}>
        <Button
          ml="auto"
          p={0}
          bg="transparent"
          type="button"
          onClick={() => dismissFunction(false)}
        >
          <MaterialIconBase name="close" size="1rem" fill="grey" />
        </Button>
      </AbFlex>

      <span style={{ color: "crimson" }}>{children}</span>
    </Flex>
  );
};
