import React from "react";
import Router from "next/router";

import { getLayout } from "../modules/site-layout/main-v2";
import { Button, Flex, Icon, Text } from "../modules/primitives/styled-rebass";

interface ICheckEmail {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

function handleDismiss() {
  console.log("dismiss button clicked");
  Router.push("/login", "/login");
}

const CheckEmail: ICheckEmail = () => {
  return (
    <>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex width="100px">
          <span role="img" aria-label="Close">
            <Icon name="email" fill="rgb(94, 104, 112)" size="2em" />
          </span>
        </Flex>
        <Text mb={3} fontSize={[3]} fontWeight={600} fontFamily="montserrat">
          We sent you an email!
        </Text>
        <Text fontFamily="montserrat">
          Please check your email to confirm your account.
        </Text>
        <Button mt={5} onClick={handleDismiss}>
          Got it!
        </Button>
      </Flex>
    </>
  );
};

CheckEmail.getLayout = getLayout;
CheckEmail.title = "Check email";

export default CheckEmail;
