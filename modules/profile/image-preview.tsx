import React, { Component } from "react";
import { Image } from "../primitives/styled-rebass";

interface IImagePreviewProps {
  errors?: any;
  touched?: any;
  files?: string[];
  imageFiles: string[];
  values?: any;
}

export default class ImagePreview extends Component<
  IImagePreviewProps,
  object
> {
  render() {
    const { imageFiles } = this.props;
    return (
      <>
        {imageFiles
          ? imageFiles.map((imageFile: any, index: number) => {
              return (
                <Image
                  height="auto"
                  width={[1 / 2, 1 / 2, 1 / 2]}
                  key={index}
                  src={imageFile.blobUrl}
                />
              );
            })
          : ""}
      </>
    );
  }
}
