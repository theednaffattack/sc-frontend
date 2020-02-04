import React from "react";
import Document, {
  DocumentContext
  // Head,
  // Main,
  // NextScript
} from "next/document";

import { ServerStyleSheet } from "styled-components";

import { ServerPortal } from "@jesstelford/react-portal-universal/server";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const portals = new ServerPortal();
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const { html, styles, ...props } = await Document.getInitialProps(ctx);
      const htmlWithPortals = portals.appendUniversalPortals(html);

      return {
        html: htmlWithPortals,
        ...props,
        styles: (
          <>
            {styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  // render() {
  //   return (
  //     <html>
  //       <Head />
  //       <body>
  //         <Main />
  //         {/* Here we will mount our modal portal */}
  //         <div id="modal-root" />
  //         <NextScript />
  //       </body>
  //     </html>
  //   );
  // }
}
