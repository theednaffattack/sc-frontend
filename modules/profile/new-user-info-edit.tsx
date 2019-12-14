import { Formik } from "formik";
import React from "react";

import { Button, Flex } from "../primitives/styled-rebass";
import {
  EditUserInfoMutationFn,
  MeQueryResult,
  SignS3Component,
  AddProfilePictureComponent,
  EditUserInfoMutationResult
} from "../gql-gen/generated/apollo-graphql";
import DropZoneContainer from "./dropzone-container";
import EditUserInfoFormBody from "./edit-user-info-form-body";

interface NewUserInfoEditProps {
  editUserInfo: EditUserInfoMutationFn;
  dataMe: MeQueryResult["data"];
  errorMe: MeQueryResult["error"];
  loadingMe: MeQueryResult["loading"];

  dataEditUserInfo: EditUserInfoMutationResult["data"];
  errorEditUserInfo: EditUserInfoMutationResult["error"];
  loadinEditUserInfo: EditUserInfoMutationResult["loading"];

  closeModal: any;
}

function isEquivalent(a: any, b: any) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

const NewUserInfoEdit: React.FunctionComponent<NewUserInfoEditProps> = ({
  editUserInfo,
  dataMe,
  errorMe,
  loadingMe
  // closeModal
}) => {
  let email = dataMe && dataMe.me ? dataMe.me.email : "";
  let firstName = dataMe && dataMe.me ? dataMe.me.firstName : "";
  let lastName = dataMe && dataMe.me ? dataMe.me.lastName : "";
  let initialFormValues = {
    email,
    firstName,
    lastName
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
          <SignS3Component>
            {(
              signS3,
              { data: dataSignS3, error: errorSignS3, loading: loadingSignS3 }
            ) => {
              return (
                <AddProfilePictureComponent>
                  {(
                    addProfilePicture,
                    {
                      data: dataAddProfilePicture,
                      error: errorAddProfilePicture,
                      loading: loadingAddProfilePicture
                    }
                  ) => {
                    return (
                      <>
                        <DropZoneContainer
                          dataMe={dataMe}
                          errorMe={errorMe}
                          loadingMe={loadingMe}
                          mutateSignS3={signS3}
                          dataSignS3={dataSignS3}
                          errorSignS3={errorSignS3}
                          loadingSignS3={loadingSignS3}
                          mutateAddProfilePicture={addProfilePicture}
                          dataAddProfilePicture={dataAddProfilePicture}
                          errorAddProfilePicture={errorAddProfilePicture}
                          loadingAddProfilePicture={loadingAddProfilePicture}
                        />

                        <EditUserInfoFormBody
                          handleSubmit={handleSubmit}
                          values={values}
                        />

                        <Button
                          bg={
                            isEquivalent(initialFormValues, {
                              email: values.email,
                              firstName: values.firstName,
                              lastName: values.lastName
                            })
                              ? "grey"
                              : "blue"
                          }
                          disabled={isEquivalent(initialFormValues, {
                            email: values.email,
                            firstName: values.firstName,
                            lastName: values.lastName
                          })}
                          type="button"
                          onClick={() => handleSubmit()}
                        >
                          submit new user info
                        </Button>

                        <Button
                          bg={
                            isEquivalent(initialFormValues, {
                              email: values.email,
                              firstName: values.firstName,
                              lastName: values.lastName
                            })
                              ? "grey"
                              : "crimson"
                          }
                          disabled={isEquivalent(initialFormValues, {
                            email: values.email,
                            firstName: values.firstName,
                            lastName: values.lastName
                          })}
                          onClick={() => resetForm(initialFormValues)}
                        >
                          reset user info
                        </Button>
                      </>
                    );
                  }}
                </AddProfilePictureComponent>
              );
            }}
          </SignS3Component>
        </Flex>
      )}
    </Formik>
  );
};

export default NewUserInfoEdit;
