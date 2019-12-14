import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import cookie from "cookie";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import { getDataFromTree } from "react-apollo";
import Router from "next/router";

// import getConfig from "next/config";
// const { serverRuntimeConfig } = getConfig(); // , publicRuntimeConfig

import initApollo from "./initApollo";
import { isBrowser } from "./isBrowser";
import redirect from "./redirect";
import { LogoutDocument } from "../modules/gql-gen/generated/apollo-graphql";
import { NextContext } from "../typings/NextContext";

function parseCookies(req?: any, options = {}) {
  return cookie.parse(
    req && req.headers ? req.headers.cookie || "" : document.cookie,
    options
  );
}

let refererInfo: string;

export default (App: any) => {
  return class WithData extends React.Component<any, object> {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx: any) {
      let referer: NextContext["referer"];
      if (!isBrowser) {
        // on the server we get request headers so attach
        // the referer to apollo context
        referer =
          ctx && ctx.ctx && ctx.ctx.req && ctx.ctx.req.headers
            ? ctx.ctx.req.headers.referer
            : "";
        ctx.ctx.referer = referer;
      } else {
        // since we're only using referer for `/login` redirects
        // we can set it to login. A better solution is needed
        referer = "/unknown";
      }
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;

      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).scg,
          getReferer: () => {
            refererInfo = req.headers.referer;
            return refererInfo;
          },
          getEnvVars: {
            WEBSOCKET_URL: process.env.WEBSOCKET_URL || "WEBSOCKET_URL missing",
            GRAPHQL_URL: process.env.GRAPHQL_URL
              ? process.env.GRAPHQL_URL
              : "GRAPHQL_URL missing",
            PRODUCTION_CLIENT_DOMAIN:
              process.env.PRODUCTION_CLIENT_DOMAIN ||
              "PRODUCTION_CLIENT_DOMAIN missing",
            PRODUCTION_SERVER_DOMAIN:
              process.env.PRODUCTION_SERVER_DOMAIN ||
              "PRODUCTION_SERVER_DOMAIN missing"
          }
        }
      );

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!isBrowser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          if (error.message.includes("Not authenticated")) {
            redirect(ctx.ctx, "/login", referer);
          } else {
            console.error("Error while running `getDataFromTree`", error);
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);

      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token;
        },
        getReferer: () => {
          return this.props.pageProps.referer;
        },
        getEnvVars: {
          WEBSOCKET_URL: process.env.WEBSOCKET_URL!,
          GRAPHQL_URL: process.env.GRAPHQL_URL!,
          PRODUCTION_SERVER_DOMAIN: process.env.PRODUCTION_SERVER_DOMAIN!,
          PRODUCTION_CLIENT_DOMAIN: process.env.PRODUCTION_CLIENT_DOMAIN!
        }
      });
    }

    // New: Add event listener when a restricted Page Component mounts
    componentDidMount() {
      if (isBrowser) {
        window.addEventListener("storage", this.syncLogout, true);
      }
    }

    // New: Remove event listener when the Component unmount and
    // delete all data
    componentWillUnmount() {
      if (isBrowser) {
        window.removeEventListener("storage", this.syncLogout, true);

        window.localStorage.removeItem("logout");
      }
    }

    // New: Method to redirect the user when the event is called
    syncLogout(event: any) {
      if (event.key === "logout") {
        this.apolloClient.mutate({
          mutation: LogoutDocument
        });

        Router.push("/login");
      }
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
