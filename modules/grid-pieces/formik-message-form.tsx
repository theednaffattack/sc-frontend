import React from "react";
import { Field, Formik, FieldArray } from "formik";

import { useAddMessageToChannelMutation } from "../gql-gen/generated/apollo-graphql";

import {
  Button,
  Flex,
  MaterialIconBase,
  PositionFlex,
  AbFlex
} from "../primitives/styled-rebass";
import { Input, StyledForm } from "../primitives/forms";
import { FileUpload } from "../file-upload/file-upload";

interface FileType {
  file: string;
  preview: Blob;
}

interface I_FormikMessageFormProps {
  channelId: string;
  initialValues: {
    channel_message: string;
    files: FileType[];
  };
}

export const FormikMessageForm: React.FC<I_FormikMessageFormProps> = ({
  channelId,
  initialValues
}) => {
  let [addMessageMutation] = useAddMessageToChannelMutation();

  let disabled = channelId ? false : true;
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
      onSubmit={({ channel_message }, { resetForm }) => {
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
        resetForm({ values: { channel_message: "", files: [] } });
      }}
    >
      {({ handleReset, handleSubmit, setFieldValue, values }) => {
        return (
          <Flex flexDirection="column">
            <FieldArray
              name="files"
              render={arrayHelpers => (
                <Flex>
                  {values.files && values.files.length > 0
                    ? values.files.map((file, index) => (
                        <PositionFlex
                          key={index}
                          width="100px"
                          position="relative"
                          mx={2}
                        >
                          <AbFlex position="absolute" top={0} right={0}>
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a file from the list
                            >
                              -
                            </Button>
                          </AbFlex>
                          {file.file}
                          <img
                            src={`${file.preview}`}
                            style={{ maxWidth: "100px" }}
                          />
                        </PositionFlex>
                      ))
                    : ""}
                </Flex>
              )}
            />
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

              <FileUpload setFieldValue={setFieldValue}>
                <Button type="button">
                  <span role="button" aria-controls="filename">
                    <MaterialIconBase
                      name="cloud_upload"
                      size="2rem"
                      fill="#362234"
                    />
                  </span>
                </Button>
              </FileUpload>
              {/* <Label
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
              </Label> */}
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
