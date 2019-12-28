import { Field, Formik } from "formik";
import React from "react";
import Router from "next/router";

import { Box, Flex, Text } from "../primitives/styled-rebass";
import { LoginComponent, MeQuery } from "../gql-gen/generated/apollo-graphql";
import { ME_QUERY } from "../gql-gen/query-documents/user/queries/Me";
import { InputField } from "../form-fields/input-field";
import { Checkbox } from "./checkbox";
import { Button } from "./login";

interface LoginFormProps {
  authState: boolean;
  hocLogin: any;
  hocLogout: any;
  hocLoginState: boolean;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  hocLogin
}) => {
  return (
    <LoginComponent>
      {login => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (data, { setErrors }) => {
            let response;
            try {
              response = await login({
                variables: data,
                update: (cache, { data }) => {
                  if (!data || !data.login) {
                    console.log("!DATA || !DATA.LOGIN");

                    return;
                  }

                  cache.writeQuery<MeQuery>({
                    query: ME_QUERY,
                    data: {
                      __typename: "Query",
                      me: data.login
                    }
                  });
                  console.log("AFTER WRITEQUERY");
                }
              });
              // Router.push("/login");
            } catch (error) {
              const displayErrors: { [key: string]: string } = {};

              let myErrors = error.graphQLErrors; //.extensions.exception.validationErrors;
              console.log("myErrors", JSON.stringify(myErrors, null, 2));
              myErrors.forEach((errorThing: any) => {
                displayErrors[errorThing.path[0]] = errorThing.message;
              });

              myErrors.forEach((validationError: any) => {
                Object.values(validationError.constraints).forEach(
                  (message: any) => {
                    displayErrors[validationError.property] = message;
                  }
                );
              });

              return setErrors(displayErrors);

              // return setErrors({
              //   email: "invalid login"
              // });
            }

            if (response && response.data && !response.data.login) {
              setErrors({
                email: "invalid login"
              });
              return;
            }

            // let pathname =
            //   referer && referer.length > 0 ? referer : "/welcome";
            console.log("IS THIS SUBMITTING?", response);
            if (
              response &&
              response.data &&
              response.data.login &&
              response.data.login.name
            ) {
              hocLogin();

              Router.push(
                `/user/profile?username=${response.data.login.name}`,
                `/user/profile`
              );
            } else {
              hocLogin();

              Router.push(`/user/profile`);
            }
          }}
          initialValues={{
            email: "",
            password: "",
            keepMeSigned: true
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                label="email"
                id="email"
                name="email"
                placeholder="input email"
                type="text"
                component={InputField}
              />
              <Field
                label="password"
                id="password"
                name="password"
                placeholder="input password"
                type="password"
                component={InputField}
              />
              <Flex my={2}>
                <Box mr="auto">
                  <Text htmlFor="keepMeSignedIn" fontFamily="main">
                    Keep me logged in
                  </Text>
                </Box>
                <Box mr={2}>
                  <label>
                    <Field
                      id="keepMeSignedIn"
                      name="keepMeSignedIn"
                      type="checkbox"
                      shadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
                      component={Checkbox}
                    />
                  </label>
                </Box>
              </Flex>
              <Flex justifyContent="center">
                <Button
                  mt={2}
                  width="340px"
                  height="47px"
                  borderRadius="30px"
                  boxShadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
                  type="submit"
                >
                  <Text fontFamily="montserrat">Login</Text>
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      )}
    </LoginComponent>
  );
};
