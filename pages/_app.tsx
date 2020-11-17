import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";

import withApollo from "../lib/withApollo";
import { GlobalStyles } from "../modules/site-layout/global-styles";
import { theme } from "../modules/site-layout/theme";
// import Layout from "../modules/site-layout/main-v3";

class MyApp extends App<any> {
  render() {
    const {
      Component,
      pageProps,
      apolloClient,
      hocLogin,
      hocLogout,
      hocLoginState,
      syncLogout,
      token,
    } = this.props;
    const getLayout = Component.getLayout || ((page: any) => page);
    const title = Component.title || "Fake test title";

    return (
      <ApolloProvider client={apolloClient}>
        <GlobalStyles />

        <div id="modal" />
        <ThemeProvider theme={theme}>
          {getLayout(
            <Component
              title={title}
              token={token}
              hocLogin={hocLogin}
              hocLogout={hocLogout}
              hocLoginState={hocLoginState}
              syncLogout={syncLogout}
              {...pageProps}
            />
          )}
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
