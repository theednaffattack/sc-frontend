import React, { DetailedHTMLProps, OlHTMLAttributes } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Flex as FlexBase,
  Card as CardBase,
  Heading,
  Image,
  Text
} from "rebass/styled-components";
import {
  // backgroundColor,
  borders,
  boxShadow,
  borderRadius,
  color,
  maxWidth,
  minHeight,
  height,
  space,
  width,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  minWidth,
  maxHeight,
  bottom,
  position,
  left,
  right,
  top,
  overflow,
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
  ColorProps
} from "styled-system";
import styled, { StyledComponent } from "styled-components";
import IconBase from "../icon/icon";
// import { motion } from "framer-motion";

import {
  TFlexProps,
  TMaxFlexProps,
  TLogoFlexProps,
  ICardProps,
  IAbFlexProps,
  IMinButtonProps,
  IFlexShadowProps,
  IFlexUserProfileWrapProps
} from "./types";

interface IisPartiallyActiveProps {
  isPartiallyCurrent: boolean;
}

const StyledLinkV1 = styled(Link)`
  ${color}
  text-decoration: none;
  :hover {
    color: crimson;
  }
`;

interface ITabListProps
  extends SpaceProps,
    WidthProps,
    DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> {}

export const TabList = styled.ol<ITabListProps>`
  ${space}
  ${width}
`;

export interface ITabListItemProps {
  label: string;
  onClick: any;
  activeTab: string;
  active?: boolean;
}

interface IAvatarProps {
  src?: string;
  width?: number | string;
  height?: number | string;
}

export const Avatar: React.FunctionComponent<IAvatarProps> = ({
  height,
  src,
  width
}) => {
  let checkWidth = width ? width : 0;
  let checkHeight = height ? height : 0;

  if (src) {
    return (
      <Image
        src={src}
        sx={{
          width: checkWidth,
          height: checkHeight,
          borderRadius: 9999
        }}
      />
    );
  }

  return <Icon size="2em" name="user" fill="white" />;
};

export const TabListItem: React.FC<ITabListItemProps> = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
  border-bottom: ${(props: any) =>
    props.active ? "2px rebeccapurple solid" : "none"};
`;

export const TabListActive = styled.div`
  background-color: white;
  border: solid #ccc;
  border-width: 1px 1px 0 1px;
`;

export const StyledLinkV3 = styled(Link)`
  width: 100%;
  /* height: 20px; */
  flex: 1;
  padding: 8px;
`;

export const StyledLinkV2 = (props: any) => {
  let itemBorderColor = props.itemBorderColor;
  let TempLink = styled(Link)`
    ${color}
    ${itemBorderColor}

  /* padding: 10px 20px; */
  /* font-size: 1.1em;
  display: block;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); */

  border-radius: 5px;
    width: 100%;
    /* height: 20px; */
    flex: 1;
    padding: 8px;

    /* :hover {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  } */
  `;
  return <TempLink href={props.href} />;
};

const isPartiallyActive = ({ isPartiallyCurrent }: IisPartiallyActiveProps) => {
  return isPartiallyCurrent
    ? { style: { color: "crimson" } }
    : { style: { color: "white" } };
};

export const PartialNavLink = ({ children, style, ...props }: any) => (
  <Link getProps={isPartiallyActive} style={style} {...props}>
    {children}
  </Link>
);

export const NavLink = ({ children, href }: any) => (
  <Link href={href}>
    <a>{children}</a>
  </Link>
);

export const LinkLink = ({ children, style, ...props }: any) => (
  <StyledLinkV1 color="white" {...props}>
    {children}
  </StyledLinkV1>
);

interface IIconBaseProps extends SpaceProps {
  size: string;
  name: string;
  fill: string;
}

export const Icon: React.FC<IIconBaseProps> = styled(IconBase)`
  ${space}
`;

export const FlexShadow: React.FC<IFlexShadowProps> = styled(FlexBase)`
  ${boxShadow}
`;

export const FlexUserProfileWrap: React.FC<IFlexUserProfileWrapProps> = styled(
  FlexBase
)`
${borderRadius}
${boxShadow}
${overflow}
${maxHeight}
${maxWidth}
${borders}
`;

export const MinButton: React.FC<IMinButtonProps> = styled(Button)`
  ${minHeight}
`;

export const Card: React.FC<ICardProps> = styled(CardBase)`
  ${maxWidth}
`;

export const Flex: React.FC<TFlexProps> = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

export const AbFlex: React.FC<IAbFlexProps> = styled(FlexBase)`
  ${position}
  ${top}
  ${right}
  ${left}
  ${bottom}
  ${overflow}
  ${borders}
`;

export const MaxFlex: React.FC<TMaxFlexProps> = styled(FlexBase)`
  ${maxHeight}
  ${maxWidth}
  ${minHeight}
  ${borders}
  ${minWidth}
`;

export const LogoFlex: React.FC<TLogoFlexProps> = styled(FlexBase)`
  ${boxShadow}
  ${borderRadius}
  ${height}
`;

export interface StylingProps
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
    BackgroundColorProps {}

export const InputB: StyledComponent<
  "input",
  any,
  StylingProps,
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
${letterSpacing}
outline: none;
box-sizing:border-box;
transition: all 0.30s ease-in-out;
:focus {
  border-bottom: 2.5px lawngreen solid;
  // box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6);
  
}
  ::placeholder {
    color: palevioletred;
  }
`;

export const FlexGradient = styled(Flex)`
  background-image: linear-gradient(
    0deg,
    rgba(210, 48, 120, 1) 6%,
    rgba(254, 97, 97, 1) 74%,
    rgba(255, 121, 85, 1) 100%
  );
`;

export const StyledUl_v1 = styled.ul`
  ${color}
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* position: absolute;
  top: 0; */
`;

export const StyledUl_v2 = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

export const Label = styled.label`
  border: none;
  display: inline-block;
  cursor: pointer;

  box-sizing: border-box;
  margin: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: inherit;
  color: white;
  background-color: #07c;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  -webkit-text-decoration: none;
  text-decoration: none;
  border: 0;
  border-radius: 4px;
  border-radius: 4px;
`;

export { Box, Button, Heading, Image, Text };
