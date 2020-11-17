import React from "react";

import { Button, Flex, Text } from "../primitives/styled-rebass";
import Icon from "../icon/m-icon";
import { S3SignatureAction } from "../gql-gen/generated/apollo-graphql";
import DownloadLink from "./message-viewer/download-link";

interface PreviewOrDownloadProps {
  downloadLinkState: any;
  file: any;
  fileIndex: number;
  setDownloadLinkState: any;
  setFileViewerModalState: any;
  signS3GetObjectMutation: any;
}

export const PreviewOrDownload: React.FC<PreviewOrDownloadProps> = ({
  downloadLinkState,
  file,
  fileIndex,
  setDownloadLinkState,
  setFileViewerModalState,
  signS3GetObjectMutation
}) => {
  return (
    <Flex alignItems="center">
      <Button
        type="button"
        onClick={() => {
          setFileViewerModalState({
            id: file.id,
            uri: file.uri,
            view: "isOpen"
          });

          signS3GetObjectMutation({
            variables: {
              action: S3SignatureAction.GetObject,
              files: [{ id: file.id, uri: file.uri }]
            }
          });
        }}
      >
        preview
      </Button>
      <Flex pl={2}>
        <a
          href="#"
          onClick={event => {
            event.preventDefault();
            setDownloadLinkState({
              fileId: file.id,
              uri: file.uri,
              linkIndex: fileIndex,
              s3Action: S3SignatureAction.GetObject
            });
          }}
        >
          <Flex alignItems="center">
            <Text fontFamily="main">download</Text>
            <Icon size="2em" fill="grey" name="cloud_download" />
          </Flex>
        </a>
        {downloadLinkState.s3Action &&
        downloadLinkState.uri &&
        downloadLinkState.fileId === file.id ? (
          <DownloadLink
            s3Action={downloadLinkState.s3Action}
            uri={downloadLinkState.uri}
            fileId={downloadLinkState.fileId}
          />
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
};
