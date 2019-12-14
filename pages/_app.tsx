import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import withApollo from "../lib/withApollo";
import { GlobalStyles } from "../modules/site-layout/global-styles";
import { theme } from "../modules/site-layout/theme";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    const getLayout = Component.getLayout || ((page: any) => page);
    const title = Component.title || "Fake test title";
    return (
      <ApolloProvider client={apolloClient}>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          {getLayout(<Component title={title} {...pageProps} />)}
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
