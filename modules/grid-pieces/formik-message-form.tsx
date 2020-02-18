import React, { useEffect, useRef } from "react";
import { Field, Formik, FieldArray } from "formik";

import { useAddMessageToChannelMutation } from "../gql-gen/generated/apollo-graphql";

import {
  AbFlex,
  Button,
  Flex,
  InputContainer,
  MaterialIconBase,
  PositionFlex,
  MessageWrapper
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
  children,
  channelId,
  initialValues
}) => {
  let [addMessageMutation] = useAddMessageToChannelMutation();

  let disabled = channelId ? false : true;

  let listBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listBottomRef && listBottomRef.current) {
      listBottomRef.current.scrollTop = listBottomRef.current.scrollHeight;
    }
  }, [channelId, children]);

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
          <>
            <MessageWrapper ref={listBottomRef}>
              <FileUpload setFieldValue={setFieldValue}>{children}</FileUpload>
            </MessageWrapper>
            <InputContainer>
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
            </InputContainer>
          </>
        );
      }}
    </Formik>
  );
};
