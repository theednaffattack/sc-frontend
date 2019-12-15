import { Field, Formik } from "formik";
import React from "react";
import Router from "next/router";

import { NextContext } from "../../typings/NextContext";
import { InputField } from "../../modules/form-fields/input-field";
import {
  ChangePasswordComponent,
  HelloWorldComponent
} from "../../modules/gql-gen/generated/apollo-graphql";
import { getLayout } from "../../modules/site-layout/main-v2";

type TokenWithNextContext = { token: string } & NextContext;

interface ChangePasswordProps {
  ({ pathname, query, token }: TokenWithNextContext): JSX.Element;

  getInitialProps: ({
    pathname,
    query
  }: NextContext) => Promise<{
    pathname: NextContext["pathname"];
    query: NextContext["query"];
    token: string;
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const ChangePassword: ChangePasswordProps = ({ token }) => {
  return (
    <HelloWorldComponent>
      {() => (
        <ChangePasswordComponent>
          {changePassword => (
            <Formik
              onSubmit={async (data, { setErrors }) => {
                try {
                  const response = await changePassword({
                    variables: {
                      data: {
                        password: data.password,
                        token
                      }
                    }
                  });

                  console.log({ response });

                  Router.push("/profile");
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
                  <button type="submit">change password</button>
                </form>
              )}
            </Formik>
          )}
        </ChangePasswordComponent>
      )}
    </HelloWorldComponent>
  );
};

ChangePassword.getInitialProps = async ({ pathname, query }) => {
  if (query && query.token && query.token.constructor === Array) {
    const { token } = query;
    return { pathname, query, token: token[0] };
  }
  if (query && query.token && typeof query.token === "string") {
    const { token } = query;
    return { pathname, query, token };
  } else {
    return { pathname, query, token: "" };
  }
};

ChangePassword.getLayout = getLayout;
ChangePassword.title = "Change password";

export default ChangePassword;
