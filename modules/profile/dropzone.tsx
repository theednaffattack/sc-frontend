import React from "react";

import { Button, Flex, MaxFlex } from "../primitives/styled-rebass";
import ImagePreview from "./image-preview";

export const inputStyles = {
  display: "none"
};

export interface IDropzoneProps {
  openFileDialog: any;
  onDragOver: any;
  onDragLeave: any;
  onDrop: any;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFilesAdded: any;
  highlight: boolean;
  disabled: boolean;
  files: any[];
  getSignature: any;
  handleClearFilePreview: any;
}

function Dropzone({
  openFileDialog,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef,
  onFilesAdded,
  highlight,
  disabled,
  files,
  getSignature,
  handleClearFilePreview
}: IDropzoneProps) {
  return (
    <Flex flexDirection="column" width={[1, 1, 1]}>
      The Drop DropZone
      <Flex alignItems="center" flexDirection="column" width={[1, 1, 1]}>
        <MaxFlex
          bg={highlight ? "rgb(188,185,236)" : "#fff"}
          width="350px"
          border="2px dashed rgb(187, 186, 186)"
          minHeight={["350px"]}
          maxHeight="350px"
          style={{
            borderRadius: "50%",
            fontSize: "16px",
            cursor: disabled ? "default" : "pointer"
          }}
          onClick={openFileDialog}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={onFilesAdded}
            style={inputStyles}
            multiple
          />
        </MaxFlex>
      </Flex>
      <Button type="button" onClick={getSignature}>
        Upload to S3
      </Button>
      <Flex flexWrap="wrap" width={[1, 1, 1]}>
        <ImagePreview imageFiles={files} />
      </Flex>
      <Button type="button" onClick={handleClearFilePreview}>
        Clear `Files` State
      </Button>
    </Flex>
  );
}

export default Dropzone;
