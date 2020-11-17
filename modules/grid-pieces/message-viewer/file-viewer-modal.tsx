import React from "react";
import dynamic from "next/dynamic";
import { UniversalPortal } from "@jesstelford/react-portal-universal";
// import GoogleDocsViewer from "./google-docs-viewer";
// import FileViewer from "react-file-viewer";

import MaterialIcon from "../../icon/m-icon";

const GoogleDocsViewer = dynamic(() => import("./google-docs-viewer"), {
  ssr: false
});

import {
  AbFlex,
  Button,
  Card,
  Flex,
  Text
} from "../../primitives/styled-rebass";
import { FileModalState } from "../../site-layout/grid-layout_v3";
import { useSignS3GetObjectMutation } from "../../gql-gen/generated/apollo-graphql";

interface AddDirectMessageModalProps {
  fileViewerModalState: FileModalState;
  setFileViewerModalState: React.Dispatch<React.SetStateAction<FileModalState>>;
  teamId: string;
}

export type MessageBoxState = "isOpen" | "isClosed";

export const FileViewerModal: React.FunctionComponent<AddDirectMessageModalProps> = ({
  // dataGetAllTeamMembers,
  fileViewerModalState,
  setFileViewerModalState
  // teamId
}) => {
  const [signS3GetObjectMut, { data: dataS3 }] = useSignS3GetObjectMutation();

  React.useEffect(() => {
    if (fileViewerModalState.uri && fileViewerModalState.id) {
      signS3GetObjectMut({
        variables: {
          files: [
            {
              id: fileViewerModalState.id,
              uri: fileViewerModalState.uri
            }
          ]
        }
      });
    }
  }, [fileViewerModalState.uri, fileViewerModalState.id]);

  return (
    <>
      {fileViewerModalState.view === "isOpen" ? (
        <UniversalPortal selector="#modal">
          <AbFlex
            // position="fixed"
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.7)"
            alignItems="center"
            // bottom="10%"
            justifyContent="center"
            flexDirection="column"
          >
            <Flex
              // alignItems="center"
              // bottom="10%"
              // justifyContent="center"
              // left="10%"
              padding="1em"
              // position="fixed"
              // right="10%"
              // top="10%"
              width="600px"
              flexDirection="column"
              style={{
                overflowY: "auto"
              }}
            >
              <Card p={0} pb={3} width={1}>
                <Flex px={2} alignItems="center" justifyContent="center">
                  <Flex
                    px={2}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <MaterialIcon
                      fill="grey"
                      name="cloud_download"
                      size="2em"
                    />

                    {dataS3?.signS3GetObject.signatures.map((sig, sigIndex) => (
                      <a
                        href={sig.signedRequest}
                        key={`${sigIndex}-${sig.uri}`}
                      >
                        <Text fontSize="11px">download</Text>
                      </a>
                    ))}
                  </Flex>
                  <Flex
                    px={2}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Button
                      p={0}
                      type="button"
                      onClick={() =>
                        setFileViewerModalState({
                          id: undefined,
                          uri: undefined,
                          view: "isClosed"
                        })
                      }
                    >
                      <MaterialIcon fill="pink" name="close" size="2em" />
                    </Button>

                    <a
                      href="#"
                      onClick={() => {
                        // some stuff
                        setFileViewerModalState({
                          id: undefined,
                          uri: undefined,
                          view: "isClosed"
                        });
                      }}
                    >
                      <Text fontSize="11px">close</Text>
                    </a>
                  </Flex>
                </Flex>

                <Flex justifyContent="center">
                  {fileViewerModalState.uri ? (
                    <GoogleDocsViewer
                      width="600px"
                      height="780px"
                      fileUrl={fileViewerModalState.uri}
                    />
                  ) : (
                    ""
                  )}
                </Flex>
              </Card>
            </Flex>
          </AbFlex>
        </UniversalPortal>
      ) : (
        ""
      )}
    </>
  );
};
