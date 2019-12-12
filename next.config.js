require("dotenv").config();
const internalIp = require("internal-ip");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require("next/constants");

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
// View all constants here: https://github.com/zeit/next.js/blob/canary/packages/next/next-server/lib/constants.ts
module.exports = phase => {
  const clientIpAddress = internalIp.v4.sync();
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  console.log(
    `isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}, graphQlPort: ${process.env.GRAPHQL_PORT}`
  );

  const env = {
    GRAPHQL_URL: (() => {
      if (isDev)
        return `http://${clientIpAddress}:${process.env.GRAPHQL_PORT}/graphql`;
      if (isProd) {
        return `https://${process.env.PRODUCTION_SERVER_DOMAIN}/graphql`;
      }
      if (isStaging)
        return `https://${process.env.STAGING_SERVER_DOMAIN}/graphql`;
      return "GRAPHQL_URL:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),

    WEBSOCKET_URL: (() => {
      if (isDev)
        return `ws://${clientIpAddress}:${process.env.GRAPHQL_PORT}/subscriptions`;
      if (isProd) {
        return `wss://${process.env.PRODUCTION_CLIENT_DOMAIN}/subscriptions`;
      }
      if (isStaging)
        return `ws://${clientIpAddress}:${process.env.GRAPHQL_PORT.toString()}/subscriptions`;
      return "WEBSOCKET_URL:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })()
  };

  // next.config.js object
  return {
    env
  };
};
