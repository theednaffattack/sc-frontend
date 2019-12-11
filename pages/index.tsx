import Link from "next/link";
import * as React from "react";
import Layout from "../modules/site-layout/main";
import { LoginComponent } from "../generated/apolloComponents";
import { Flex as FlexBase } from "rebass";
import styled from "styled-components";
import { minHeight } from "styled-system";

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
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Flex flexDirection="column" width={[1]}>
        <InnerFlex flexDirection="column">
          <ContentFlex color="black" flexDirection="column" minHeight="100vh">
            <h1>hello Next.js 👋</h1>
            <p>
              <Link href="/about">
                <a>About</a>
              </Link>
            </p>
            <LoginComponent>
              {mutate => (
                <button
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
                </button>
              )}
            </LoginComponent>
          </ContentFlex>
        </InnerFlex>
      </Flex>
      {/* </Card> */}
    </Layout>
  );
};

export default IndexPage;
