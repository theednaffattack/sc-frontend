import React, { useCallback, useEffect, useRef } from "react";
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
  let listBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listBottomRef && listBottomRef.current) {
      listBottomRef.current.scrollTop = listBottomRef.current.scrollHeight;
    }
  }, [children]);

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
    <div
      ref={listBottomRef}
      {...getRootProps({
        style: { minHeight: "100%" }
      })}
    >
      {children}
      <input {...getInputProps({ name: "files" })} />
    </div>
  );
};
