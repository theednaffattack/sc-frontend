import React from "react";
import { Field } from "formik";

import { InputField } from "./input-field";

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
}

interface EditUserInfoFormBodyProps {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  values: FormValues;
}

const EditUserInfoFormBody: React.FunctionComponent<EditUserInfoFormBodyProps> = ({
  handleSubmit,
  values
}) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Field
        label="first name"
        name="firstName"
        placeholder="enter first name"
        component={InputField}
        value={values.firstName}
      />
      <Field
        label="last name"
        name="lastName"
        placeholder="enter last name"
        component={InputField}
        value={values.lastName}
      />
      <Field
        label="email"
        name="email"
        placeholder="enter email"
        component={InputField}
        value={values.email}
      />
      {/* <Field
        label="password"
        name="password"
        type="password"
        component={InputField}
        value={values.password}
      /> */}
    </form>
  );
};

export default EditUserInfoFormBody;
