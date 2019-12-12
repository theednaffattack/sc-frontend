import React from "react";

import {
  ConfirmUserDocument as CONFIRM_USER,
  ConfirmUserMutation,
  ConfirmUserMutationVariables
} from "../../../modules/gql-gen/generated/apollo-graphql";
// import { CONFIRM_USER } from "../src/graphql/user/mutations/confirmUser";
import { getLayout } from "../../../modules/site-layout/main-v2";
import redirect from "../../../lib/redirect";
import { NextContext } from "../../../typings/NextContext";

export default class Confirm extends React.PureComponent {
  static title = "Confirm";
  static getLayout = getLayout;
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: NextContext) {
    console.log("WHAT'S GOING ON?", {
      token,
      apolloClient
    });
    if (!token) {
      return {};
    }
    let validateToken;

    if (apolloClient) {
      validateToken = await apolloClient.mutate<
        ConfirmUserMutation,
        ConfirmUserMutationVariables
      >({
        mutation: CONFIRM_USER,
        variables: {
          token: token as string
        }
      });
    }
    if (validateToken) {
      console.log("FOUND A VALID TOKEN!", validateToken);
      redirect(ctx, "/login");
    } else {
      return "soemthing went wrong, confirmation mutation";
    }

    return {};
  }

  render() {
    return "something went wrong";
  }
}
