import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { withApollo } from "../lib/apollo";
import { GlobalStyles } from "../modules/site-layout/global-styles";
import { theme } from "../modules/site-layout/theme";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyles />
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
