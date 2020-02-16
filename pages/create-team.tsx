import React from "react";
import { Formik, Field } from "formik";

import { getLayout } from "../modules/site-layout/main-v3";
import { InputField } from "../modules/form-fields/input-field";
import { Button, Flex } from "../modules/primitives/styled-rebass";
import { useCreateTeamMutation } from "../modules/gql-gen/generated/apollo-graphql";
import { PostUpdate } from "../modules/create-team/post-update";

interface CreateTeamProps {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const CreateTeam: CreateTeamProps = () => {
  const [
    createChannelMutation,
    { data, error, loading }
  ] = useCreateTeamMutation();
  return (
    <Flex
      flexDirection="column"
      p={[4, 4, 4, 4]}
      width={[1, 2 / 3, 1 / 3, 1 / 3]}
    >
      Create Team
      <Formik
        initialValues={{ name: "" }}
        onSubmit={({ name }) => {
          console.log("VIEW FORMIK SUBMIT VALUES", { name });
          createChannelMutation({ variables: { name } });
        }}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field
                name="name"
                placeholder="create team"
                component={InputField}
              />

              <Button bg="blue" type="submit">
                submit
              </Button>
              {loading ? "loading..." : ""}
              {error ? `ERROR ${JSON.stringify(error, null, 2)}` : ""}
              <PostUpdate data={data} isVisible={!!data} />
            </form>
          );
        }}
      </Formik>
    </Flex>
  );
};

CreateTeam.getLayout = getLayout;
CreateTeam.title = "Create Team";

export default CreateTeam;
