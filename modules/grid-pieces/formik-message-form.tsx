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
import { FileUploadNoClick } from "../file-upload/file-upload-no-click";
import { FileUpload } from "../file-upload/file-upload";

import { CssFileIcon } from "../icon/css-file-icon";
import { PdfFileIcon } from "../icon/pdf-file-icon";

interface FileWithPreview extends File {
  preview: Blob | string;
}

interface I_FormikMessageFormProps {
  channelId: string;
  teamId: string;
  initialValues: {
    channel_message: string;
    files: FileWithPreview[];
  };
}

export const FormikMessageForm: React.FC<I_FormikMessageFormProps> = ({
  children,
  teamId,
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
      onSubmit={({ channel_message, files }, { resetForm }) => {
        // const convertedFiles = files.map(file => new File([file], "filename"));
        console.log("VIEW ATTRIBUTES TO EXTRACT FILE NAME", {
          files
        });

        if (channelId) {
          addMessageMutation({
            variables: {
              data: {
                channelId,
                teamId,
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
              <FileUploadNoClick setFieldValue={setFieldValue}>
                {children}
              </FileUploadNoClick>
            </MessageWrapper>
            <InputContainer>
              <Flex flexDirection="column">
                <FieldArray
                  name="files"
                  render={arrayHelpers => (
                    <Flex flexDirection="column">
                      {values.files && values.files.length > 0 ? (
                        <Button
                          bg="crimson"
                          type="button"
                          width="150px"
                          onClick={() => {
                            values.files && values.files.length > 0
                              ? values.files.forEach(() =>
                                  arrayHelpers.remove(0)
                                )
                              : null;
                            // arrayHelpers.remove(index);
                          }} // remove a file from the list
                        >
                          remove all
                        </Button>
                      ) : (
                        ""
                      )}
                      <Flex flexDirection="row">
                        {values.files && values.files.length > 0
                          ? values.files.map((file, index) => {
                              return (
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
                                  {typeof file.preview === "string" &&
                                  file.preview === "pdf-svg" ? (
                                    <PdfFileIcon />
                                  ) : (
                                    ""
                                  )}
                                  {typeof file.preview === "string" &&
                                  file.preview === "css-svg" ? (
                                    <CssFileIcon />
                                  ) : (
                                    ""
                                  )}
                                  {file.type.includes("image") &&
                                  typeof file.name === "string" ? (
                                    <img
                                      src={`${file.preview}`}
                                      style={{ maxWidth: "100px" }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </PositionFlex>
                              );
                            })
                          : ""}
                      </Flex>
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
                    <Button type="button" p={0} px={1} m={0} bg="#ccc">
                      <span role="button" aria-controls="files">
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
