import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import withApollo from "../lib/withApollo";
import { GlobalStyles } from "../modules/site-layout/global-styles";
import { theme } from "../modules/site-layout/theme";

class MyApp extends App<any> {
  render() {
    const {
      Component,
      pageProps,
      apolloClient,
      hocLogin,
      hocLogout,
      hocLoginState,
      token
    } = this.props;
    const getLayout = Component.getLayout || ((page: any) => page);
    const title = Component.title || "Fake test title";
    console.log("VIEW THIS.PROPS (/pages/_app.tsx)", this.props);
    return (
      <ApolloProvider client={apolloClient}>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          {getLayout(
            <Component
              title={title}
              token={token}
              hocLogin={hocLogin}
              hocLogout={hocLogout}
              hocLoginState={hocLoginState}
              {...pageProps}
            />
          )}
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
