import React from "react";
import { UniversalPortal } from "@jesstelford/react-portal-universal";
import Link from "next/link";

import {
  AbFlex,
  Card,
  Button,
  Flex,
  StyledHr,
  Text
} from "../primitives/styled-rebass";
import { ModalStates } from "../site-layout/grid-layout";
import { MeQuery } from "../gql-gen/generated/apollo-graphql";
import AvatarPlaceholder from "../profile/avatar-placeholder";

interface ProfileModalProps {
  userInfo: MeQuery["me"] | undefined;
  profileModal: string;
  setProfileModal: React.Dispatch<React.SetStateAction<ModalStates>>;
  teamId?: string;
}

export type MessageBoxState = "isOpen" | "isClosed";

export const ProfileModal: React.FunctionComponent<ProfileModalProps> = ({
  profileModal,
  setProfileModal,
  teamId,
  userInfo
}) => {
  // let profieModalFlipper =
  //   profileModal === "isOpen"
  //     ? ("isClosed" as ModalStates)
  //     : ("isOpen" as ModalStates);
  // const initialMessageBoxState = "isOpen";
  // const [messageBox, setMessageBox] = useState<MessageBoxState>(
  //   initialMessageBoxState
  // );

  return (
    <>
      {profileModal === "isOpen" ? (
        <UniversalPortal selector="#modal">
          <AbFlex
            position="fixed"
            bg="rgba(0, 0, 0, 0.7)"
            top={0}
            width={[1 / 2, 1 / 2, 1 / 3, 1 / 5, 1 / 5]}
            // left={150}
            right={0}
            bottom={0}
            border="lime"
          >
            <Card p={0} pb={3} width={1}>
              <Flex
                p={2}
                mb={2}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                style={{ position: "relative" }}
              >
                <Text>Profile</Text>
              </Flex>
              <StyledHr my={0} />
              <Flex
                px={2}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <AvatarPlaceholder />
                <Flex my={3} flexDirection="column">
                  <Text>{userInfo ? userInfo.name : ""}</Text>
                  <Text>{userInfo?.email}</Text>
                </Flex>
                <Flex my={3} flexDirection="column">
                  <Text>TEAM ID</Text>

                  {teamId ? teamId : "no team ID"}
                </Flex>
                {/* <Button type="button" onClick={()=>}>Logout</Button> */}
                <Link href="/logout" passHref={true}>
                  <a>logout</a>
                </Link>

                <Button
                  type="button"
                  onClick={() => setProfileModal("isClosed")}
                >
                  Close
                </Button>
              </Flex>
            </Card>
          </AbFlex>
        </UniversalPortal>
      ) : (
        ""
      )}
    </>
  );
};
