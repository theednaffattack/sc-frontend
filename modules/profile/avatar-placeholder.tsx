import React from "react";
import Icon from "../icon/m-icon";

interface AvatarPlacehoderProps {
  size?: string;
}

export const AvatarPlaceholder: React.FunctionComponent<AvatarPlacehoderProps> = ({
  size
}) => {
  return (
    <Icon
      hover={false}
      name="account_circle"
      fill="orange"
      size={size ?? "120px"}
    />
  );
};

export default AvatarPlaceholder;
