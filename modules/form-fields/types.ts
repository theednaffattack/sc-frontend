import React, { InputHTMLAttributes } from "react";

export interface IInputBProps
  extends React.DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export interface IInputFieldProps {
  label: string;
}
