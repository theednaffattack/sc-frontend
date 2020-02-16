import React, { useState } from "react";
import { Field, Formik } from "formik";
import { UniversalPortal } from "@jesstelford/react-portal-universal";

import {
  AbFlex,
  Button,
  Card,
  Flex,
  StyledHr,
  Text,
  PositionFlex
} from "../primitives/styled-rebass";
import { Input, Label } from "../primitives/forms";
import {
  // LoadChannelsByTeamIdQuery,
  // LoadChannelsByTeamIdDocument,
  // LoadChannelsByTeamIdQueryVariables,
  useAddTeamMemberMutation
} from "../gql-gen/generated/apollo-graphql";
import {
  AddTeamMemberFormMessageBox,
  FormMessageBox
} from "./form-message-box";
import { ModalStates } from "../site-layout/grid-layout";

interface AddTeamMemberModalProps {
  teamMemberModal: string;
  setTeamMemberModalState: React.Dispatch<React.SetStateAction<ModalStates>>;
  teamId: string;
}

export type MessageBoxState = "isOpen" | "isClosed";

export const AddTeamMemberModal: React.FunctionComponent<AddTeamMemberModalProps> = ({
  teamMemberModal,
  setTeamMemberModalState,
  teamId
}) => {
  let teamMemberModalFlipper =
    teamMemberModal === "isOpen"
      ? ("isClosed" as ModalStates)
      : ("isOpen" as ModalStates);
  const initialMessageBoxState = "isOpen";
  const [messageBox, setMessageBox] = useState<MessageBoxState>(
    initialMessageBoxState
  );

  // let [
  //   createChannelMutation,
  //   { data: dataCreateChannelMutation, error: errorCreateChannelMutation }
  // ] = useCreateChannelMutation();

  const [
    addTeamMemberMutation,
    {
      data: dataAddTeamMemberMutation,
      // error: errorAddTeamMemberMutation,
      loading: loadingAddTeamMemberMutation
    }
  ] = useAddTeamMemberMutation();
  return (
    <>
      {teamMemberModal === "isOpen" ? (
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
                <PositionFlex
                  p={2}
                  mb={2}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  // style={{ position: "relative" }}
                >
                  <Text>Add Team Member(s)</Text>

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
                      onClick={() => setTeamMemberModal(teamMemberModalFlipper)}
                    >
                      <Material_Icon name="close" size="1rem" fill="pink" />
                    </Button>
                  </AbFlex> */}
                </PositionFlex>
                <StyledHr my={0} />

                <Flex px={2} alignItems="center" justifyContent="center">
                  <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    initialValues={{ email: "" }}
                    // @ts-ignore
                    onSubmit={({ email }, { resetForm, setErrors }) => {
                      // FIND THIS
                      addTeamMemberMutation({
                        variables: { email, teamId }
                      }).catch(error => {
                        let newErrors;
                        if (
                          error &&
                          error.graphQLErrors &&
                          error.graphQLErrors.length > 0
                        ) {
                          newErrors = error.graphQLErrors.map(
                            (errorToSearch: any) => {
                              if (
                                errorToSearch.message.includes(
                                  "duplicate key value violates unique constraint"
                                )
                              ) {
                                let returnErrorObj = {
                                  ...errorToSearch,
                                  message: "This User is already a Team member"
                                };

                                return returnErrorObj;
                              }
                              return errorToSearch;
                            }
                          );
                        }
                        setErrors({ email: newErrors[0].message });
                      });
                      console.log(dataAddTeamMemberMutation);

                      resetForm({ values: { email: "" } });
                    }}
                  >
                    {({
                      errors,
                      handleReset,
                      handleSubmit,
                      resetForm,
                      // setErrors,
                      values
                    }) => {
                      const clearError = (key: string) =>
                        resetForm({ errors: { [key]: "" } });
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
                          {JSON.stringify(values, null, 2)}
                          <Flex my={2} flexDirection="column" width={2 / 3}>
                            <Label htmlFor="name">Name</Label>
                            {errors && errors.email ? (
                              <AddTeamMemberFormMessageBox
                                dismissFunction={clearError}
                              >
                                {errors.email}
                              </AddTeamMemberFormMessageBox>
                            ) : (
                              ""
                            )}
                            {loadingAddTeamMemberMutation ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                loading...
                              </FormMessageBox>
                            ) : (
                              ""
                            )}
                            {/* {errorAddTeamMemberMutation ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                {JSON.stringify(errorAddTeamMemberMutation)}
                              </FormMessageBox>
                            ) : (
                              ""
                            )} */}
                            {dataAddTeamMemberMutation &&
                            messageBox === "isOpen" ? (
                              <FormMessageBox dismissFunction={setMessageBox}>
                                success
                              </FormMessageBox>
                            ) : (
                              ""
                            )}
                            <Field
                              label="email"
                              id="email"
                              name="email"
                              placeholder="Team Member: #"
                              type="email"
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
                                setTeamMemberModalState(teamMemberModalFlipper)
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
                              add team member
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
