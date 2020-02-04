import React from "react";

interface RenderSetChannelNameProps {
  myChannelName: string;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}

export const RenderSetChannelName: React.FunctionComponent<RenderSetChannelNameProps> = ({
  myChannelName,
  setChannelName
}) => {
  console.log("VIEW MY CHANNEL NAME", myChannelName);
  setChannelName(myChannelName);
  return null;
};
