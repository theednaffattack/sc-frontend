import React, { useState, useRef, useEffect } from "react";

import "./styles.css";

interface FileUploadProps {}

// It's not clear to me how to trigger updates to the UI
const useForceUpdate = () => useState()[1];

const FileUpload: React.FunctionComponent<FileUploadProps> = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    window.addEventListener("keyup", clickFileInput);
    return () => window.removeEventListener("keyup", clickFileInput);
  });

  function clickFileInput(e: any) {
    if (
      fileInput !== null &&
      fileInput.current !== null &&
      fileInput.current.nextSibling !== null &&
      fileInput.current.nextSibling.contains(document.activeElement)
    ) {
      // Bind space to trigger clicking of the button when focused
      if (e.keyCode === 32) {
        fileInput.current.click();
      }
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fileInput && fileInput.current && fileInput.current.files) {
      // const data = new FormData(fileInput.current.files);
      let arrayOfFiles = Array.from(fileInput.current.files);
      console.log("SUBMISSION!", arrayOfFiles);
    }
  }

  function fileNames() {
    const { current } = fileInput;

    if (current && current.files && current.files.length > 0) {
      let arrayOfFiles = Array.from(current.files);
      let messages: any[] = [];
      for (let file of arrayOfFiles) {
        messages = messages.concat(<p key={file.name}>{file.name}</p>);
      }
      return messages;
    }
    return null;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          id="file"
          type="file"
          ref={fileInput}
          // The onChange should trigger updates whenever
          // the value changes?
          // Try to select a file, then try selecting another one.
          onChange={() => forceUpdate}
          multiple
        />
        <label htmlFor="file">
          <span tabIndex={0} role="button" aria-controls="filename">
            Upload file(s):{" "}
          </span>
        </label>
        {fileNames()}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FileUpload;
