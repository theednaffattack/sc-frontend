import React from "react";
import styled from "styled-components";
import { FieldProps } from "formik";
import { InputProps } from "./types";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox: any = styled.input.attrs({
  type: "checkbox"
})`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 20px;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box; 
  height: 20px;
  background: ${props => (props.checked ? "" : "papayawhip")};
  border-radius: 7px;
  border: ${props => (!props.checked ? "1px rgba(0,0,0,0.3) solid" : "")};
  transition: all 150ms;
  /* background-image:  ${props =>
    props.checked
      ? "linear-gradient(90deg, rgb(210,48,120) 6%, rgb(254,97,97) 74%, rgb(255,121,85) 100%);"
      : ""} */

  /* border: 1px lawngreen solid; */

  /* } */

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
`;

const CheckBox = ({ field, form, ...props }: FieldProps & InputProps) => (
  <CheckboxContainer>
    <HiddenCheckbox
      checked={form.values.keepMeSignedIn}
      name={field.name}
      onChange={() => {
        const nextValue = !form.values.keepMeSignedIn;

        form.setFieldValue("keepMeSignedIn", nextValue);
      }}
      {...props}
    />
    <StyledCheckbox checked={form.values.keepMeSignedIn}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export { CheckBox };
