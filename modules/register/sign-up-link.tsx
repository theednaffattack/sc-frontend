// import react from "React";
import {
  Flex as FlexBase,
  Text as TextBase,
  TextProps
} from "rebass/styled-components";
import styled, { StyledComponent } from "styled-components";
import {
  borders,
  space,
  FlexboxProps,
  BordersProps,
  SpaceProps
} from "styled-system";
import MyLink from "./my-link";
import { FunctionComponent } from "react";

interface Props {
  width: number | string | string[];
}

interface IFlexWithBorder
  extends FlexboxProps,
    BordersProps,
    SpaceProps,
    Props {}

interface MyTextProps extends TextProps, BordersProps {}

const Flex = styled(FlexBase)<IFlexWithBorder>`
  ${borders}
  ${space}
`;

const Text: StyledComponent<
  FunctionComponent<MyTextProps>,
  any,
  MyTextProps,
  never
> = styled(TextBase)`
  ${borders}
`;

export const SignUpLink: React.FunctionComponent<Props> = ({
  width
}: Props) => {
  return (
    <Flex
      justifyContent="center"
      width={width}
      borderTop="2px rgba(255,255,255,0.4) solid"
      p={3}
      my={4}
    >
      <Text fontFamily="main" color="rgba(255,255,255,.6)">
        Not a user?
      </Text>
      &nbsp; &nbsp;
      <Text fontFamily="main" color="rgba(255,255,255,.8)">
        <MyLink href="register" name="Sign Up" />
      </Text>
    </Flex>
  );
};
