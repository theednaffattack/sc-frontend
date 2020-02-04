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

function parseCookies(req?: any, options = {}) {
  return cookie.parse(
    req && req.headers ? req.headers.cookie || "" : document.cookie,
    options
  );
}

interface WithDataState {
  hocLogin: boolean;
}

const initialLoginState = false;

export default (App: any) => {
  return class WithData extends React.Component<any, WithDataState> {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;
      // let referer: NextContext["referer"];

      if (
        !isBrowser &&
        ctx &&
        ctx.ctx &&
        ctx.ctx.req &&
        ctx.ctx.req.headers &&
        ctx.ctx.req.headers["user-agent"]
      ) {
        // on the server we get request headers so attach
        // the user-agent & referer to apollo context which...
        // resides on Next Context (ctx.ctx)
        ctx.ctx.referer = ctx.router.asPath;
        ctx.ctx.userAgent = ctx.ctx.req.headers["user-agent"];
        // can i attach token?
        ctx.ctx.token = parseCookies(req).scg;
      } else {
        // otherwise use the router path and window info
        ctx.ctx.referer = ctx.router.asPath;
        ctx.ctx.userAgent = window.navigator.userAgent;
      }

      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).scg,
          // getToken: () => token,
          getEnvVars: {
            WEBSOCKET_URL: process.env.WEBSOCKET_URL || "WEBSOCKET_URL missing",
            GRAPHQL_URL: process.env.GRAPHQL_URL
              ? process.env.GRAPHQL_URL
              : "GRAPHQL_URL missing",
            PRODUCTION_CLIENT_DOMAIN:
              process.env.PRODUCTION_CLIENT_DOMAIN ||
              "PRODUCTION_CLIENT_DOMAIN is missing",
            PRODUCTION_SERVER_DOMAIN:
              process.env.PRODUCTION_SERVER_DOMAIN ||
              "PRODUCTION_SERVER_DOMAIN is missing"
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
            redirect(ctx.ctx, "/login", ctx.ctx.referer);
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
        apolloState,
        token: ctx.ctx.token,
        teamId: ctx.ctx.teamId
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
      this.hocLogin = this.hocLogin.bind(this);
      this.hocLogout = this.hocLogout.bind(this);

      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token;
        },
        getEnvVars: {
          WEBSOCKET_URL: process.env.WEBSOCKET_URL!,
          GRAPHQL_URL: process.env.GRAPHQL_URL!,
          PRODUCTION_SERVER_DOMAIN: process.env.PRODUCTION_SERVER_DOMAIN!,
          PRODUCTION_CLIENT_DOMAIN: process.env.PRODUCTION_CLIENT_DOMAIN!
        }
      });

      this.state = { hocLogin: initialLoginState };
    }

    hocLogin() {
      this.setState({ hocLogin: true });
    }

    hocLogout() {
      this.setState({ hocLogin: false });
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
    async syncLogout(event: any) {
      console.log("SYNC LOGOUT CALLED!");
      if (event && event.key === "logout") {
        const attemptLogout = await this.apolloClient.mutate({
          mutation: LogoutDocument
        });
        if (attemptLogout) {
          this.hocLogout();
          Router.push("/login?message=hello", "/login");
        } else {
          throw Error("Logout error, no response from server.");
        }
      } else {
        console.log("No event key?");
      }
    }

    render() {
      return (
        <App
          {...this.props}
          hocLoginState={this.state.hocLogin}
          hocLogin={this.hocLogin}
          hocLogout={this.hocLogout}
          syncLogout={this.syncLogout}
          apolloClient={this.apolloClient}
          // token={parseCookies().token}
        />
      );
    }
  };
};
