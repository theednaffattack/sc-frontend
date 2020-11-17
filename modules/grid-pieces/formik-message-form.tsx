import React, { useEffect, useRef } from "react";
import { Field, Formik, FieldArray } from "formik";
import axios, { AxiosRequestConfig } from "axios";
import { ApolloError, ExecutionResult } from "apollo-boost";
import { MutationFunctionOptions } from "react-apollo";
import dynamic from "next/dynamic";
// import dFormat from "date-fns/format";

import {
  AddMessageToChannelMutation,
  AddMessageToChannelMutationVariables,
  FileTypeEnum,
  ImageSubInput,
  SignS3MutationVariables,
  SignS3Mutation,
  SignedS3Payload,
  useAddMessageToChannelMutation,
  useSignS3Mutation,
  S3SignatureAction
} from "../gql-gen/generated/apollo-graphql";

import {
  AbFlex,
  // Box,
  // Text
  Button,
  Flex,
  InputContainer,
  MaterialIconBase,
  MessageWrapper,
  PositionFlex
} from "../primitives/styled-rebass";
import { Input, StyledForm } from "../primitives/forms";
import { FileUploadNoClick } from "../file-upload/file-upload-no-click";
import { FileUpload } from "../file-upload/file-upload";

// import { CssFileIcon } from "../icon/css-file-icon";
// import { PdfFileIcon } from "../icon/pdf-file-icon";
// import { GeneralFileIcon } from "../icon/general-file-icon";

const PdfFileIcon = dynamic(() => import("../icon/pdf-file-icon"), {
  loading: () => <p>loading pdf file icon...</p>
});
const CssFileIcon = dynamic(() => import("../icon/svg-file-icon"), {
  loading: () => <p>loading svg file icon...</p>
});
const GeneralFileIcon = dynamic(() => import("../icon/general-file-icon"), {
  loading: () => <p>loading svg file icon...</p>
});

// /** Basic Known File Types */
// export enum FileTypeEnum {
//   /** CSS */
//   CSS = "text/css",
//   /** CSV */
//   CSV = "text/csv",
//   /** IMAGE - many differnt image types */
//   IMAGE = "image/*",
//   /** OWNER */
//   PDF = "application/pdf",
//   /** MEMBER */
//   SVG = "svg",
//   /** UNKNOWN AND UNREGISTERED FILE TYPES */
//   OTHER = "other / unknown"
// }

interface FileWithPreview extends ImageSubInput {
  preview: string;
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
  // @ts-ignore
  teamId,
  channelId,
  initialValues
}) => {
  const [
    signS3Mutation,
    {
      data: dataSignS3Mutation,
      error: errorSignS3Mutation,
      loading: loadingSignS3Mutation
    }
  ] = useSignS3Mutation();

  // @ts-ignore
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
      onSubmit={async ({ channel_message, files }, { resetForm }) => {
        if (channelId && files && files.length > 0) {
          submitWithFiles({
            addMessageMutation,
            channelId,
            channel_message,
            data: dataSignS3Mutation,
            files,
            error: errorSignS3Mutation,
            loading: loadingSignS3Mutation,
            signS3Mutation,
            teamId
          });
        }

        if ((channelId && !files) || (channelId && files && files.length < 1)) {
          submitWithoutFiles({
            addMessageMutation,
            channelId,
            channel_message,
            teamId
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
                                  {/* Get extension and match to a MIME-types list. (http://www.htmlquick.com/es/reference/mime-types.html) */}

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
                                  {typeof file.preview === "string" &&
                                  file.preview === "general-file" ? (
                                    <GeneralFileIcon />
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

// function formatFilename(file: any) {
//   const filename = file.name;

//   const date = dFormat(new Date(), "YYYYMMDD");

//   const randomString = Math.random()
//     .toString(36)
//     .substring(2, 7);

//   const fileExtension = file.type.substring(
//     file.type.lastIndexOf("/") + 1,
//     file.type.length
//   );

//   const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");

//   const restrictedLengthCleanFileName = cleanFileName.substring(0, 40);

//   const newFilename = `${date}-${randomString}-${restrictedLengthCleanFileName}.${fileExtension}`;

//   return newFilename;
// }

interface SubmitWithoutFilesProps {
  addMessageMutation: (
    options?:
      | MutationFunctionOptions<
          AddMessageToChannelMutation,
          AddMessageToChannelMutationVariables
        >
      | undefined
  ) => Promise<ExecutionResult<AddMessageToChannelMutation>>;
  channelId: string;
  channel_message: string;
  teamId: string;
}
async function submitWithoutFiles({
  addMessageMutation,
  channelId,
  channel_message,
  // error,
  // loading,
  teamId
}: SubmitWithoutFilesProps) {
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

interface UploadToS3Props {
  file: FileWithPreview;
  signedRequest: SignedS3Payload["signatures"][0]["signedRequest"];
  // signedRequest: ({
  //   __typename?: "SignedS3SubPayload" | undefined;
  // } & Pick<SignedS3SubPayload, "url" | "signedRequest">)["signedRequest"];
}

async function uploadToS3({ file, signedRequest }: UploadToS3Props) {
  const options: AxiosRequestConfig = {
    headers: {
      "Content-Type": file.type
    }
  };

  // const theFile = await this.makeBlobUrlsFromReference(file);

  console.log("WHAT AM I UPLOADING?", { file, signedRequest });

  let s3ReturnInfo = await axios
    .put(signedRequest, file, options)
    .catch(error => console.error({ error }));

  return s3ReturnInfo;
}

interface SubmitWithFilesProps {
  addMessageMutation: (
    options?:
      | MutationFunctionOptions<
          AddMessageToChannelMutation,
          AddMessageToChannelMutationVariables
        >
      | undefined
  ) => Promise<ExecutionResult<AddMessageToChannelMutation>>;
  channelId: string;
  channel_message: string;
  data: SignS3Mutation | undefined;
  error: ApolloError | undefined;
  files: FileWithPreview[];
  loading: boolean;
  signS3Mutation: (
    options?:
      | MutationFunctionOptions<SignS3Mutation, SignS3MutationVariables>
      | undefined
  ) => Promise<ExecutionResult<SignS3Mutation>>;
  teamId: string;
}
async function submitWithFiles({
  addMessageMutation,
  channelId,
  channel_message,
  // data,
  // error,
  files,
  // loading,
  signS3Mutation,
  teamId
}: SubmitWithFilesProps) {
  let preppedFiles = files.map(file => {
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      path: file.path,
      webkitRelativePath: file.webkitRelativePath,
      size: file.size,
      type: file.type
    };
  });

  let viewSignS3 = await signS3Mutation({
    variables: {
      files: preppedFiles,
      action: S3SignatureAction.PutObject
    }
  });

  if (viewSignS3.data?.signS3.signatures) {
    const { signatures } = viewSignS3.data?.signS3;
    const newSignatures = viewSignS3.data?.signS3.signatures;

    if (signatures) {
      await Promise.all(
        signatures.map(async (signature, signatureIndex: number) => {
          return await uploadToS3({
            file: files[signatureIndex],
            signedRequest: signature.signedRequest
          }).catch(error =>
            console.error(JSON.stringify({ ...error }, null, 2))
          );
        })
      );

      addMessageMutation({
        variables: {
          data: {
            channelId,
            teamId,
            invitees: [],
            message: channel_message,
            sentTo: "",
            images: newSignatures.map(image => image.uri),
            files: signatures.map((file, fileIndex) => {
              return {
                uri: file.uri,
                file_type: fileReducer(files[fileIndex].type)
              };
            })
          }
        },
        update: (cache, { data, errors, context }) => {
          console.log("LET'S SEE EVERYTHING", { cache, data, errors, context });
        }
      });
    }
  }
}

function fileReducer(fileType: string) {
  if (fileType === "text/css") {
    return FileTypeEnum["Css"];
  }
  if (fileType.includes("csv")) {
    return FileTypeEnum["Csv"];
  }
  if (fileType === "text/markdown") {
    return FileTypeEnum["Md"];
  }
  if (fileType.includes("image")) {
    return FileTypeEnum["Image"];
  }
  if (fileType === "application/pdf") {
    return FileTypeEnum["Pdf"];
  }
  if (fileType.includes("svg")) {
    return FileTypeEnum["Svg"];
  }
  if (fileType.includes("docx")) {
    return FileTypeEnum["Doc"];
  }
  console.log("Returning Other");
  return FileTypeEnum["Other"];
}
