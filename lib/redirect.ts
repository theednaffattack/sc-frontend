import Router from "next/router";
// import { MyContext } from "../../types/types";

// interface RedirectOptions {
//   query?: ParsedUrlQueryInput;
//   referer?: string;
//   newTarget?: string;
// }

export default (context: any, target: string, originalTarget?: string) => {
  let pathname;
  if (originalTarget) {
    pathname = originalTarget;
  } else {
    pathname = target;
  }
  if (context && context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: pathname });
    context.res.end();
  } else {
    const pathnameIncludesLogin = pathname.includes("/login");
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(pathname, pathnameIncludesLogin ? "/login" : pathname);
  }
};
