import React from "react";
import { useState } from "react";
import { Formik } from "formik";

import { Button, Flex, Icon, Text } from "../primitives/styled-rebass";
import UserProfileImage from "./user-profile-image";
import {
  MeQueryResult,
  EditUserInfoMutationResult,
  EditUserInfoMutationFn,
  MeComponent,
  SignS3Component,
  AddProfilePictureComponent
} from "../gql-gen/generated/apollo-graphql";
import EditUserInfoFormBody from "./edit-user-info-form-body";
import ButtonRow from "./button-row";
import DropZoneContainer from "./dropzone-container";

interface UserInfoProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  dataMe: MeQueryResult["data"];
  errorMe: MeQueryResult["error"];
  loadingMe: MeQueryResult["loading"];
  loadingSubmitState: LoadingStateProps;
  setLoadingSubmitState: React.Dispatch<
    React.SetStateAction<LoadingStateProps>
  >;
  editUserInfo: EditUserInfoMutationFn;
  dataEditUserInfo: EditUserInfoMutationResult["data"];
  errorEditUserInfo: EditUserInfoMutationResult["error"];
  loadingEditUserInfo: EditUserInfoMutationResult["loading"];
}

interface UserInfoContainerProps {
  dataMe: MeQueryResult["data"];
  errorMe: MeQueryResult["error"];
  loadingMe: MeQueryResult["loading"];
  editUserInfo: EditUserInfoMutationFn;
  dataEditUserInfo: EditUserInfoMutationResult["data"];
  errorEditUserInfo: EditUserInfoMutationResult["error"];
  loadingEditUserInfo: EditUserInfoMutationResult["loading"];
}

export interface InitialValuesProps {
  email: string;
  firstName: string;
  lastName: string;
}

const UserInfo: React.FunctionComponent<UserInfoProps> = ({
  dataMe,
  errorMe,
  expanded,
  loadingMe,
  loadingSubmitState,
  setExpanded,
  setLoadingSubmitState,
  editUserInfo
  // dataEditUserInfo,
  // errorEditUserInfo,
  // loadingEditUserInfo
}) => {
  if (errorMe)
    return (
      <div>Error loading user data, {JSON.stringify(errorMe, null, 2)}</div>
    );
  if (dataMe && dataMe.me) {
    let initialFormValues = {
      email: dataMe.me.email,
      firstName: dataMe.me.firstName,
      lastName: dataMe.me.lastName
    };
    return (
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (data, { setErrors }) => {
          try {
            await editUserInfo({
              variables: {
                data: {
                  email: data.email,
                  firstName: data.firstName,
                  lastName: data.lastName
                }
              }
            });
          } catch (error) {
            const displayErrors: { [key: string]: string } = {};

            let myErrors =
              error.graphQLErrors[0].extensions.exception.validationErrors;

            myErrors.forEach((validationError: any) => {
              Object.values(validationError.constraints).forEach(
                (message: any) => {
                  displayErrors[validationError.property] = message;
                }
              );
            });
            return setErrors(displayErrors);
          }
        }}
        initialValues={initialFormValues}
      >
        {({ handleSubmit, values, resetForm }) => (
          <Flex flexDirection="column">
            {loadingSubmitState === "IS_LOADING" ? "LOADING..." : ""}
            <Flex mb={3} alignItems="center">
              <Flex
                width={1 / 2}
                alignItems="center"
                flexDirection="column"
                sx={{ position: "relative" }}
              >
                <UserProfileImage
                  flexInstruction="row"
                  user={dataMe && dataMe.me}
                />

                {expanded ? (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(255,255,255,0.7)"
                    sx={{
                      // border: "2px pink dashed",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0
                    }}
                  >
                    <MeComponent>
                      {({
                        data: dataMe,
                        error: errorMe,
                        loading: loadingMe
                      }) => {
                        return (
                          <SignS3Component>
                            {(
                              signS3,
                              {
                                data: dataSignS3,
                                error: errorSignS3,
                                loading: loadingSignS3
                              }
                            ) => {
                              return (
                                <AddProfilePictureComponent>
                                  {(
                                    addProfilePicture,
                                    // @ts-ignore
                                    {
                                      data: dataAddProfilePicture,
                                      error: errorAddProfilePicture,
                                      loading: loadingAddProfilePicture
                                    }
                                  ) => {
                                    return (
                                      <DropZoneContainer
                                        dataMe={dataMe}
                                        errorMe={errorMe}
                                        loadingMe={loadingMe}
                                        mutateSignS3={signS3}
                                        dataSignS3={dataSignS3}
                                        errorSignS3={errorSignS3}
                                        loadingSignS3={loadingSignS3}
                                        mutateAddProfilePicture={
                                          addProfilePicture
                                        }
                                        dataAddProfilePicture={
                                          dataAddProfilePicture
                                        }
                                        errorAddProfilePicture={
                                          errorAddProfilePicture
                                        }
                                        loadingAddProfilePicture={
                                          loadingAddProfilePicture
                                        }
                                      />
                                    );
                                  }}
                                </AddProfilePictureComponent>
                              );
                            }}
                          </SignS3Component>
                        );
                      }}
                    </MeComponent>
                    <Button
                      bg="transparent"
                      type="button"
                      onClick={() => console.log("FILE INPUT CLICK")}
                    >
                      <Icon name="camera" size="2em" fill="crimson" />
                    </Button>
                  </Flex>
                ) : (
                  ""
                )}
              </Flex>
              {expanded ? (
                <Flex width={1 / 2} alignItems="center" flexDirection="column">
                  <EditUserInfoFormBody
                    handleSubmit={handleSubmit}
                    values={values}
                  />
                </Flex>
              ) : (
                <Flex flexDirection="column">
                  <Text fontFamily="main">
                    {loadingMe
                      ? "loading..."
                      : dataMe && dataMe.me && dataMe.me.name}
                  </Text>

                  <Text>
                    {loadingMe
                      ? "loading..."
                      : dataMe && dataMe.me && dataMe.me.email}
                  </Text>
                </Flex>
              )}
            </Flex>
            <ButtonRow
              expanded={expanded}
              handleCancellation={() => setExpanded(!expanded)}
              handleSubmit={handleSubmit}
              loadingSubmitState={loadingSubmitState}
              initialValues={initialFormValues}
              resetForm={resetForm}
              setExpanded={setExpanded}
              setLoadingSubmitState={setLoadingSubmitState}
            />
          </Flex>
        )}
      </Formik>
    );
  } else {
    throw Error("Error! Data fetching states (Me) are all undefined!");
  }
};

export type LoadingStateProps =
  | "INITIAL_STATE"
  | "IS_SUBMITTING"
  | "IS_LOADING"
  | "HAS_LOADED";

const UserInfoContainer: React.FunctionComponent<UserInfoContainerProps> = ({
  dataMe,
  errorMe,
  loadingMe,
  editUserInfo,
  dataEditUserInfo,
  errorEditUserInfo,
  loadingEditUserInfo
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [loadingSubmitState, setLoadingSubmitState] = useState<
    LoadingStateProps
  >("INITIAL_STATE");

  return (
    <UserInfo
      dataMe={dataMe}
      errorMe={errorMe}
      loadingMe={loadingMe}
      loadingSubmitState={loadingSubmitState}
      expanded={expanded}
      setExpanded={setExpanded}
      setLoadingSubmitState={setLoadingSubmitState}
      editUserInfo={editUserInfo}
      dataEditUserInfo={dataEditUserInfo}
      errorEditUserInfo={errorEditUserInfo}
      loadingEditUserInfo={loadingEditUserInfo}
    />
  );
};

export default UserInfoContainer;
