import React, { useRef, useEffect } from "react";
import { Field, Formik, FieldArray } from "formik";
import { useAddDirectMessageToThreadMutation } from "../gql-gen/generated/apollo-graphql";

import {
  AbFlex,
  Button,
  Flex,
  InputContainer,
  MaterialIconBase,
  MessageWrapper,
  PositionFlex
} from "../primitives/styled-rebass";
import { Label, Input, StyledForm } from "../primitives/forms";
import { FileUpload } from "../file-upload/file-upload";

interface FileType {
  file: string;
  preview: Blob;
}

interface I_FormikDirectMessageFormProps {
  teamId: string;
  threadId: string;
  invitees: string[];
  initialValues: {
    direct_message: string;
    files: FileType[];
  };
}

export const FormikDirectMessageForm: React.FC<I_FormikDirectMessageFormProps> = ({
  children,
  initialValues,
  invitees,
  teamId,
  threadId
}) => {
  let listBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listBottomRef && listBottomRef.current) {
      listBottomRef.current.scrollTop = listBottomRef.current.scrollHeight;
    }
  }, [threadId, children]);

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
        resetForm({ values: { direct_message: "", files: [] } });
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
            </InputContainer>
          </>
        );
      }}
    </Formik>
  );
};
