import React from "react";
import { Button, Flex as FlexBase } from "rebass/styled-components";
import styled from "styled-components";
import { minHeight } from "styled-system";

import Layout from "../modules/site-layout/main";
import { LoginComponent } from "../modules/gql-gen/generated/apollo-graphql";

const Flex = styled(FlexBase)`
  ${minHeight}
  background: url('/static/bg.png') center center no-repeat;
  // background: url('http://unsplash.it/1200x800') center center no-repeat;
  background-size: cover;
`;

const InnerFlex = styled(FlexBase)`
  ${minHeight}
  // background: url('http://unsplash.it/1200x800') center center no-repeat;
  background-size: cover;

  background-image: linear-gradient(
    75deg,
    rgba(210, 48, 120, 0.9) 6%,
    rgba(254, 97, 97, 0.9) 74%,
    rgba(255, 121, 85, 0.9) 100%
  );
`;

const ContentFlex = styled(FlexBase)`
  ${minHeight} // opacity: 1;
`;

const IndexPage: React.FunctionComponent = () => {
  const breakWidths = [1, 1, 1, "690px"];
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Flex flexDirection="column" width={[1]}>
        <InnerFlex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <ContentFlex color="black" flexDirection="column" width={breakWidths}>
            <h1>Welcome to Slack Clone!</h1>

            <LoginComponent>
              {mutate => (
                <Button
                  bg="blue"
                  onClick={async () => {
                    const response = await mutate({
                      variables: {
                        email: "test@test.com",
                        password: "password"
                      }
                    });

                    console.log(response);
                  }}
                >
                  call login mutation
                </Button>
              )}
            </LoginComponent>
          </ContentFlex>
        </InnerFlex>
      </Flex>
    </Layout>
  );
};

export default IndexPage;
