import React from "react";
// import { createPortal } from "react-dom";

import { Card, Flex } from "../primitives/styled-rebass";
// import { isBrowser } from "../../lib/isBrowser";

interface ModalProps {}

const styles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  padding: 0,
  margin: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  border: "3px solid grey"
};

// const Modal: React.FunctionComponent<ModalProps> = ({ children }) => {

//   return createPortal(
//     <div style={styles}>
//       <Flex pt="115px" width={1} justifyContent="center" border="crimson">
//         <Card
//           width={[1, 1, "960px"]}
//           bg="white"
//           p={3}
//           sx={{
//             borderRadius: "17px"
//           }}
//         >
//           {children}
//         </Card>
//       </Flex>
//     </div>,
//     modalRoot
//   );
// };

const Modal: React.FunctionComponent<ModalProps> = ({ children }) => {
  return (
    <div style={styles}>
      <Flex pt="115px" width={1} justifyContent="center" border="crimson">
        <Card
          width={[1, 1, "960px"]}
          bg="white"
          p={3}
          sx={{
            borderRadius: "17px"
          }}
        >
          {children}
        </Card>
      </Flex>
    </div>
  );
};

export default Modal;
