import React from "react";
import Icon from "../icon/m-icon";

interface AvatarPlacehoderProps {
  size?: string;
}

const AvatarPlaceholder: React.FunctionComponent<AvatarPlacehoderProps> = ({
  size = "15rem"
}) => {
  return <Icon hover={false} name="account_circle" fill="orange" size={size} />;
};

export default AvatarPlaceholder;
