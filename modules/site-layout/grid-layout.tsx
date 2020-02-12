import React, { useState, useEffect } from "react";

import Layout from "../site-layout/main-v3";
import {
  Button,
  ChannelWrapper,
  Flex,
  GridPageContainer,
  HeaderWrapper,
  Heading,
  InputContainer,
  TeamWrapper,
  Text,
  UnstyledList,
  MaterialIconBase
} from "../primitives/styled-rebass";
import { TeamListItem, MappedTeamsProps } from "../grid-pieces/team-list-item";
import { UserListItem, UserListItemProps } from "../grid-pieces/user-list-item";
import { FormikDirectMessageForm } from "../grid-pieces/formik-direct-message-form";
import { FormikMessageForm } from "../grid-pieces/formik-message-form";
import { DirectMessageListItem } from "../grid-pieces/direct-message-list-item";
import { DirectMessages } from "../grid-pieces/direct-messages/direct-message-messages";
import { Messages } from "../grid-pieces/messages";
import {
  // ChannelListItem,
  ChannelListItemProps
} from "../grid-pieces/channel-list-item";
import {
  useMeQuery,
  useLoadDirectMessageThreadsByTeamAndUserLazyQuery,
  useGetAllTeamMembersQuery,
  LoadDirectMessageThreadsByTeamAndUserQuery,
  User,
  LoadChannelsByTeamIdQuery
  // useGetAllTeamMembersLazyQuery
} from "../gql-gen/generated/apollo-graphql";
import Header from "../grid-pieces/header";
import DirectMessageHeader from "../grid-pieces/direct-message-header";
import { AddChannelModal } from "../grid-pieces/add-channel-modal";
import { AddDirectMessageModal } from "../grid-pieces/direct-messages/direct-message-modal";
import { MessageListItemProps } from "../grid-pieces/message-list-item";
import { ProfileModal } from "../grid-pieces/profile-modal";
import { ApolloError } from "apollo-boost";

interface GridLayoutProps {
  title?: string;

  children: {
    channelFetchInfo?: {
      data: LoadChannelsByTeamIdQuery | undefined;
      error: ApolloError | undefined;
      loading: boolean;
    };
    messageId?: string;
    teamId?: string;
    channelId?: string;
    channelName?: string;
    directMessageThreads?: LoadDirectMessageThreadsByTeamAndUserQuery;
    setChannelName?: React.Dispatch<React.SetStateAction<string>>;
    mappedTeams: MappedTeamsProps[];
    selectedTeamName?: string;
    mappedChannels?: ChannelListItemProps[];
    mappedMessages?: MessageListItemProps[];
    mappedChannelMembers?: UserListItemProps[];
    renderChannelPanel?: React.ReactNode;
    renderTeamPanel?: React.ReactNode;
    threadId?: string;
    // selectedDirectMessageInvitees?: string;
    // setSelectedDirectMessageInvitees?: React.Dispatch<
    //   React.SetStateAction<string>
    // >;

    selectedDirectMessageInvitees: ({
      __typename?: "User" | undefined;
    } & Pick<User, "id" | "name">)[];

    setSelectedDirectMessageInvitees: React.Dispatch<
      React.SetStateAction<
        ({
          __typename?: "User" | undefined;
        } & Pick<User, "id" | "name">)[]
      >
    >;
  };
}

export type ModalStates = "isOpen" | "isClosed";

export type DirectMessageModalState = "isOpen" | "isClosed";

export const breakWidths = [1, 1, 1, "960px"];

const GridLayout: React.FunctionComponent<GridLayoutProps> = ({ children }) => {
  // let mappedMessages;
  // let mappedDirectMessages;
  let {
    // channelFetchInfo,
    channelName,
    channelId,
    mappedTeams,
    // mappedChannels,
    renderChannelPanel,
    renderTeamPanel,
    selectedTeamName,
    teamId,
    threadId,
    selectedDirectMessageInvitees,
    setSelectedDirectMessageInvitees
  } = children;

  const [
    loadDirectMessageThreadsByTeamAndUserLazyQuery,
    { data: dataLoadDirectMessageThreadsByTeamAndUserLazyQuery }
  ] = useLoadDirectMessageThreadsByTeamAndUserLazyQuery();

  // const [
  //   getAllTeamMembersLazyQuery,
  //   { data: dataGetAllTeamMembersLazyQuery }
  // ] = useGetAllTeamMembersLazyQuery();

  useEffect(() => {
    if (teamId) {
      // blah
      loadDirectMessageThreadsByTeamAndUserLazyQuery({ variables: { teamId } });
      // getAllTeamMembersLazyQuery({ variables: { teamId } });
    }
  }, [teamId]);

  const initialProfileModalState = "isClosed";
  const initialChannelModalState = "isClosed";
  const initialDirectMessageModalState = "isClosed";

  const [profileModalState, setProfileModalState] = useState<ModalStates>(
    initialProfileModalState
  );

  const [channelModalState, setChannelModalState] = useState<ModalStates>(
    initialChannelModalState
  );

  const [directMessageModalState, setDirectMessageModalState] = useState<
    DirectMessageModalState
  >(initialDirectMessageModalState);

  let { data: dataGetAllTeamMembers } = useGetAllTeamMembersQuery({
    variables: { teamId: teamId ?? "" }
  });

  let { data: dataMeQuery } = useMeQuery();

  return (
    <GridPageContainer>
      <TeamWrapper>
        <Flex flexDirection="column">
          {renderTeamPanel}
          <UnstyledList pl={0} my={0} mx="auto">
            {mappedTeams ? mappedTeams.map(TeamListItem) : ""}
          </UnstyledList>
        </Flex>
      </TeamWrapper>

      <ChannelWrapper>
        <Heading ml={2} fontFamily="main" as="h1" color="white">
          {selectedTeamName ? selectedTeamName : ""}
          {/* {mappedTeams
            ? mappedTeams.filter(team => {
                return team.id === teamId;
              })[0]?.name
            : ""} */}
        </Heading>
        <Flex alignItems="center">
          <Flex
            key={`logged-in-user-${dataMeQuery?.me?.id}`}
            flexDirection="column"
            alignItems="center"
            px={1}
            style={{ overflowX: "auto" }}
          >
            <MaterialIconBase
              name="account_circle"
              size="2rem"
              fill="#38978D"
            />
          </Flex>
          <Text fontSize="1.3rem" ml={2} mr="auto">
            {dataMeQuery?.me?.name ?? ""}
          </Text>

          <Flex mr={1}>
            <Button
              bg="transparent"
              p={1}
              type="button"
              onClick={() => setProfileModalState("isOpen")}
              style={{ textAlign: "center" }}
            >
              <span arial-role="cutton">
                <MaterialIconBase name="open_with" size="1rem" fill="#958993" />
              </span>
            </Button>
          </Flex>
        </Flex>
        {/* BEG - CHANNEL SECTION & SECTION HEADER */}
        <Flex mt={3} width={1} flexDirection="column">
          {/* BEG - CHANNEL  HEADER */}
          <Flex alignItems="center">
            <Text pl={2} mr={2}>
              Channels
            </Text>
            <Button
              bg="transparent"
              p={0}
              type="button"
              onClick={() => setChannelModalState("isOpen")}
              style={{ textAlign: "center" }}
            >
              <span arial-role="cutton">
                <MaterialIconBase
                  name="add_circle"
                  size="1rem"
                  fill="#958993"
                />
              </span>
            </Button>
          </Flex>
          {/* END - CHANNEL  HEADER */}

          {/* BEG - CHANNEL PANEL */}
          {renderChannelPanel}
          {/* <UnstyledList pl={0} my={0} width={1}>
            {channelFetchInfo && channelFetchInfo.loading
              ? "loading"
              : mappedChannels
              ? mappedChannels.map(ChannelListItem)
              : ""}
          </UnstyledList> */}
          {/* END - CHANNEL PANEL */}
        </Flex>

        {/* BEG - DIRECT MESSAGES SECTION & SECTION HEADER */}
        <Flex mt={3} width={1} flexDirection="column">
          <Flex alignItems="center">
            <Flex>
              <Text pl={2}>Direct Messages</Text>
            </Flex>
            <Flex ml="auto" mr={1}>
              <Button
                bg="transparent"
                p={1}
                type="button"
                onClick={() => setDirectMessageModalState("isOpen")}
                style={{ textAlign: "center" }}
              >
                <span arial-role="cutton">
                  <MaterialIconBase
                    name="add_circle"
                    size="1rem"
                    fill="#958993"
                  />
                </span>
              </Button>
            </Flex>
            <Flex mr={1}>
              <Button
                bg="transparent"
                p={1}
                type="button"
                onClick={() => setDirectMessageModalState("isOpen")}
                style={{ textAlign: "center" }}
              >
                <span arial-role="cutton">
                  <MaterialIconBase
                    name="open_with"
                    size="1rem"
                    fill="#958993"
                  />
                </span>
              </Button>
            </Flex>
          </Flex>

          {/* DIRECT MESSAGES PANEL */}
          <UnstyledList pl={0} my={0} width={1}>
            <UserListItem isMe={true} name={`${dataMeQuery?.me?.name} (you)`} />

            {dataLoadDirectMessageThreadsByTeamAndUserLazyQuery &&
            dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser
              ? dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser.map(
                  (dm, index) => {
                    return (
                      <DirectMessageListItem
                        highlight={threadId ? threadId === dm.id : false}
                        __typename={dm.__typename ?? ""}
                        key={`${index} - ${dm.__typename}`}
                        last_message={dm.last_message ?? ""}
                        messageThreadId={dm.id ?? ""}
                        teamId={teamId ?? ""}
                        invitees={dm.invitees ?? []}
                        selectedDirectMessageInvitees={
                          selectedDirectMessageInvitees
                        }
                        setSelectedDirectMessageInvitees={
                          setSelectedDirectMessageInvitees
                        }
                      />
                    );
                  }
                )
              : "BUNK???"}
          </UnstyledList>
        </Flex>
        {/* END - DIRECT MESSAGES SECTION */}

        <Flex mt={3} width={1} flexDirection="column">
          <Text pl={2}>Team Members</Text>

          <UnstyledList pl={0} my={0} width={1}>
            <UserListItem name="slackbot" />
            {dataGetAllTeamMembers?.getAllTeamMembers.map(UserListItem) ??
              "NO TEAM MEMBERS?"}
          </UnstyledList>
        </Flex>
      </ChannelWrapper>

      {teamId && teamId !== "isNull" ? (
        <ProfileModal
          userInfo={dataMeQuery?.me}
          teamId={teamId}
          profileModal={profileModalState}
          setProfileModal={setProfileModalState}
        />
      ) : (
        ""
      )}
      {teamId && teamId !== "isNull" ? (
        <AddChannelModal
          teamId={teamId}
          channelModal={channelModalState}
          setChannelModal={setChannelModalState}
        />
      ) : (
        ""
      )}
      {directMessageModalState === "isOpen" ? (
        <AddDirectMessageModal
          teamId={teamId ?? ""}
          dataGetAllTeamMembers={dataGetAllTeamMembers}
          directMessageModal={directMessageModalState}
          setDirectMessageModal={setDirectMessageModalState}
        />
      ) : (
        ""
      )}
      <HeaderWrapper>
        {channelId && channelId !== "none" && channelName ? (
          <Header channelId={channelId} channelName={channelName} />
        ) : null
        // <Header channelId="none" channelName="" />
        }

        {threadId ? (
          <DirectMessageHeader
            threadId={threadId}
            // setSelectedDirectMessageInvitees={setSelectedDirectMessageInvitees}
            selectedDirectMessageInvitees={selectedDirectMessageInvitees}
          />
        ) : null}
      </HeaderWrapper>
      {/* DIRECT MESSAGES QUERY */}
      {dataMeQuery && threadId ? (
        <DirectMessages dataMe={dataMeQuery.me} threadId={threadId} />
      ) : (
        ""
      )}

      {/* DISPLAY MESSAGES */}
      {dataMeQuery && channelId && !threadId ? (
        <Messages dataMe={dataMeQuery.me} channelId={channelId} />
      ) : (
        ""
      )}

      <InputContainer>
        {threadId &&
        dataLoadDirectMessageThreadsByTeamAndUserLazyQuery &&
        dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser ? (
          <>
            <FormikDirectMessageForm
              initialValues={{ direct_message: "" }}
              threadId={threadId}
              teamId={teamId ?? ""}
              invitees={dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser
                .filter(dm => dm.id === threadId)
                .map(single => single.invitees)[0]
                .map(blah => {
                  if (blah && blah.id) {
                    return blah.id;
                  } else {
                    return "";
                  }
                })}
            />
          </>
        ) : (
          ""
        )}
        {channelId ? (
          <>
            <FormikMessageForm
              channelId={channelId}
              initialValues={{
                channel_message: ""
              }}
            />{" "}
          </>
        ) : (
          ""
        )}
      </InputContainer>
    </GridPageContainer>
  );
};

// OLD IMPLEMENTATION
// export const getLayout = (page: any) => {
//   console.log("VIEW PAGE PROPS IN GRID-LAYOUT", { page });
//   return <GridLayout title={page.props.title}>{page}</GridLayout>;
// };
export const getLayout = (page: any) => {
  console.log("VIEW PAGE PROPS IN GRID-LAYOUT", { page });
  return (
    <Layout title={page.props.title}>
      <GridLayout>{page}</GridLayout>
    </Layout>
  );
};

export default GridLayout;
