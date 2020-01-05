import React from "react";

import {
  // Button,
  Card,
  Flex,
  Heading,
  // Icon,
  Image
  // Text,
  // FlexUserProfileWrap,
  // Avatar
} from "../primitives/styled-rebass";
import {
  // EditUserInfoComponent,
  // GetAllMyImagesComponent,
  MeComponent
} from "../gql-gen/generated/apollo-graphql";
// import { FullAccordion } from "./accordion";
// import AccordionSection from "./accordion-section";
// import UserInfo from "./user-info";
// import ToggleContent from "../modal/toggle-content";
// import Modal from "../modal/modal";
// import NewUserInfoEdit from "./new-user-info-edit";

interface ProfilePageProps {}

export const SeeMyImages = (data: any) => (
  <Flex
    flexDirection="row"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="center"
  >
    {data && data.data.GetAllMyImages
      ? data.data.GetAllMyImages.map((image: any, index: number) => (
          <Card
            bg="white"
            key={index}
            borderRadius="15px"
            boxShadow="0 0 16px rgba(0, 0, 0, .25)"
            width={[1, "350px", "350px"]}
            m={3}
            sx={{
              overflow: "hidden",
              padding: 1,
              borderRadius: 6,
              boxShadow: "0 0 16px rgba(0, 0, 0, .25)"
            }}
          >
            <Image src={`${image.uri}`} />
          </Card>
        ))
      : ""}
    {data && data.data.GetAllMyImages.length < 1 ? (
      <Heading>You don't have any images yet</Heading>
    ) : (
      ""
    )}
  </Flex>
);

const ProfilePage: React.FunctionComponent<ProfilePageProps> = () => (
  <MeComponent>
    {({ data: dataMe, error: errorMe, loading: loadingMe }) => {
      if (errorMe) {
        return <Flex>Error! {JSON.stringify(errorMe, null, 2)}</Flex>;
      }
      if (loadingMe) {
        <div>loading...</div>;
      }
      if (dataMe) {
        return <div>{JSON.stringify(dataMe, null, 2)}</div>;
      } else {
        return <div>ERROR! unspecified state!</div>;
      }
    }}
  </MeComponent>
);

export default ProfilePage;
