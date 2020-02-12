import React from "react";
import { Field, Formik } from "formik";
import { useAddDirectMessageToThreadMutation } from "../gql-gen/generated/apollo-graphql";

import { Flex, MaterialIconBase } from "../primitives/styled-rebass";
import { Label, Input, StyledForm } from "../primitives/forms";

interface I_FormikDirectMessageFormProps {
  teamId: string;
  threadId: string;
  invitees: string[];
  initialValues: {
    direct_message: string;
  };
}

export const FormikDirectMessageForm: React.FC<I_FormikDirectMessageFormProps> = ({
  initialValues,
  invitees,
  teamId,
  threadId
}) => {
  let disabled = threadId ? false : true;

  let [
    addDirectMessageToThreadMutation
  ] = useAddDirectMessageToThreadMutation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
      onSubmit={({ direct_message }, { resetForm }) => {
        if (threadId) {
          addDirectMessageToThreadMutation({
            variables: {
              input: {
                threadId,
                teamId,
                message_text: direct_message,
                invitees
              }
            }
          });
        }
        resetForm({ values: { direct_message: "" } });
      }}
    >
      {({ handleReset, handleSubmit }) => {
        return (
          <Flex flexDirection="column">
            <StyledForm
              flexDirection="row"
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
              <Field
                disabled={disabled}
                label="channel message"
                id="direct_message"
                name="direct_message"
                placeholder="Message: #"
                type="text"
                component={Input}
                mr={2}
              />
              <Label
                width="auto"
                bg="#958993"
                px={2}
                htmlFor="file"
                tabIndex={0}
              >
                <span role="button" aria-controls="filename">
                  <MaterialIconBase
                    name="cloud_upload"
                    size="2rem"
                    fill="#362234"
                  />
                </span>
              </Label>
              <Field
                disabled={disabled}
                label="channel message"
                id="file"
                name="file"
                type="file"
                component={Input}
              />
            </StyledForm>
          </Flex>
        );
      }}
    </Formik>
  );
};
