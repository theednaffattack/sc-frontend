import React, { Component } from "react";
import dFormat from "date-fns/format";
import axios from "axios";
import uuidv4 from "uuid/v4";

import { Flex } from "../primitives/styled-rebass";
import UploadProfilePictureForm from "./upload-profile-picture-form";
import {
  SignS3Component,
  AddProfilePictureMutationFn,
  SignS3MutationFn,
  SignS3MutationResult,
  SignedS3SubPayload,
  AddProfilePictureMutationResult,
  MeQueryResult,
  MeQuery,
  S3SignatureAction,
} from "../gql-gen/generated/apollo-graphql";
import { ME_QUERY } from "../gql-gen/query-documents/user/queries/Me";

interface ProfileDropzoneContainerAddProfileMutationProps {
  mutateAddProfilePicture: AddProfilePictureMutationFn;
  dataAddProfilePicture: AddProfilePictureMutationResult["data"];
  errorAddProfilePicture: AddProfilePictureMutationResult["error"];
  loadingAddProfilePicture: AddProfilePictureMutationResult["loading"];
}

interface ProfileDropzoneContainerSignS3MutationProps {
  mutateSignS3: SignS3MutationFn;
  dataSignS3: SignS3MutationResult["data"];
  errorSignS3: SignS3MutationResult["error"];
  loadingSignS3: SignS3MutationResult["loading"];
}

interface ProfileDropzoneContainerMeQueryProps {
  dataMe: MeQueryResult["data"];
  errorMe: MeQueryResult["error"];
  loadingMe: MeQueryResult["loading"];
}

interface ProfileDropzoneContainerProps
  extends ProfileDropzoneContainerAddProfileMutationProps,
    ProfileDropzoneContainerSignS3MutationProps,
    ProfileDropzoneContainerMeQueryProps {}

export interface ProfileDropzoneContainerState {
  highlight: boolean;
  files: any[];
  name: string;
  disabled: boolean;
  fileInputKey: string;
}

type SignedS3 =
  | ({
      __typename?: "SignedS3SubPayload" | undefined;
    } & Pick<SignedS3SubPayload, "signedRequest" | "__typename" | "uri">)[]
  | undefined;

export const inputStyles = {
  display: "none",
};

const initialState = {
  disabled: false,
  files: [],
  fileInputKey: Date.now().toString(),
  fileNames: [],
  highlight: false,
  previewSource: null,
};

export default class DropZoneContainer extends Component<
  ProfileDropzoneContainerProps,
  ProfileDropzoneContainerState
> {
  fileInputRef: React.RefObject<HTMLInputElement>;
  constructor(props: ProfileDropzoneContainerProps) {
    super(props);

    this.fileInputRef = React.createRef();

    this.handlePost = this.handlePost.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.fileListToArray = this.fileListToArray.bind(this);
    this.handleClearFilePreview = this.handleClearFilePreview.bind(this);
    this.handleRemoveIndividualImagePreview = this.handleRemoveIndividualImagePreview.bind(
      this
    );
    this.makeObjectUrls = this.makeObjectUrls.bind(this);
    this.getSignature = this.getSignature.bind(this);
    this.formatFilename = this.formatFilename.bind(this);
    this.uploadToS3 = this.uploadToS3.bind(this);

    this.state = {
      highlight: false,
      files: [],
      name: "",
      disabled: false,
      fileInputKey: initialState.fileInputKey,
    };
  }

  handleRemoveIndividualImagePreview(index: number) {
    this.setState((prevState) => {
      // @ts-ignore
      let newFiles = prevState.files.filter(function(file, fileIndex) {
        return fileIndex !== index;
      });
      return {
        files: newFiles,
      };
    });
  }

  async handlePost(submissionData: any, { resetForm, setErrors }: any) {
    console.log("INSPECT SUBMISSION DATA (handlePost)", submissionData);
    if (submissionData.images.length < 1) return;

    let imagesAreUploadedToS3: SignedS3 = await this.getSignature();

    if (imagesAreUploadedToS3) {
      let [successfullyUploadedFiles] = imagesAreUploadedToS3.map(
        (image) => image.uri
      );

      try {
        this.props.mutateAddProfilePicture({
          variables: {
            data: {
              user: submissionData.user,
              image: successfullyUploadedFiles,
            },
          },
          update: (cache, { data }) => {
            if (!data || !data.addProfilePicture) {
              return;
            }
            let fromCache = cache.readQuery<MeQuery>({
              query: ME_QUERY,
            });

            let id = (fromCache && fromCache.me && fromCache.me.id) || "";
            let name = (fromCache && fromCache.me && fromCache.me.name) || "";
            let email = (fromCache && fromCache.me && fromCache.me.email) || "";
            let firstName =
              (fromCache && fromCache.me && fromCache.me.firstName) || "";
            let lastName =
              (fromCache && fromCache.me && fromCache.me.lastName) || "";

            cache.writeQuery<MeQuery>({
              query: ME_QUERY,
              data: {
                me: {
                  __typename: "User",
                  id,
                  name,
                  firstName,
                  lastName,
                  email,
                  profileImageUri:
                    data.addProfilePicture &&
                    data.addProfilePicture.profileImgUrl,
                },
              },
            });
          },

          // {
          //   data: {
          //     text: submissionData.text,
          //     title: submissionData.title,
          //     images: [...successfullyUploadedFiles],
          //     user: submissionData.user //"de5527bc-58f4-4666-819c-c0e7983bdcc3"
          //   }
          // }
        });
        this.handleClearFilePreview();
      } catch (error) {
        const displayErrors: { [key: string]: string } = {};

        let graphErrors = error.graphQLErrors;
        graphErrors.forEach((errorThing: any) => {
          displayErrors[errorThing.path[0]] = errorThing.message;
        });
        console.log(graphErrors);
        console.log(error);
        return setErrors(displayErrors);
      }
    }

    resetForm({
      text: "",
      title: "",
      user: this.props.dataMe,
      images: [],
    });
    this.setState({
      fileInputKey: Date.now().toString(),
      files: [],
    });
    this.handleClearFilePreview();
  }

  onDragOver(evt: React.MouseEvent) {
    evt.preventDefault();

    if (this.state.disabled) return;

    this.setState({ highlight: true });
  }

  onDragLeave() {
    this.setState({ highlight: false });
  }

  onDrop(evt: React.DragEvent<HTMLDivElement>) {
    evt.preventDefault();

    if (this.state.disabled) return;

    const files = evt.dataTransfer.files;

    if (this.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.onFilesAdded(array);
    }
    this.setState({ highlight: false });
  }

  handleClearFilePreview() {
    this.setState({
      files: [],
    });
  }

  openFileDialog() {
    if (this.state.disabled) return;
    if (this.fileInputRef && this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  }

  fileListToArray(list: FileList) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list[i]);
    }
    return array;
  }

  async makeBlobUrlsFromState() {
    const self = this;

    return await Promise.all(
      self.state.files.map(async (myFile) => {
        return await fetch(myFile)
          .then((r) => r.blob())
          .then(
            (blobFile) =>
              new File([blobFile], uuidv4(), {
                type: "image/png",
              })
          );
      })
    );
  }

  async makeBlobUrlsFromReference(myFile: any) {
    return await fetch(myFile)
      .then((r) => r.blob())
      .then((blobFile) => {
        const getFileName = this.state.files
          .filter((aFile) => aFile.blobUrl === myFile)
          .map((theFile) => theFile.name)[0];

        return new File([blobFile], getFileName, {
          type: myFile.type,
        });
      });
  }

  uploadToS3 = async ({ file, signedRequest }: any) => {
    const options = {
      headers: {
        "Content-Type": "image/png",
      },
    };

    const theFile = await this.makeBlobUrlsFromReference(file);

    let s3ReturnInfo = await axios
      .put(signedRequest, theFile, options)
      .catch((error) => console.error({ error }));

    return s3ReturnInfo;
  };

  formatFilename = (file: any) => {
    const filename = file.name;

    const date = dFormat(new Date(), "YYYYMMDD");

    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);

    const fileExtension = file.type.substring(
      file.type.lastIndexOf("/") + 1,
      file.type.length
    );

    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const restrictedLengthCleanFileName = cleanFileName.substring(0, 40);

    const newFilename = `${date}-${randomString}-${restrictedLengthCleanFileName}.${fileExtension}`;

    return newFilename;
  };

  getFileExtension() {}

  getMimeType() {}

  async getSignature() {
    const { files } = this.state;
    const { mutateSignS3 } = this.props;

    // const preppedFiles = files.map((file) => {
    //   return { filename: file.name, filetype: file.type };
    // });

    if (!files || !files[0]) return;

    const response = await mutateSignS3({
      variables: {
        action: S3SignatureAction.PutObject,
        files: [
          {
            lastModified: 10,
            lastModifiedDate: "",
            name: "",
            path: "",
            size: 5,
            type: "",
            webkitRelativePath: "",
          },
        ],
        // files: [...preppedFiles],
      },
    });

    if (response && response.data && response.data.signS3) {
      const { signatures } = response && response.data && response.data.signS3;

      await Promise.all(
        signatures.map(async (signature: any, signatureIndex: number) => {
          return await this.uploadToS3({
            file: files[signatureIndex].blobUrl,
            signedRequest: signature.signedRequest,
          }).catch((error) =>
            console.error(JSON.stringify({ ...error }, null, 2))
          );
        })
      );

      return signatures;
    }
    throw Error("Error uploading image to image hosting service");
  }

  makeObjectUrls(someArray: any) {
    return someArray.map((file: any) => {
      const {
        lastModified,
        lastModifiedDate,

        size,
        type,
        webkitRelativePath,
      } = file;

      return {
        blobUrl: URL.createObjectURL(file),
        lastModified,
        lastModifiedDate,
        name: this.formatFilename(file),
        size,
        type,
        webkitRelativePath,
      };
    });
  }

  onFilesAdded(evt: any) {
    // evt && evt.preventDefault();
    if (this.state.disabled) return;

    let array;

    if (evt && evt.target) {
      array = this.fileListToArray(evt.target.files);
      const previewFiles = this.makeObjectUrls(array);
      this.setState({
        files: [...previewFiles],
      });
      return previewFiles;
    } else {
      array = this.fileListToArray(evt);
      const previewFiles = this.makeObjectUrls(array);

      this.setState({
        files: [...previewFiles],
      });
      return previewFiles;
    }
  }

  render() {
    const {
      dataAddProfilePicture,
      errorAddProfilePicture,
      loadingAddProfilePicture,
      dataMe,
    } = this.props;
    return (
      <SignS3Component>
        {(
          signS3,
          { data: dataSignS3, error: errorSignS3, loading: loadingSignS3 }
        ) => {
          if (errorAddProfilePicture)
            return (
              <div>
                Error adding profile picture!{" "}
                <pre>{JSON.stringify(errorAddProfilePicture, null, 2)}</pre>
              </div>
            );

          if (loadingAddProfilePicture) return <div>loading...</div>;
          let getUserId =
            (this.props.dataMe &&
              this.props.dataMe.me &&
              this.props.dataMe.me.id) ||
            "";
          return (
            <Flex justifyContent="center">
              <UploadProfilePictureForm
                dataMe={dataMe}
                files={this.state.files}
                handlePost={this.handlePost}
                userId={getUserId}
                fileInputKey={this.state.fileInputKey}
                mutationSignS3={signS3}
                dataSignS3={dataSignS3}
                errorSignS3={errorSignS3}
                loadingSignS3={loadingSignS3}
                disabled={this.state.disabled}
                handleRemoveIndividualImagePreview={
                  this.handleRemoveIndividualImagePreview
                }
                handleClearFilePreview={this.handleClearFilePreview}
                openFileDialog={this.openFileDialog}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                fileInputRef={this.fileInputRef}
                onFilesAdded={this.onFilesAdded}
                highlight={this.state.highlight}
                getSignature={this.getSignature}
                fileListToArray={this.fileListToArray}
                dataCreatePost={dataAddProfilePicture}
                errorCreatePost={errorAddProfilePicture}
                loadingCreatePost={loadingAddProfilePicture}
              />
            </Flex>
          );
        }}
      </SignS3Component>
    );
  }
}
