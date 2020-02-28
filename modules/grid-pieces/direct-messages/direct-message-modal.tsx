import React, { useState } from "react";
import { Formik, Field } from "formik";
import { UniversalPortal } from "@jesstelford/react-portal-universal";

import matchSorter from "match-sorter";

import {
  AbFlex,
  Button,
  Card,
  Flex,
  Heading,
  Text
} from "../../primitives/styled-rebass";
import { Label, Textarea, Input } from "../../primitives/forms";
import {
  GetAllTeamMembersQuery,
  useCreateDirectMessageMutation,
  LoadDirectMessagesThreadByIdQuery,
  LoadDirectMessagesThreadByIdQueryVariables,
  LoadDirectMessagesThreadByIdDocument,
  User
} from "../../gql-gen/generated/apollo-graphql";
import { FormMessageBox } from "../form-message-box";
import { DirectMessageModalState } from "../../site-layout/grid-layout";
import { TeamMemberList } from "./team-member-list";
import { SelectedTeamMemberList } from "./selected-team-member-list_v2";

interface AddDirectMessageModalProps {
  directMessageModal: string;
  dataGetAllTeamMembers: GetAllTeamMembersQuery | undefined;
  setDirectMessageModal: React.Dispatch<
    React.SetStateAction<DirectMessageModalState>
  >;
  teamId: string;
}

export type MessageBoxState = "isOpen" | "isClosed";

interface FormValueProps {
  filter: string;
  message_text: string;
  invitees: any[];
}

export const AddDirectMessageModal: React.FunctionComponent<AddDirectMessageModalProps> = ({
  dataGetAllTeamMembers,
  directMessageModal,
  setDirectMessageModal,
  teamId
}) => {
  const directMessageModalFlipper =
    directMessageModal === "isOpen" ? "isClosed" : "isOpen";
  const initialMessageBoxState = "isOpen";

  const [messageBox, setMessageBox] = useState<MessageBoxState>(
    initialMessageBoxState
  );

  let initialDirectMessageFormValues: FormValueProps = {
    filter: "",
    message_text: "",
    invitees: []
  };
  let [
    createDirectMessageMutation,
    {
      data: dataCreateDirectMessageMutation,
      error: errorCreateDirectMessageMutation
    }
  ] = useCreateDirectMessageMutation();
  return (
    <>
      {directMessageModal === "isOpen" ? (
        <UniversalPortal selector="#modal">
          <AbFlex
            position="fixed"
            bg="rgba(0, 0, 0, 0.7)"
            top={0}
            left={0}
            right={0}
            bottom={0}
          >
            <AbFlex
              position="fixed"
              alignItems="center"
              justifyContent="center"
              top="10%"
              right="10%"
              bottom="10%"
              left="10%"
              padding="1em"
            >
              <Card p={0} pb={3} width={1}>
                <Flex px={2} alignItems="center" justifyContent="center">
                  <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    initialValues={initialDirectMessageFormValues}
                    onSubmit={({ message_text, invitees }, { resetForm }) => {
                      const userIdArray = invitees.map(
                        (invitee: User) => invitee.id ?? "nope"
                      );
                      let createDirectMessageMutationResponse = createDirectMessageMutation(
                        {
                          variables: {
                            input: {
                              teamId,
                              invitees: userIdArray,
                              message_text
                            }
                          },
                          update: (cache, { data }) => {
                            const cacheReadResult = cache.readQuery<
                              LoadDirectMessagesThreadByIdQuery,
                              LoadDirectMessagesThreadByIdQueryVariables
                            >({
                              query: LoadDirectMessagesThreadByIdDocument,
                              variables: {
                                threadId:
                                  data?.createDirectMessage.threadId ?? "",
                                teamId
                              }
                            });

                            let directMessagesWithUpdate;
                            if (
                              data &&
                              data.createDirectMessage &&
                              cacheReadResult &&
                              cacheReadResult.loadDirectMessagesThreadById &&
                              cacheReadResult.loadDirectMessagesThreadById
                                .messages
                            ) {
                              directMessagesWithUpdate = cacheReadResult.loadDirectMessagesThreadById.messages.concat(
                                // data.createDirectMessage
                                {
                                  id: data.createDirectMessage.threadId,
                                  message:
                                    data.createDirectMessage.message.message,
                                  sentBy:
                                    data.createDirectMessage.message.sentBy
                                }
                              );
                            }

                            cache.writeQuery<
                              LoadDirectMessagesThreadByIdQuery,
                              LoadDirectMessagesThreadByIdQueryVariables
                            >({
                              query: LoadDirectMessagesThreadByIdDocument,
                              variables: {
                                threadId:
                                  data?.createDirectMessage.threadId ?? "",
                                teamId
                              },
                              data: {
                                loadDirectMessagesThreadById: {
                                  id: data?.createDirectMessage.threadId,
                                  invitees:
                                    data?.createDirectMessage.invitees ?? [],
                                  messages: directMessagesWithUpdate ?? []
                                }
                              }
                            });
                          }
                        }
                      );

                      resetForm({
                        values: { filter: "", message_text: "", invitees: [] }
                      });

                      console.log(
                        `
                      createDirectMessageMutationResponse,
                      dataCreateDirectMessageMutation,
                      errorCreateDirectMessageMutation`,
                        {
                          createDirectMessageMutationResponse,
                          dataCreateDirectMessageMutation,
                          errorCreateDirectMessageMutation
                        }
                      );

                      resetForm({
                        values: { filter: "", message_text: "", invitees: [] }
                      });
                    }}
                  >
                    {({
                      errors,
                      setFieldValue,
                      handleReset,
                      handleSubmit,
                      values
                    }) => {
                      // let getTeammates =
                      //   dataGetAllTeamMembers?.getAllTeamMembers.map(
                      //     user => user.name
                      //   ) ?? [];
                      let getTeammates =
                        dataGetAllTeamMembers?.getAllTeamMembers ?? [];

                      let filterTeammates = matchSorter(
                        getTeammates,
                        values.filter,
                        { keys: ["name"] }
                      );
                      return (
                        <form
                          onReset={handleReset}
                          onSubmit={handleSubmit}
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <Heading fontFamily="main">
                            Create New Direct Message
                          </Heading>

                          <Flex my={2} flexDirection="column" width={2 / 3}>
                            <Text>Add Team Member(s)</Text>

                            <Field
                              label="Message"
                              id="filter"
                              name="filter"
                              placeholder="Type to filter Teammates"
                              type="text"
                              component={Input}
                            />
                            <TeamMemberList
                              filterTeammates={filterTeammates}
                              dataGetAllTeamMembers={dataGetAllTeamMembers}
                              invitees={values.invitees}
                              setFieldValue={setFieldValue}
                            />
                            <SelectedTeamMemberList
                              dataGetAllTeamMembers={dataGetAllTeamMembers}
                              invitees={values.invitees}
                              setFieldValue={setFieldValue}
                            />
                            <Label htmlFor="message_text">Message</Label>

                            {errors && errors.message_text ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                {errors.message_text}
                              </FormMessageBox>
                            ) : (
                              ""
                            )}
                            {errorCreateDirectMessageMutation ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                {JSON.stringify(
                                  errorCreateDirectMessageMutation
                                )}
                              </FormMessageBox>
                            ) : (
                              ""
                            )}
                            {dataCreateDirectMessageMutation &&
                            messageBox === "isOpen" ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                success
                              </FormMessageBox>
                            ) : (
                              ""
                            )}

                            <Field
                              label="Message"
                              id="message_text"
                              name="message_text"
                              placeholder="Enter message text"
                              type="textarea"
                              component={Textarea}
                            />
                          </Flex>
                          <Flex width={2 / 3}>
                            <Button
                              width={1 / 2}
                              mr={2}
                              bg="crimson"
                              type="button"
                              onClick={() =>
                                setDirectMessageModal(directMessageModalFlipper)
                              }
                            >
                              cancel
                            </Button>

                            <Button
                              width={1 / 2}
                              ml={2}
                              bg="blue"
                              type="submit"
                            >
                              create message
                            </Button>
                          </Flex>
                        </form>
                      );
                    }}
                  </Formik>
                </Flex>
              </Card>
            </AbFlex>
          </AbFlex>
        </UniversalPortal>
      ) : (
        ""
      )}
    </>
  );
};
