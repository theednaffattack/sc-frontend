import React, { useState } from "react";
import { Formik, Field } from "formik";
import { UniversalPortal } from "@jesstelford/react-portal-universal";

import {
  AbFlex,
  Button,
  Card,
  Flex,
  StyledHr,
  Text,
} from "../../modules/primitives/styled-rebass";
// import { Modal } from "../primitives/modal";
import { Input, Label } from "../../modules/primitives/forms";
import { useCreateChannelMutation } from "../../modules/gql-gen/generated/apollo-graphql";
import { FormMessageBox } from "./form-message-box";

interface AddChannelModalProps {
  channelModal: string;
  setChannelModal: React.Dispatch<React.SetStateAction<string>>;
  teamId: string;
}

export const AddChannelModal: React.FunctionComponent<AddChannelModalProps> = ({
  channelModal,
  setChannelModal,
  teamId,
}) => {
  let channelModalFlipper = channelModal === "isOpen" ? "isClosed" : "isOpen";
  let initialMessageBoxState = false;
  const [messageBox, setMessageBox] = useState<boolean>(initialMessageBoxState);
  let [
    createChannelMutation,
    {
      data: dataCreateChannelMutation,
      error: errorCreateChannelMutation,
      // loading: loadingCreateChannelMutation
    },
  ] = useCreateChannelMutation();

  console.log("I HAVE TO USE THIS?", messageBox);

  // console.log(`CHECK CREATE CHANNEL MUTATION`, {
  //   createChannelMutation,
  //   dataCreateChannelMutation,
  //   errorCreateChannelMutation,
  //   loadingCreateChannelMutation
  // });
  return (
    <>
      {channelModal === "isOpen" ? (
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
                <Flex
                  p={2}
                  mb={2}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ position: "relative" }}
                >
                  <Text>Add Channel</Text>

                  {/* <AbFlex
                    position="absolute"
                    // alignItems="center"
                    justifyContent="center"
                    top={0}
                    right={0}
                    mt={1}
                    mr={1}
                  >
                    <Button
                      bg="transparent"
                      p={0}
                      color="text"
                      type="button"
                      onClick={() => setChannelModal(channelModalFlipper)}
                    >
                      <Material_Icon name="close" size="1rem" fill="pink" />
                    </Button>
                  </AbFlex> */}
                </Flex>
                <StyledHr my={0} />

                <Flex px={2} alignItems="center" justifyContent="center">
                  <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    initialValues={{ name: "" }}
                    onSubmit={({ name }, { resetForm }) => {
                      createChannelMutation({
                        variables: {
                          input: { name, teamId },
                        },
                      });
                      resetForm({ values: { name: "" } });
                    }}
                  >
                    {({ errors, handleReset, handleSubmit }) => {
                      return (
                        <form
                          onReset={handleReset}
                          onSubmit={handleSubmit}
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Flex my={2} flexDirection="column" width={2 / 3}>
                            <Label htmlFor="name">Name</Label>

                            {errors && errors.name ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                {errors.name}
                              </FormMessageBox>
                            ) : (
                              ""
                            )}
                            {errorCreateChannelMutation ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                {JSON.stringify(errorCreateChannelMutation)}
                              </FormMessageBox>
                            ) : (
                              ""
                            )}
                            {dataCreateChannelMutation ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                success
                              </FormMessageBox>
                            ) : (
                              ""
                            )}
                            <Field
                              label="channel name"
                              id="name"
                              name="name"
                              placeholder="Channel: #"
                              type="text"
                              component={Input}
                            />
                          </Flex>
                          <Flex width={2 / 3}>
                            <Button
                              width={1 / 2}
                              mr={2}
                              bg="crimson"
                              type="button"
                              onClick={() =>
                                setChannelModal(channelModalFlipper)
                              }
                            >
                              cancel
                            </Button>

                            <Button
                              width={1 / 2}
                              ml={2}
                              bg="crimson"
                              type="submit"
                            >
                              create channel
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
