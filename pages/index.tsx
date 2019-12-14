import React from "react";
import { Flex as FlexBase } from "rebass/styled-components";
import styled from "styled-components";
import { minHeight } from "styled-system";
import Link from "next/link";

import Layout from "../modules/site-layout/main-v2";

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

            <Link href="/login" as="/login">
              <a>login</a>
            </Link>
          </ContentFlex>
        </InnerFlex>
      </Flex>
    </Layout>
  );
};

export default IndexPage;
