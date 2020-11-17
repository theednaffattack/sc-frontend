import { gql } from "apollo-boost";

export const SIGN_S3_GET_OBJECT = gql`
  mutation SignS3GetObject($files: [FileInput!]!, $action: S3SignatureAction) {
    signS3GetObject(files: $files, action: $action) {
      signatures {
        uri
        signedRequest
      }
    }
  }
`;
