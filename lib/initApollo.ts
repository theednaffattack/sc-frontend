import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher
} from "apollo-boost";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { onError } from "apollo-link-error";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import Router from "next/router";

import introspectionQueryResultData from "../modules/gql-gen/generated/fragmentTypes";

import { isBrowser } from "./isBrowser";

// const nodeEnv = process.env.NODE_ENV;

// const envIsDev = nodeEnv !== "production";

// const myIpAddress = "192.168.1.24"; // internalIp.v4.sync();
// const myIpAddress = "localhost"; // internalIp.v4.sync();

// const port = process.env.GRAPHQL_PORT;

// const myLanInfo: string = `${myIpAddress}:${port}`;

// const prodDomain: string = `fauxgramapi.eddienaff.dev`;

// const domain: string = envIsDev ? myLanInfo : prodDomain;

// const prefix: string = "http://";

// const wsPrefix: string = "ws://";

// const prodGraphqlUrl: string = `${prefix}${domain}/graphql`;

// const prodWebsocketsUrl: string = `${wsPrefix}${domain}/subscriptions`;
// const websocketUrl: string = process.env.WEBSOCKET_URL;

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface EnvVars {
  WEBSOCKET_URL: string;
  GRAPHQL_URL: string;
  PRODUCTION_SERVER_DOMAIN: string;
  PRODUCTION_CLIENT_DOMAIN: string;
}

interface Options {
  getToken: () => string;
  getReferer: () => string;
  getEnvVars: EnvVars;
}

function create(
  initialState: any,
  { getToken, getReferer, getEnvVars }: Options
): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: getEnvVars.GRAPHQL_URL, // Server URL (must be absolute)
    credentials: "include", // Additional fetch() options like `credentials` or `headers`
    fetch
  });

  console.log("CAN I SEE MY ENV VARS?", getEnvVars.WEBSOCKET_URL);
  // Create a WebSocket link:
  const wsLink = isBrowser
    ? new WebSocketLink({
        uri: getEnvVars.WEBSOCKET_URL,
        options: {
          reconnect: true
        }
      })
    : null;

  const splitLink = isBrowser
    ? split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink!,
        httpLink
      )
    : httpLink;

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    // console.log({
    //   operation,
    //   response,
    //   forward
    // });
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        let authErrorMessage = "Not authenticated";
        if (isBrowser && message.includes(authErrorMessage)) {
          Router.replace(
            `/login?referer=${getReferer()}&message=${authErrorMessage}`
          );
        } else {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations,
              null,
              2
            )}, Path: ${path}`
          );
        }
      });
    if (networkError) {
      console.log(`[Network Error]: ${networkError}`);
    }
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `scg=${token}` : ""
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(authLink.concat(splitLink)),
    cache: new InMemoryCache({
      addTypename: true,
      fragmentMatcher
    }).restore(initialState || {})
  });
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
