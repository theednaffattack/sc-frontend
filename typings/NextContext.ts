import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { NextPageContext } from "next";

export interface NextContext extends NextPageContext {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  referer?: string;
  token?: string;
  userAgent?: string;
  teamId?: string;
}
