import React from "react";
import dynamic from "next/dynamic";
import { SubscribeToMoreOptions } from "apollo-boost";

import {
  Box,
  Card,
  Flex,
  Image,
  Text,
  StyledListItem,
  UnstyledList
} from "../primitives/styled-rebass";
import { AvatarPlaceholder } from "../profile/avatar-placeholder";
import {
  FileTypeEnum,
  NewMessageSubDocument,
  useSignS3GetObjectMutation,
  GetAllChannelMessagesQueryResult,
  MeQuery,
  NewMessageSubSubscriptionVariables,
  GetAllChannelMessagesQuery,
  NewMessageSubSubscription,
  S3SignatureAction
} from "../gql-gen/generated/apollo-graphql";
import { PreviewOrDownload } from "./preview_or_download";
import { FileModalState } from "../site-layout/grid-layout_v3";
const PdfFileIcon = dynamic(() => import("../icon/pdf-file-icon"), {
  loading: () => <p>loading pdf file icon...</p>
});
const SvgFileIcon = dynamic(() => import("../icon/svg-file-icon"), {
  loading: () => <p>loading svg file icon...</p>
});
const DocxFileIcon = dynamic(() => import("../icon/docx-file-icon"), {
  loading: () => <p>loading docx file icon...</p>
});
const GeneralFileIcon = dynamic(() => import("../icon/general-file-icon"), {
  loading: () => <p>loading svg file icon...</p>
});

type NewMessageSubType = <
  TSubscriptionData = NewMessageSubSubscription,
  TSubscriptionVariables = NewMessageSubSubscriptionVariables
>(
  options: SubscribeToMoreOptions<
    GetAllChannelMessagesQuery,
    TSubscriptionVariables,
    TSubscriptionData
  >
) => () => void;

interface MessageListProps {
  channelId: string;
  teamId: string;
  data: GetAllChannelMessagesQueryResult["data"];
  dataMe: MeQuery["me"];
  subscribeToMoreMessages: NewMessageSubType;

  fileViewerModalState: FileModalState;
  setFileViewerModalState: React.Dispatch<React.SetStateAction<FileModalState>>;
}

export interface DownloadLinkStateEntities {
  uri: string | null;
  fileId: string | null;
  linkIndex: number | null;
  s3Action: S3SignatureAction | null;
}

export const MessageList: React.FunctionComponent<MessageListProps> = ({
  channelId,
  teamId,
  data,
  dataMe,
  subscribeToMoreMessages,
  // fileViewerModalState,
  setFileViewerModalState
}) => {
  // const initialPreviewLinkState = {
  //   uri: null,
  //   fileId: null
  // };
  // const [previewLinkState, setPreviewLinkState] = useState(
  //   initialPreviewLinkState
  // );
  React.useEffect(() => {
    if (subscribeToMoreMessages) {
      let newMessageArgs: NewMessageSubSubscriptionVariables = {
        data: {
          channelId,

          teamId,
          message: "",
          sentTo: "",
          files: []
        }
      };
      let unsubscribe = subscribeToMoreMessages({
        document: NewMessageSubDocument,
        variables: newMessageArgs,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newFeedItem = subscriptionData.data.newMessageSub;
          console.log("IS NEWFEEDITEM?", {
            newFeedItem
          });

          const newFeed = Object.assign({}, prev, {
            getAllChannelMessages: [...prev.getAllChannelMessages, newFeedItem]
          });

          return newFeed;
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [data, channelId, teamId]);

  const initialDownloadLinkState: DownloadLinkStateEntities = {
    uri: null,
    fileId: null,
    linkIndex: null,
    s3Action: null
  };

  const [downloadLinkState, setDownloadLinkState] = React.useState<
    DownloadLinkStateEntities
  >(initialDownloadLinkState);

  const [
    signS3GetObjectMutation
    // { data: dataSignS3GetObject }
  ] = useSignS3GetObjectMutation();

  if (data && dataMe) {
    return (
      <UnstyledList p={0}>
        {data.getAllChannelMessages.map(channelMessage => {
          let { created_at, files, id, message, sentBy } = channelMessage;
          let getUserId =
            dataMe && dataMe.id ? dataMe.id : "unable to determine user";
          let fromMe =
            sentBy.id === getUserId ? "isLoggedInUser" : "is_NOT_LoggedInUser";

          return (
            <StyledListItem
              // p={3}
              p={0}
              py={3}
              setBackgroundColor="rgba(218, 223, 225, 0.5)"
              key={id}
            >
              <Flex flexDirection="column">
                <Text mx="auto" my={2} color="gray">
                  {created_at ? created_at : ""}
                </Text>
                <Flex
                  flexDirection="row"
                  // border="2px pink dashed"
                  // alignItems="center"
                  justifyContent="center"
                >
                  {fromMe === "isLoggedInUser" ? (
                    <Flex flexDirection="column" alignItems="center">
                      <AvatarPlaceholder size="2em" />
                      <Text>{sentBy.name}</Text>
                    </Flex>
                  ) : (
                    ""
                  )}

                  <Card
                    width={[1, 1, 2 / 3, 2 / 3, 1]}
                    mx={2}
                    sx={{
                      border: "1px rgba(0,0,0,0.08)  solid",
                      boxShadow: "1px 1px 11px 1px rgba(0,0,0,0.03)"
                    }}
                    // flexDirection="column"
                    // border="lime"
                  >
                    <Flex flexWrap="wrap">
                      {files
                        ? files.map((file, fileIndex) => {
                            const normalImage =
                              file &&
                              file.uri &&
                              file.file_type === FileTypeEnum.Image &&
                              !file.uri.includes("svg");
                            const svgImage =
                              file &&
                              file.uri &&
                              file.file_type === FileTypeEnum.Image &&
                              file.uri.includes("svg");

                            const pdfFile =
                              file && file.file_type === FileTypeEnum.Pdf;

                            const docxFile =
                              file && file.file_type === FileTypeEnum.Doc;

                            // FOR UNKNOWN FILES
                            if (
                              file &&
                              file.file_type === FileTypeEnum["Other"]
                            ) {
                              return (
                                <Box key={file.id} width={1 / 2}>
                                  <Box key={file.id} width="150px">
                                    <GeneralFileIcon />
                                  </Box>
                                  <PreviewOrDownload
                                    downloadLinkState={downloadLinkState}
                                    file={file}
                                    fileIndex={fileIndex}
                                    setDownloadLinkState={setDownloadLinkState}
                                    setFileViewerModalState={
                                      setFileViewerModalState
                                    }
                                    signS3GetObjectMutation={
                                      signS3GetObjectMutation
                                    }
                                  />
                                </Box>
                              );
                            }

                            if (normalImage && file) {
                              return (
                                <Box key={file.id} width={1 / 2}>
                                  <Image src={file.uri} />

                                  <PreviewOrDownload
                                    downloadLinkState={downloadLinkState}
                                    file={file}
                                    fileIndex={fileIndex}
                                    setDownloadLinkState={setDownloadLinkState}
                                    setFileViewerModalState={
                                      setFileViewerModalState
                                    }
                                    signS3GetObjectMutation={
                                      signS3GetObjectMutation
                                    }
                                  />
                                </Box>
                              );
                            }
                            if (svgImage && file) {
                              return (
                                <Flex key={file.id} width={1}>
                                  <Box width="150px">
                                    <SvgFileIcon />
                                  </Box>

                                  <PreviewOrDownload
                                    downloadLinkState={downloadLinkState}
                                    file={file}
                                    fileIndex={fileIndex}
                                    setDownloadLinkState={setDownloadLinkState}
                                    setFileViewerModalState={
                                      setFileViewerModalState
                                    }
                                    signS3GetObjectMutation={
                                      signS3GetObjectMutation
                                    }
                                  />
                                </Flex>
                              );
                            }
                            if (pdfFile && file) {
                              return (
                                <Flex
                                  key={file.id}
                                  // border="lime"
                                  width={1}
                                >
                                  <Flex width="150px">
                                    <PdfFileIcon />
                                  </Flex>

                                  <PreviewOrDownload
                                    downloadLinkState={downloadLinkState}
                                    file={file}
                                    fileIndex={fileIndex}
                                    setDownloadLinkState={setDownloadLinkState}
                                    setFileViewerModalState={
                                      setFileViewerModalState
                                    }
                                    signS3GetObjectMutation={
                                      signS3GetObjectMutation
                                    }
                                  />
                                </Flex>
                              );
                            }
                            if (docxFile && file) {
                              return (
                                <Flex key={file.id} width={1}>
                                  <Flex width="150px">
                                    <DocxFileIcon />
                                  </Flex>

                                  <PreviewOrDownload
                                    downloadLinkState={downloadLinkState}
                                    file={file}
                                    fileIndex={fileIndex}
                                    setDownloadLinkState={setDownloadLinkState}
                                    setFileViewerModalState={
                                      setFileViewerModalState
                                    }
                                    signS3GetObjectMutation={
                                      signS3GetObjectMutation
                                    }
                                  />
                                </Flex>
                              );
                            }
                          })
                        : ""}
                    </Flex>
                    {message}
                  </Card>
                  {fromMe === "is_NOT_LoggedInUser" ? (
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      // border="crimson"
                    >
                      <AvatarPlaceholder size="2em" />
                      <Text> {sentBy.name}</Text>
                    </Flex>
                  ) : (
                    ""
                  )}
                </Flex>
              </Flex>
            </StyledListItem>
          );
        })}{" "}
      </UnstyledList>
    );
  }
  return (
    <UnstyledList p={0}>
      <li>no list</li>
    </UnstyledList>
  );
};
