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

export const FileUploadNoClick: React.FC<FileUploadProps> = ({
  children,
  setFieldValue
}) => {
  let listBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listBottomRef && listBottomRef.current) {
      listBottomRef.current.scrollTop = listBottomRef.current.scrollHeight;
    }
  }, [children]);

  // async function convertBlob(file: File) {
  //   // const copyFile = Object.assign(file);

  //   const convertBlob = await FileType.fromBlob(file);
  //   return convertBlob;
  // }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const previewFiles = acceptedFiles.map(file => {
      if (file.type.includes("image")) {
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
      }
      if (file.type.includes("application/pdf")) {
        return Object.assign(file, {
          preview: "pdf-svg"
        });
      } else {
        return Object.assign(file, {
          preview: "general-file"
        });
      }
    });

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
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true
  });

  return (
    <div
      ref={listBottomRef}
      {...getRootProps({
        style: { minHeight: "100%", border: "1px transparent solid" }
      })}
    >
      {children}
      <input {...getInputProps({ name: "files" })} />
    </div>
  );
};
