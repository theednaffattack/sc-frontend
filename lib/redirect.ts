import Router from "next/router";
// import { ParsedUrlQueryInput } from "querystring";

// import { MyContext } from "../../types/types";

// interface RedirectOptions {
//   query?: ParsedUrlQueryInput;
//   referer?: string;
//   newTarget?: string;
// }

export default (context: any, target: string, originalTarget?: string) => {
  let myQuery;
  let pathname;
  if (originalTarget) {
    pathname = originalTarget;
  } else {
    pathname = target;
  }
  if (context && context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace({
      pathname: pathname,
      query: myQuery || null
    });
  }
};
