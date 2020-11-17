import React from "react";

interface GoogleDocsViewerProps {
  fileUrl: string;
  width: string;
  height: string;
  // style: any;
}

export const GoogleDocsViewer: React.FC<GoogleDocsViewerProps> = ({
  fileUrl,
  height,
  width
}) => {
  let iframeSrc =
    "https://docs.google.com/viewer?url=" + fileUrl + "&embedded=true";

  let style = {
    width,
    height,
    border: "none"
  };
  return (
    // <div>
    <iframe src={iframeSrc} style={style}></iframe>
    // </div>
  );
};

export default GoogleDocsViewer;
