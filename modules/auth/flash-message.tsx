import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {
  flex,
  position,
  space,
  width,
  FlexProps,
  FlexDirectionProps,
  PositionProps,
  SpaceProps,
  WidthProps
} from "styled-system";

import { CloseButton } from "./close-button";
import { FlashProps } from "../../pages/login";

interface FlashMessageProps {
  flashIsOpen: boolean;
  setFlashIsOpen: FlashProps["setFlashIsOpen"];
}

const MotionDiv = styled(motion.div)<
  FlexProps & FlexDirectionProps & PositionProps & SpaceProps & WidthProps
>`
  ${flex}
  ${position}
  ${width}
  ${space}
`;

export const FlashMessage: React.FunctionComponent<FlashMessageProps> = ({
  children,
  flashIsOpen,
  setFlashIsOpen
}) => {
  const variants = {
    open: {
      display: "block",
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
        // delay: 0.5,
        // type: "spring",
        // stiffness: 40,
        // damping: 40
      }
    },
    closed: {
      display: "none",
      opacity: 0,
      y: 10,
      scale: 1,
      transition: {
        duration: 0.3
        // delay: 0.5,
        // type: "spring",
        // stiffness: 400,
        // damping: 40
      }
    },
    exit: {
      display: "block",
      opacity: 0,
      y: 10,
      scale: 1,
      transition: {
        duration: 0.3
        // delay: 0.5,
        // type: "spring",
        // stiffness: 400,
        // damping: 40
      }
    }
  };
  return (
    <AnimatePresence initial={true}>
      {flashIsOpen && (
        <MotionDiv
          key="flash-motion"
          initial={variants.closed}
          animate={variants.open}
          exit={variants.exit}
          my={2}
          mx={3}
          p={3}
          width={["350px", "350px", "350px", "350px"]}
          flexDirection="row"
          position="relative"
          style={{
            // marginLeft: "16px",
            // marginRight: "16px",
            backgroundColor: "yellow"
          }}
        >
          <CloseButton
            fill="#e44f00"
            size="23px"
            close={() => setFlashIsOpen(false)}
          />
          {children}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
