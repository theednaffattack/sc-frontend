import React from "react";
import { Field, Formik } from "formik";
import { useAddMessageToChannelMutation } from "../gql-gen/generated/apollo-graphql";

import { Flex, MaterialIconBase } from "../primitives/styled-rebass";
import { Label, Input, StyledForm } from "../primitives/forms";

interface I_FormikMessageFormProps {
  channelId: string;
  initialValues: {
    [key: string]: string;
  };
}

export const FormikMessageForm: React.FC<I_FormikMessageFormProps> = ({
  channelId,
  initialValues
}) => {
  let [
    addMessageMutation,
    { data: dataAddMessageToChannel }
  ] = useAddMessageToChannelMutation();

  let disabled = channelId ? false : true;
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
      onSubmit={({ channel_message }, { resetForm }) => {
        console.log("value when submitting: channel_message", {
          channel_message
        });
        if (channelId) {
          addMessageMutation({
            variables: {
              data: {
                channelId,
                invitees: [],
                message: channel_message,
                sentTo: ""
              }
            }
          });
        }
        resetForm({ values: { channel_message: "" } });
        console.log("TEST OF RESET FORM");

        if (dataAddMessageToChannel) {
          console.log("SUBMIT SUCCESS, ADD MESSAGE TO CHANNEL");
        }
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
                id="channel_message"
                name="channel_message"
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
