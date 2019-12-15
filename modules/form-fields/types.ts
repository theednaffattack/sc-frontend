import {
  BordersProps,
  ColorProps,
  WidthProps,
  SpaceProps,
  HeightProps,
  BorderRadiusProps,
  FontSizeProps,
  LetterSpacingProps
} from "styled-system";
import { DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes } from "react";

export interface IInputBProps
  extends React.DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export interface IInputFieldProps {
  label: string;
}

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface IStyledCheckboxProps
  extends React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

interface GenericProps {
  props: any;
}

export type ChatInputProps = InputProps &
  ColorProps &
  BordersProps &
  SpaceProps &
  WidthProps &
  HeightProps &
  BorderRadiusProps &
  FontSizeProps &
  LetterSpacingProps &
  GenericProps;
