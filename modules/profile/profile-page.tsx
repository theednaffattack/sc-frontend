import React from "react";

import {
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  FlexUserProfileWrap,
  Avatar
} from "../primitives/styled-rebass";
import {
  EditUserInfoComponent,
  // GetAllMyImagesComponent,
  MeComponent
} from "../gql-gen/generated/apollo-graphql";
// import { FullAccordion } from "./accordion";
// import AccordionSection from "./accordion-section";
// import UserInfo from "./user-info";
import ToggleContent from "../modal/toggle-content";
import Modal from "../modal/modal";
import NewUserInfoEdit from "./new-user-info-edit";

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
      return (
        <div>
          <GetAllMyImagesComponent>
            {({ data, loading, error }) => {
              if (!data || !data.GetAllMyImages) {
                return null;
              }
              if (error) {
                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Heading>error!!!</Heading>
                    <Text>{error.message}</Text>
                  </Flex>
                );
              }
              if (loading) {
                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Heading>loading...</Heading>
                  </Flex>
                );
              }

              return data && data.GetAllMyImages ? (
                <Flex flexDirection="column">
                  <Heading as="h1" fontFamily="main">
                    Profile
                  </Heading>
                  <Flex
                    alignSelf="center"
                    mt={2}
                    mb={3}
                    flexDirection="column"
                    width="350px"
                  >
                    {dataMe && dataMe.me ? (
                      <Flex
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        mb={3}
                      >
                        <FlexUserProfileWrap
                          height="300px"
                          width="300px"
                          overflow="hidden"
                          borderRadius="50%"
                          bg="thread_footer"
                          alignItems="center"
                          justifyContent="center"
                          boxShadow="2px 2px 16px rgba(0, 0, 0, 0.25)"
                        >
                          {dataMe.me.profileImageUri ? (
                            <Avatar
                              src={dataMe.me.profileImageUri}
                              width={300}
                              height={300}
                            />
                          ) : (
                            <Icon size="2em" name="user" fill="white" />
                          )}
                        </FlexUserProfileWrap>
                        <Flex flexDirection="column">
                          <Text fontFamily="main" fontSize="2em">
                            {dataMe.me.firstName}
                          </Text>
                          <Text fontFamily="main" fontSize="2em">
                            {dataMe.me.lastName}
                          </Text>
                          <Text fontFamily="main" fontSize="2em">
                            {dataMe.me.email}
                          </Text>
                        </Flex>
                      </Flex>
                    ) : (
                      ""
                    )}
                    {/* MODAL EXPERIEMENT */}
                    <div
                      sx={{
                        position: "relative"
                      }}
                    >
                      <ToggleContent
                        toggle={(show: any) => (
                          <Button type="button" onClick={show}>
                            Edit User Info
                          </Button>
                        )}
                        content={(hide: any) => (
                          <Modal>
                            <Button type="button" onClick={hide}>
                              Close
                            </Button>
                            <EditUserInfoComponent>
                              {(
                                editUserInfo,
                                {
                                  data: dataEditUserInfo,
                                  error: errorEditUserInfo,
                                  loading: loadingEditUserInfo
                                }
                              ) => {
                                return (
                                  <>
                                    <NewUserInfoEdit
                                      editUserInfo={editUserInfo}
                                      dataEditUserInfo={dataEditUserInfo}
                                      errorEditUserInfo={errorEditUserInfo}
                                      loadinEditUserInfo={loadingEditUserInfo}
                                      dataMe={dataMe}
                                      errorMe={errorMe}
                                      loadingMe={loadingMe}
                                      closeModal={hide}
                                    />
                                    {/* <UserInfo
                                    dataMe={dataMe}
                                    errorMe={errorMe}
                                    loadingMe={loadingMe}
                                    editUserInfo={editUserInfo}
                                    dataEditUserInfo={dataEditUserInfo}
                                    errorEditUserInfo={errorEditUserInfo}
                                    loadingEditUserInfo={loadingEditUserInfo}
                                  /> */}
                                  </>
                                );
                              }}
                            </EditUserInfoComponent>
                          </Modal>
                        )}
                      />
                    </div>
                    {/* MODAL EXPERIEMENT */}

                    {/* <EditUserInfoComponent>
                      {(
                        editUserInfo,
                        {
                          data: dataEditUserInfo,
                          error: errorEditUserInfo,
                          loading: loadingEditUserInfo
                        }
                      ) => {
                        return (
                          <UserInfo
                            dataMe={dataMe}
                            errorMe={errorMe}
                            loadingMe={loadingMe}
                            editUserInfo={editUserInfo}
                            dataEditUserInfo={dataEditUserInfo}
                            errorEditUserInfo={errorEditUserInfo}
                            loadingEditUserInfo={loadingEditUserInfo}
                          />
                        );
                      }}
                    </EditUserInfoComponent>
                    
                  */}
                  </Flex>
                  {/* <FullAccordion /> */}
                  <Heading alignSelf="center" as="h3" fontFamily="main">
                    Image Uploads
                  </Heading>
                  <SeeMyImages data={data} />
                </Flex>
              ) : null;
            }}
          </GetAllMyImagesComponent>
        </div>
      );
    }}
  </MeComponent>
);

export default ProfilePage;
