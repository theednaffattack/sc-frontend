import React from "react";
import { Flex as FlexBase } from "rebass/styled-components";
import styled from "styled-components";
import { minHeight } from "styled-system";
import Link from "next/link";

import { getLayout } from "../modules/site-layout/main-v2";
import { NextContext } from "../typings/NextContext";

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
  ${minHeight}
`;

interface IndexFromHocProps {
  hocLoginState: boolean;
  hocLogout: any;
  authState: boolean;
  referer: NextContext["referer"];
}

interface IndexPageProps {
  ({
    hocLoginState,
    hocLogout,
    authState,
    referer
  }: IndexFromHocProps): JSX.Element;

  getInitialProps: ({
    referer
  }: NextContext) => Promise<{ referer: NextContext["referer"] }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const IndexPage: IndexPageProps = () => {
  const breakWidths = [1, 1, 1, "690px"];
  return (
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
  );
};

IndexPage.getInitialProps = async ({ referer }: NextContext) => {
  let setReferer = referer === undefined ? "/login" : referer;
  return { referer: setReferer };
};

IndexPage.getLayout = getLayout;

IndexPage.title = "Home";

export default IndexPage;
