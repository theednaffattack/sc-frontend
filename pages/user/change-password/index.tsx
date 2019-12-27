import { Field, Formik } from "formik";
import React from "react";
// import Router from "next/router";

import { NextContext } from "../../../typings/NextContext";
import { InputField } from "../../../modules/form-fields/input-field";
import {
  ChangePasswordFromContextUseridComponent,
  HelloWorldComponent
} from "../../../modules/gql-gen/generated/apollo-graphql";
import { getLayout } from "../../../modules/site-layout/main-v2";
import { Button } from "../../../modules/primitives/styled-rebass";

interface ChangePasswordProps {
  ({ pathname, query }: NextContext): JSX.Element;

  getInitialProps: ({
    pathname,
    query
  }: NextContext) => Promise<{
    pathname: NextContext["pathname"];
    query: NextContext["query"];
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const ChangePassword: ChangePasswordProps = () => {
  return (
    <HelloWorldComponent>
      {({ data }) => {
        console.log("VIEW HELLO WORLD RESPONSE", data);
        return (
          <ChangePasswordFromContextUseridComponent>
            {changePassword => (
              <Formik
                onSubmit={async (data, { setErrors }) => {
                  try {
                    const response = await changePassword({
                      variables: {
                        data: {
                          password: data.password
                        }
                      }
                    });

                    console.log({ response });

                    // Router.push("/profile");
                  } catch (error) {
                    const displayErrors: { [key: string]: string } = {};

                    let myErrors =
                      error.graphQLErrors[0].extensions.exception
                        .validationErrors;

                    myErrors.forEach((validationError: any) => {
                      Object.values(validationError.constraints).forEach(
                        (message: any) => {
                          displayErrors[validationError.property] = message;
                        }
                      );
                    });
                    return setErrors(displayErrors);

                    // const errors: { [key: string]: string } = {};
                    // err.graphQLErrors[0].validationErrors.forEach(
                    //   (validationErr: any) => {
                    //     Object.values(validationErr.constraints).forEach(
                    //       (message: any) => {
                    //         errors[validationErr.property] = message;
                    //       }
                    //     );
                    //   }
                    // );
                    // setErrors(errors);
                  }
                }}
                initialValues={{
                  password: ""
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="password"
                      type="password"
                      placeholder="change password"
                      component={InputField}
                    />
                    <Button bg="blue" type="submit">
                      change password
                    </Button>
                  </form>
                )}
              </Formik>
            )}
          </ChangePasswordFromContextUseridComponent>
        );
      }}
    </HelloWorldComponent>
  );
};

ChangePassword.getInitialProps = async ({ pathname, query }) => {
  console.log("OH NOOOOOO!", { query });

  return { pathname, query };
};

ChangePassword.getLayout = getLayout;
ChangePassword.title = "Change password";

export default ChangePassword;
