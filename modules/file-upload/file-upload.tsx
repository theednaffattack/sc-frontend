import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// import { Input } from "../primitives/forms";

interface FileUploadProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  children,
  setFieldValue
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const previewFiles = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFieldValue("files", previewFiles);

    // acceptedFiles.forEach(file => {
    //   const reader = new FileReader();

    //   reader.onabort = () => console.log("file reading was aborted");
    //   reader.onerror = () => console.log("file reading has failed");
    //   reader.onload = () => {
    //     // Do whatever you want with the file contents
    //     const binaryStr = reader.result;
    //     console.log(binaryStr);
    //   };
    //   reader.readAsArrayBuffer(file);
    // });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ name: "files" })} />
      {children}
    </div>
  );
};
