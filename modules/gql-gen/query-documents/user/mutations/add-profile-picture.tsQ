import { gql } from "apollo-boost";

export const ADD_PROFILE_PICTURE = gql`
  mutation AddProfilePicture($data: UploadProfilePictureInput!) {
    addProfilePicture(data: $data) {
      message
      profileImgUrl
    }
  }
`;
