import React from "react";

import paths from "./material-paths.json";
import { MaterialIcons } from "./generated-material-icon-types";
import styled from "styled-components";

type PathInfo = keyof MaterialIcons;

let typedPaths: MaterialIcons = paths;

interface IIconProps {
  name: PathInfo;
  size: string;
  fill: string;
  width?: string;
  height?: string;
  setColor?: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties | undefined;
}

// const Link = styled.a`
//   display: flex;
//   align-items: center;
//   padding: 5px 10px;
//   background: papayawhip;
//   color: palevioletred;
// `;

const SVG = styled.svg`
  transition: fill 0.25s;
  /* width: 48px;
  height: 48px; */

  &:hover {
    fill: rebeccapurple;
    cursor: pointer;
  }
`;

const Icon: React.FunctionComponent<IIconProps> = ({
  name = "home",
  size = "1em",
  fill = "currentColor",
  width,
  height,
  setColor,
  ...props
}) => {
  let iconPaths = typedPaths[name];

  let length = iconPaths && iconPaths.length ? iconPaths.length : 0;

  // type T01 = Array<MaterialIcons[PathInfo]>;

  let mappedPaths: any;

  if (iconPaths && iconPaths.length > 0) {
    // @ts-ignore
    mappedPaths = (iconPaths as any).map((path: any, index: number) => {
      return (
        <path
          key={`${path}-${index}`}
          className={name}
          data-id={name}
          fill={path.fill ? path.fill : fill}
          d={path.path}
        />
      );
      // return "hello";
    });
  } else {
    mappedPaths = [];
  }

  if (iconPaths && length > 0) {
    return (
      <SVG
        {...props}
        width={width || size}
        height={height || size}
        fill={fill}
        data-id={`${name}`}
        viewBox="0 0 24 24"
        onMouseEnter={() => (setColor ? setColor("crimson") : null)}
        onMouseLeave={() => (setColor ? setColor("rebeccapurple") : null)}
      >
        {/* <path d={iconPaths[0].path} /> */}
        {mappedPaths}
      </SVG>
    );
  } else {
    return (
      <svg
        {...props}
        width={width || size}
        height={height || size}
        fill={fill}
        data-id={`${name}`}
        viewBox="0 0 24 24"
      >
        <path d="" />
      </svg>
    );
  }
};

export default Icon;
