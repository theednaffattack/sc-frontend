import styled, { StyledComponent } from "styled-components";
import {
  borders,
  borderRadius,
  color,
  height,
  space,
  width,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  SpaceProps,
  WidthProps,
  FontSizeProps,
  BordersProps,
  FontFamilyProps,
  FontWeightProps,
  LetterSpacingProps,
  BorderRadiusProps,
  HeightProps,
  BackgroundColorProps,
  ColorProps,
  lineHeight,
  LineHeightProps
} from "styled-system";
import { FieldProps } from "formik";

interface SendMessageProps {
  channelName: string;
  placeholder: string;
}

export interface InputStylingProps
  extends ColorProps,
    BordersProps,
    SpaceProps,
    WidthProps,
    HeightProps,
    BorderRadiusProps,
    FontFamilyProps,
    FontSizeProps,
    FontWeightProps,
    LetterSpacingProps,
    LineHeightProps,
    BackgroundColorProps {}

const Input: StyledComponent<
  "input",
  any,
  InputStylingProps,
  never
> = styled.input`
${color}
${borders}
${space}
${width}
${height}
${borderRadius}
${fontFamily}
${fontSize}
${fontWeight}
${lineHeight}
${letterSpacing}
grid-column: 3;
grid-row: 3;
outline: none;
box-sizing:border-box;
transition: all 0.30s ease-in-out;


::placeholder {
  color: palevioletred;
}

/* :focus {
border-bottom: 2.5px lawngreen solid;
box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6);

} */
`;

const SendMessage: React.FunctionComponent<SendMessageProps & FieldProps> = ({
  field,
  form: { errors, touched },
  channelName,
  placeholder,
  ...props
}) => {
  console.log("CHECK FORM ERRORS, TOUCHED", { errors, touched, props });
  const newPlaceholder = `${placeholder}${channelName}`;
  return (
    <Input
      pl={3}
      width={1}
      fontSize="40px"
      lineHeight="65px"
      placeholder={newPlaceholder}
    />
  );
};

export default SendMessage;
