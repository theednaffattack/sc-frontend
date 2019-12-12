import React from "react";
import paths from "./paths.json";
import wired from "./wired";

interface IJsonKeys {
  [key: string]: string;
}

let typedPaths: IJsonKeys = paths;

interface IIconProps {
  name: string;
  size: string;
  fill: string;
  width?: string;
  height?: string;
}

interface WiredIconProps {
  index: 0;
  size: string;
  fill: string;
  width?: string;
  height?: string;
}

const Icon = ({
  name = "close",
  size = "1em",
  fill = "currentColor",
  width,
  height,
  ...props
}: IIconProps) => {
  const path = typedPaths[name];

  return (
    <svg
      {...props}
      width={width || size}
      height={height || size}
      fill={fill}
      data-id={`${name}`}
      viewBox="0 0 32 32"
    >
      <path d={path} />
    </svg>
  );
};

export const WiredIcon = ({
  index = 0,
  size = "1em",
  fill = "currentColor",
  width,
  height,
  ...props
}: WiredIconProps) => {
  const path: string = (wired as any)[index];

  return (
    <svg
      {...props}
      width={width || size}
      height={height || size}
      fill={fill}
      data-id={`${index}`}
      viewBox="0 0 32 32"
    >
      <path d={path} />
    </svg>
  );
};

export default Icon;
