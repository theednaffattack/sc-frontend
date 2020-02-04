import React from "react";
import styled from "styled-components";

import paths from "./material-paths.json";
import { MaterialIcons } from "./generated-material-icon-types";
import { space } from "styled-system";

type PathInfo = keyof MaterialIcons;

let typedPaths: MaterialIcons = paths;

export interface MaterialIconProps {
  name: PathInfo;
  size: string;
  fill: string;
  width?: string;
  height?: string;
  setColor?: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties | undefined;
  setTranslation?: string;
  hover?: boolean;
}

// const Link = styled.a`
//   display: flex;
//   align-items: center;
//   padding: 5px 10px;
//   background: papayawhip;
//   color: palevioletred;
// `;

const SVG = styled.svg`
  ${space}

  transition: fill 0.25s;
  /* width: 48px;
  height: 48px; */

  &:hover {
    fill: rebeccapurple;
    cursor: pointer;
  }
`;

const Path = styled.path`
  /* &:hover {
    fill: rebeccapurple;
  } */
`;

const MaterialIcon: React.FunctionComponent<MaterialIconProps> = ({
  name = "home",
  size = "1em",
  fill = "currentColor",
  width,
  height,
  setColor,
  setTranslation,
  ...props
}) => {
  let iconPaths = typedPaths[name];

  let length = iconPaths && iconPaths.length ? iconPaths.length : 0;

  let mappedPaths: any;

  if (iconPaths && iconPaths.length > 0) {
    mappedPaths = iconPaths.map((path, index: number) => {
      return (
        <Path
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
        transform={setTranslation}
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

export default MaterialIcon;
