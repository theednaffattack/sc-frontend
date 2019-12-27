import { Field, Formik } from "formik";
import React from "react";
import Router from "next/router";

import { ForgotPasswordComponent } from "../modules/gql-gen/generated/apollo-graphql";
import { getLayout } from "../modules/site-layout/main-v2";
import { InputField } from "../modules/form-fields/input-field";
import { Button } from "../modules/primitives/styled-rebass";

interface IForgotPassword {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}
// InputField;

const ForgotPassword: IForgotPassword = () => {
  return (
    <ForgotPasswordComponent>
      {forgotPassword => (
        <Formik
          // validateOnBlur={false}
          // validateOnChange={false}
          onSubmit={async (data, { setErrors }) => {
            try {
              let forgotResponse = await forgotPassword({
                variables: data
              });

              console.log("forgotResponse", forgotResponse);

              Router.push("/check-email");
            } catch (error) {
              const displayErrors: { [key: string]: string } = {};

              let myErrors =
                error.graphQLErrors[0].extensions.exception.validationErrors;

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
            email: ""
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="email" placeholder="email" component={InputField} />
              <Button bg="blue" type="submit">
                submit
              </Button>
            </form>
          )}
        </Formik>
      )}
    </ForgotPasswordComponent>
  );
};

ForgotPassword.getLayout = getLayout;
ForgotPassword.title = "Forgot password";

export default ForgotPassword;
