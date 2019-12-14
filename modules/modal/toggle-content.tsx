import React, { useState } from "react";

interface ToggleContentProps {
  toggle: any;
  content: any;
}

type ShowHideVoid = () => void;

const ToggleContent: React.FunctionComponent<ToggleContentProps> = ({
  toggle,
  content
}) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const hide: ShowHideVoid = () => setIsShown(false);
  const show: ShowHideVoid = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && content(hide)}
    </>
  );
};

export default ToggleContent;
