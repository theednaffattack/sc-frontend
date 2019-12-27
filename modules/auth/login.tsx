// import { Field, Formik } from "formik";
import React from "react";
import {
  Button as ButtonBase,
  Flex as FlexBase,
  // Text,
  Card as CardBase,
  Heading,
  // Box,
  BoxProps,
  ButtonProps
} from "rebass/styled-components";
import styled, { StyledComponent } from "styled-components";
import {
  boxShadow,
  borderRadius,
  minHeight,
  maxWidth,
  space,
  width,
  height,
  BorderRadiusProps,
  BoxShadowProps,
  SpaceProps,
  HeightProps,
  WidthProps
} from "styled-system";
// import Router from "next/router";

// import { InputField } from "../form-fields/input-field";
// import { LoginComponent, MeQuery } from "../gql-gen/generated/apollo-graphql";
// import { ME_QUERY } from "../gql-gen/query-documents/user/queries/Me";
// import { Checkbox } from "./checkbox";
import { SignUpLink } from "./sign-up-link";

// import { ICardProps, IButtonProps } from "./types";
import { NextContext } from "../../typings/NextContext";

export interface ICardProps
  extends BorderRadiusProps,
    BoxProps,
    BoxShadowProps {}

export interface IButtonProps
  extends ButtonProps,
    BoxShadowProps,
    BorderRadiusProps,
    SpaceProps,
    WidthProps,
    HeightProps {}

export const Button: StyledComponent<
  React.FunctionComponent<IButtonProps>,
  any
> = styled(ButtonBase)`
  ${boxShadow}
  ${borderRadius}
  ${space}
  ${width}
  ${height}

  :focus {
    border: 4px lawngreen solid;
    border-radius: 20px;
    outline: none;
  }

  background-image: linear-gradient(
    0deg,
    rgb(210, 48, 120) 6%,
    rgb(254, 97, 97) 74%,
    rgb(255, 121, 85) 100%
  );
`;

const Flex = styled(FlexBase)`
  ${minHeight}

  background-image: linear-gradient(
    0deg,
    rgba(210, 48, 120, 1) 6%,
    rgba(254, 97, 97, 1) 74%,
    rgba(255, 121, 85, 1) 100%
  );
`;

const InnerFlex = styled(FlexBase)`
  ${minHeight}
  background: url('/static/images/login/bg.png') center center no-repeat;
  background-size: cover;
`;

const ContentFlex = styled(FlexBase)`
  ${minHeight}
`;

const Card: StyledComponent<React.FunctionComponent<ICardProps>, any> = styled(
  CardBase
)`
  ${maxWidth}
  ${borderRadius}
  ${boxShadow}
`;

interface LoginModuleProps {
  referer?: NextContext["referer"];
}

// @ts-ignore
const Login: React.FunctionComponent<LoginModuleProps> = ({ children }) => {
  return (
    <Flex minHeight="100vh">
      <InnerFlex width={[1]} minHeight="100vh">
        <ContentFlex
          mt={[0, 5, 0]}
          flexDirection="column"
          width={[1]}
          justifyContent="center"
          alignItems="center"
        >
          <Card
            mx={3}
            width={1}
            maxWidth={["350px", "350px"]}
            p={4}
            borderRadius="10px"
            bg="rgb(242,242,242)"
            boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
          >
            <ContentFlex mt={3} mb={4} justifyContent="center">
              <Heading color="text" fontSize={[5]} fontFamily="main">
                Sign in
              </Heading>
            </ContentFlex>
            {children}
            {/* <Text>Referer: {referer}</Text> */}
            {/* <LoginComponent>
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
                      console.log(
                        "myErrors",
                        JSON.stringify(myErrors, null, 2)
                      );
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
                      Router.push(
                        `/user/profile?username=${response.data.login.name}`,
                        `/user/profile`
                      );
                    } else {
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
                      <ContentFlex my={2}>
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
                      </ContentFlex>
                      <ContentFlex justifyContent="center">
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
                      </ContentFlex>
                    </form>
                  )}
                </Formik>
              )}
            </LoginComponent>
             */}
          </Card>
          <SignUpLink width={["100%", "500px"]} />
        </ContentFlex>
      </InnerFlex>
    </Flex>
  );
};

export default Login;
