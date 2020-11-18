import React from "react";

import { Button, Flex } from "../primitives/styled-rebass";
import { InitialValuesProps, LoadingStateProps } from "./user-info";
import { FormikState } from "formik";

interface ButtonRowProps {
  expanded: boolean;
  handleCancellation?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: any;
  initialValues: InitialValuesProps;
  loadingSubmitState: LoadingStateProps;
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            email: string;
            firstName: string;
            lastName: string;
            teamRoles: never[];
            teamId: string;
          }>
        >
      | undefined
  ) => void;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSubmitState: React.Dispatch<
    React.SetStateAction<LoadingStateProps>
  >;
}

const ButtonRow: React.FunctionComponent<ButtonRowProps> = ({
  expanded,
  // handleCancellation,
  handleSubmit,
  initialValues,
  loadingSubmitState,
  resetForm,
  setExpanded,
  setLoadingSubmitState,
}) => {
  return (
    <>
      {expanded ? (
        <Flex id="bottom-button-row" justifyContent="center">
          <Button
            bg="blue"
            type="submit"
            onClick={() => {
              // return if it's already loading
              if (loadingSubmitState === "IS_LOADING") return;

              setLoadingSubmitState("IS_LOADING");

              handleSubmit();
              // resetForm(initialValues);
              setExpanded(!expanded);
              setLoadingSubmitState("HAS_LOADED");
              // setTimeout(() => {
              //   // submit the form, wait till loaded, reset the form
              // }, 3000);
            }}
            label="Sign up"
          >
            Save Change
          </Button>
          <Button
            type="button"
            bg="red"
            onClick={() => resetForm({ values: initialValues })}
          >
            reset form
          </Button>

          <Button type="button" bg="red" onClick={() => setExpanded(!expanded)}>
            cancel
          </Button>
        </Flex>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setExpanded(!expanded)}
        >
          edit profile
        </Button>
      )}
    </>
  );
};

export default ButtonRow;
