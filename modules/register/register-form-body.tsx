import React from "react";
import { Field } from "formik";
import { InputField } from "../form-fields/input-field";
import { Box, Button, Flex, Text, LinkLink } from "../primitives/styled-rebass";
import { CheckBox } from "../form-fields/checkbox";
import { IRegisterFormBodyProps } from "./types";

function RegisterFormBody({ handleSubmit }: IRegisterFormBodyProps) {
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Field
        label="first name"
        name="firstName"
        placeholder="enter first name"
        component={InputField}
      />
      <Field
        label="last name"
        name="lastName"
        placeholder="enter last name"
        component={InputField}
      />
      <Field
        label="email"
        name="email"
        placeholder="enter email"
        component={InputField}
      />
      <Field
        label="password"
        name="password"
        type="password"
        component={InputField}
      />

      <Flex justifyContent="center" mt={2} mb={3}>
        <Box mr={2}>
          <label>
            <Field
              label="terms and conditions"
              id="termsAndConditions"
              name="termsAndConditions"
              type="checkbox"
              shadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
              component={CheckBox}
            />
          </label>
        </Box>
        <Flex>
          <Text htmlFor="keepMeSignedIn" fontFamily="montserrat">
            Agree to our
          </Text>
          &nbsp;
          <Text fontFamily="montserrat">
            <LinkLink
              to="/terms_and_conditions"
              href="/terms_and_conditions"
              name="Terms & stuff"
              color="link_color"
            >
              Terms & Stuff
            </LinkLink>
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="center">
        <Button
          type="submit"
          // onClick={handleSubmit}
          label="Sign up"
        >
          Sign Up
        </Button>
      </Flex>
    </form>
  );
}

export default RegisterFormBody;
