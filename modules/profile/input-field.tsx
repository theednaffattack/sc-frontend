import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { Text, Flex } from "../primitives/styled-rebass";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface PassedInputProps {
  label: string;
}

const StyledInput = styled.input``;

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps & PassedInputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];
  const { type } = props;
  return (
    <Flex flexDirection="column">
      <Text fontFamily="main">
        <label htmlFor={field.name}>{props.label}</label>
      </Text>
      <StyledInput
        type={type}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
      />

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </Flex>
  );
};
