import { gql } from "apollo-boost";

export const SIGN_S3 = gql`
  mutation SignS3($files: [ImageSubInput!]!, $action: S3SignatureAction!) {
    signS3(files: $files, action: $action) {
      signatures {
        uri
        signedRequest
      }
    }
  }
`;
