import React from "react";
import { useSignS3GetObjectMutation } from "../../gql-gen/generated/apollo-graphql";
import { DownloadLinkStateEntities } from "../messages-list";

type fileIdNonNullable = NonNullable<DownloadLinkStateEntities["fileId"]>;
type s3ActionNonNullable = NonNullable<DownloadLinkStateEntities["s3Action"]>;
type UriNonNullable = NonNullable<DownloadLinkStateEntities["uri"]>;

interface DownloadLinkProps {
  fileId: fileIdNonNullable;
  s3Action: s3ActionNonNullable;
  uri: UriNonNullable;
}

interface LinkWithContentDispositionSetProps {
  href: string;
}
/**An auto download link whose prop `href` expects an URI with Content-Disposition set as attachment */
const LinkWithContentDispositionSet: React.FC<LinkWithContentDispositionSetProps> = ({
  children,
  href
}) => {
  const [autoDownloaderRef] = useHookWithRefCallback();
  return (
    <a ref={autoDownloaderRef} href={href} style={{ display: "none" }}>
      {children}
    </a>
  );
};

export const DownloadLink: React.FC<DownloadLinkProps> = ({
  children,
  fileId,
  s3Action,
  uri
  // href
}) => {
  const [anchorRef] = useHookWithRefCallback();
  const [signS3GetObject, { data }] = useSignS3GetObjectMutation();
  // useEffect(() => {
  //   console.log("THE DATA CHANGEED!!!", { data });
  // }, [data]);
  return (
    <>
      <a
        ref={anchorRef}
        href="#"
        style={{ display: "none" }}
        onClick={event => {
          event.preventDefault();

          if (data !== undefined) {
            console.log("LET'S VIEW DATA", { data });
          }
          if (data === undefined) {
            signS3GetObject({
              variables: {
                action: s3Action,
                files: [{ id: fileId, uri }]
              }
            });
          }
        }}
      >
        {children}
      </a>
      {data?.signS3GetObject.signatures ? (
        <LinkWithContentDispositionSet
          href={data.signS3GetObject.signatures[0].signedRequest}
        >
          {children}
        </LinkWithContentDispositionSet>
      ) : (
        ""
      )}
    </>
  );
};

export default DownloadLink;

function useHookWithRefCallback() {
  const ref = React.useRef(null);
  const setRef = React.useCallback(node => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      node.click();
    }

    // Save a reference to the node
    ref.current = node;
  }, []);

  return [setRef];
}
