import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  MaterialIconBase,
  StyledListItem
} from "../primitives/styled-rebass";
// import { TeamListItem, MappedTeamsProps } from "../grid-pieces/team-list-item";
import { UserListItem } from "../grid-pieces/user-list-item";
import { SC_Word as Word } from "../grid-pieces/content-placeholder";
import { FormikMessageForm } from "../grid-pieces/formik-message-form";

import { FormikDirectMessageForm } from "../grid-pieces/formik-direct-message-form";
// import { DirectMessages } from "../grid-pieces/direct-messages/direct-message-messages";
import { Messages } from "../grid-pieces/messages";
// import {
//   // ChannelListItem,
//   ChannelListItemProps
// } from "../grid-pieces/channel-list-item";
import {
  useMeQuery,
  useLoadDirectMessageThreadsByTeamAndUserLazyQuery,
  useGetAllTeamsForUserQuery,
  // useLoadChannelsByTeamIdQuery,
  useLoadChannelsByTeamIdLazyQuery,
  User,
  useGetAllTeamMembersLazyQuery,
  MeQueryResult,
  LoadDirectMessageThreadsByTeamAndUserQuery,
  LoadChannelsByTeamIdQuery
  // User
  // LoadDirectMessageThreadsByTeamAndUserQuery,
  // LoadChannelsByTeamIdQuery
  // useGetAllTeamMembersLazyQuery
} from "../gql-gen/generated/apollo-graphql";
import Header from "../grid-pieces/header_v2";
import DirectMessageHeader from "../grid-pieces/direct-message-header";
import { AddChannelModal } from "../grid-pieces/add-channel-modal";
import { AddDirectMessageModal } from "../grid-pieces/direct-messages/direct-message-modal";
// import { MessageListItemProps } from "../grid-pieces/message-list-item";
import { ProfileModal } from "../grid-pieces/profile-modal";
import { RenderTeamPanel } from "../grid-pieces/render-team-panel";
import { RenderChannelPanel } from "../grid-pieces/render-channel-panel";
import { RenderDirectMessagesPanel } from "../grid-pieces/render-direct-message-panel";
// import { ApolloError } from "apollo-boost";

interface GridLayoutProps {
  title?: string;
  channelName?: string;

  setChannelName?: React.Dispatch<React.SetStateAction<string>>;

  selectedDirectMessageInvitees?: ({
    __typename?: "User" | undefined;
  } & Pick<User, "id" | "name">)[];

  setSelectedDirectMessageInvitees?: React.Dispatch<
    React.SetStateAction<
      ({
        __typename?: "User" | undefined;
      } & Pick<User, "id" | "name">)[]
    >
  >;
}

export type ModalStatesType = "isOpen" | "isClosed";

export type DirectMessageModalState = "isOpen" | "isClosed";

type ViewerShowModes = "channel" | "directMessage" | "default";

type ActiveModalType =
  | "directMessage"
  | "profile"
  | "teamMember"
  | "modalIsInactive";

export interface ViewerStateInterface {
  count: number;
  teamIdShowing: string | null;
  viewerMode?: ViewerShowModes;
  idShowing?: string;
  modalState?: ModalStatesType;
  activeModalId?: ActiveModalType;
  headerInfo?:
    | LoadChannelsByTeamIdQuery["loadChannelsByTeamId"][0]["name"]
    | LoadDirectMessageThreadsByTeamAndUserQuery["loadDirectMessageThreadsByTeamAndUser"][0]["invitees"];
}

export type ViewerActionType =
  | { type: "reset" }
  | { type: "decrement" }
  | { type: "increment" }
  | { type: "updateViewerMode"; mode: ViewerShowModes }
  | {
      type: "updateViewerModeAndHeaderInfo";
      mode: ViewerShowModes;
      data?: string;
      header?: ViewerStateInterface["headerInfo"];
    }
  | {
      type: "updateTeamId";
      data: string;
    }
  | { type: "toggleModal" };

export const breakWidths = [1, 1, 1, "960px"];

const initialViewerState: ViewerStateInterface = {
  count: -1,
  teamIdShowing: null,
  viewerMode: "default",
  modalState: "isClosed",
  activeModalId: "modalIsInactive",
  headerInfo: "",
  idShowing: ""
};

// function init() {
//   return initialViewerState;
// }

function reducer(
  state: ViewerStateInterface,
  event: ViewerActionType
): ViewerStateInterface {
  switch (event.type) {
    case "increment":
      return {
        teamIdShowing: state.teamIdShowing,
        count: state.count + 1,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: state.headerInfo,
        idShowing: state.idShowing,
        viewerMode: state.viewerMode
      };
    case "decrement":
      return {
        teamIdShowing: state.teamIdShowing,
        count: state.count - 1,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: state.headerInfo,
        idShowing: state.idShowing,
        viewerMode: state.viewerMode
      };
    case "reset":
      return {
        count: 0,
        teamIdShowing: null,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: state.headerInfo,
        idShowing: state.idShowing,
        viewerMode: state.viewerMode
      };
    case "toggleModal":
      return {
        teamIdShowing: state.teamIdShowing,
        count: state.count,
        modalState: state.modalState === "isOpen" ? "isClosed" : "isOpen",
        activeModalId:
          state.modalState === "isOpen" ? "modalIsInactive" : "directMessage",
        headerInfo: state.headerInfo,
        idShowing: state.idShowing,
        viewerMode: state.viewerMode
      };

    case "updateViewerModeAndHeaderInfo":
      return {
        teamIdShowing: state.teamIdShowing,
        count: state.count,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: event.header,
        idShowing: event.data,
        viewerMode: event.mode
      };

    case "updateTeamId":
      return {
        teamIdShowing: event.data,
        count: state.count,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: state.headerInfo,
        idShowing: state.idShowing,
        viewerMode: state.viewerMode
      };
    default:
      throw new Error("Expected a different event.type!");
  }
}

const GridLayout: React.FunctionComponent<GridLayoutProps> = ({
  children,
  setChannelName,
  selectedDirectMessageInvitees,
  setSelectedDirectMessageInvitees
  // channelName,
  // ...props
}) => {
  const router = useRouter();

  const [
    loadDirectMessageThreadsByTeamAndUserLazyQuery,
    {
      data: dataLoadDirectMessageThreadsByTeamAndUserLazyQuery,
      // error: errorLoadDirectMessageThreadsByTeamAndUserLazyQuery,
      loading: loadingLoadDirectMessageThreadsByTeamAndUserLazyQuery
      // ...theRestLoadDirectMessageThreadsByTeamAndUserLazyQuery
    }
  ] = useLoadDirectMessageThreadsByTeamAndUserLazyQuery();

  const {
    data: dataGetAllTeamsForUserQuery,
    error: errorGetAllTeamsForUserQuery,
    loading: loadingGetAllTeamsForUserQuery,
    ...theRestGetAllTeamsForUserQuery
  } = useGetAllTeamsForUserQuery();

  const [
    loadChannelsByTeamIdQuery,
    {
      data: dataUseLoadChannelsByTeamIdQuery,
      error: errorUseLoadChannelsByTeamIdQuery,
      loading: loadingUseLoadChannelsByTeamIdQuery,
      ...theRestUseLoadChannelsByTeamIdQuery
    }
  ] = useLoadChannelsByTeamIdLazyQuery();

  const [
    getAllTeamMembersLazyQuery,
    {
      data: dataGetAllTeamMembersLazyQuery
      // error: errorGetAllTeamMembersLazyQuery,
      // loading: loadingGetAllTeamMembersLazyQuery
      // ...theRestGetAllTeamMembersLazyQuery
    }
  ] = useGetAllTeamMembersLazyQuery();

  const [meData, setMeData] = useState<MeQueryResult["data"]>(undefined);
  const [channelIdb, setChannelIdb] = useState<string | null | undefined>(
    undefined
  );

  const [viewerState, viewerDispatch] = React.useReducer(
    reducer,
    initialViewerState
    // init
  );

  let { data: dataMeQuery } = useMeQuery();

  useEffect(() => {
    if (viewerState.teamIdShowing) {
      console.log("USE EFFECT PRE-DISPATCH IN GRID LAYOUT V2", {
        channelID: viewerState.idShowing,
        teamID: viewerState.teamIdShowing,
        data: dataUseLoadChannelsByTeamIdQuery,
        viewerState,
        theRestUseLoadChannelsByTeamIdQuery_CALLED:
          theRestUseLoadChannelsByTeamIdQuery["variables"]
      });
      loadChannelsByTeamIdQuery({
        variables: {
          teamId: viewerState.teamIdShowing
        }
      });

      console.log("WHAT CHANNEL ID FROM USE EFFECT grid layout is SHOWING???", {
        channelID: viewerState.idShowing,
        teamID: viewerState.teamIdShowing,
        data: dataUseLoadChannelsByTeamIdQuery
      });
      loadDirectMessageThreadsByTeamAndUserLazyQuery({
        variables: { teamId: viewerState.teamIdShowing }
      });
      getAllTeamMembersLazyQuery({
        variables: { teamId: viewerState.teamIdShowing }
      });
    }
    if (viewerState.teamIdShowing === null && dataGetAllTeamsForUserQuery) {
      const teamId = dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id;

      loadDirectMessageThreadsByTeamAndUserLazyQuery({ variables: { teamId } });
      getAllTeamMembersLazyQuery({ variables: { teamId } });

      viewerDispatch({
        type: "updateTeamId",
        data: teamId
      });
    }
    if (dataMeQuery) {
      setMeData(dataMeQuery);
    }

    // if we're coming from "default" aka the "/view-team" (with no trailing "teamId") route
    if (
      dataUseLoadChannelsByTeamIdQuery &&
      dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId &&
      dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0] &&
      dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0].id &&
      viewerState &&
      viewerState.viewerMode &&
      !router.pathname.includes("/channel/") &&
      !router.pathname.includes("/mmessages/")
    ) {
      viewerDispatch({
        type: "updateViewerModeAndHeaderInfo",
        mode: viewerState.viewerMode,
        data: dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0].id, // should i add it manually here? it's probably an empty string
        header: dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0].name
      });
    }

    // if we're coming from a "channel" route...
    // update state with: type, mode, data, header
    if (
      dataUseLoadChannelsByTeamIdQuery &&
      dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId &&
      viewerState &&
      viewerState.viewerMode &&
      viewerState.idShowing !== "" &&
      router.pathname.includes("/channel/")
    ) {
      console.log("CHECK CHANNEL ROTES FROM MEW", {
        data: dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId,
        idShowing: viewerState.idShowing,
        teamId: viewerState.teamIdShowing
      });
      viewerDispatch({
        type: "updateViewerModeAndHeaderInfo",
        mode: "channel",
        data: viewerState?.idShowing ?? "no-id???",
        header: dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId.filter(
          channel => {
            console.log("channel_id_AND_viewerState_idShowing", {
              channel_id: channel.id,
              viewerState_idShowing: viewerState.idShowing
            });
            channel.id === viewerState.idShowing;
          }
        )[0]
          ? dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId.filter(
              channel => {
                console.log("channel_id_AND_viewerState_idShowing", {
                  channel_id: channel.id,
                  viewerState_idShowing: viewerState.idShowing
                });
                channel.id === viewerState.idShowing;
              }
            )[0].name
          : ""
      });
    }

    // if we're coming from a DM route
    if (
      dataLoadDirectMessageThreadsByTeamAndUserLazyQuery &&
      dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser &&
      viewerState &&
      viewerState.viewerMode === "directMessage" &&
      viewerState.idShowing &&
      !router.pathname.includes("/channel/")
    ) {
      viewerDispatch({
        type: "updateViewerModeAndHeaderInfo",
        mode: "directMessage",
        data:
          dataLoadDirectMessageThreadsByTeamAndUserLazyQuery?.loadDirectMessageThreadsByTeamAndUser?.filter(
            thread => thread.id === viewerState.idShowing
          )[0]?.id ?? "",
        header:
          dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser.filter(
            thread => thread.id === viewerState.idShowing
          )[0]?.invitees ?? "no-header-thread-page"
      });
    }
  }, [
    viewerState.teamIdShowing,
    dataMeQuery,
    dataUseLoadChannelsByTeamIdQuery?.loadChannelsByTeamId,
    dataLoadDirectMessageThreadsByTeamAndUserLazyQuery,
    viewerState.viewerMode === "channel",
    viewerState.idShowing,

    viewerState.teamIdShowing !== null
  ]);

  let childrentWithMeDataAndMeSetter;

  if (
    React.isValidElement(children) &&
    dataUseLoadChannelsByTeamIdQuery
    // &&
    // channelIdb
  ) {
    childrentWithMeDataAndMeSetter = React.cloneElement(children, {
      setMeData: setMeData,
      meData,
      channelIdb,
      setChannelIdb,
      viewerDispatch,
      viewerState,
      headerInfo: dataUseLoadChannelsByTeamIdQuery
    });
  }

  const initialProfileModalState = "isClosed";
  const initialChannelModalState = "isClosed";
  const initialDirectMessageModalState = "isClosed";

  const [profileModalState, setProfileModalState] = useState<ModalStatesType>(
    initialProfileModalState
  );

  const [channelModalState, setChannelModalState] = useState<ModalStatesType>(
    initialChannelModalState
  );

  const [directMessageModalState, setDirectMessageModalState] = useState<
    DirectMessageModalState
  >(initialDirectMessageModalState);

  // // MAP CHANNELS
  // if (
  //   dataGetAllTeamsForUserQuery &&
  //   dataUseLoadChannelsByTeamIdQuery &&
  //   dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId
  // ) {
  //   mappedChannels = dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId.map(
  //     channel => {
  //       let highlight = false;

  //       let channelObj = {
  //         ...channel,
  //         teamId: dataGetAllTeamsForUserQuery
  //           ? dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
  //           : "",
  //         highlight,
  //         setChannelName,
  //         setOnClickValue: channel.name
  //       };
  //       return channelObj;
  //     }
  //   );
  // } else {
  //   mappedChannels = fakeMappedChannels;
  // }

  return (
    <GridPageContainer>
      <TeamWrapper>
        <Flex flexDirection="column">
          <RenderTeamPanel
            selectedTeamId=""
            data={dataGetAllTeamsForUserQuery}
            error={errorGetAllTeamsForUserQuery}
            loading={loadingGetAllTeamsForUserQuery}
            {...theRestGetAllTeamsForUserQuery}
          />
        </Flex>
      </TeamWrapper>

      <ChannelWrapper>
        <Heading ml={2} fontFamily="main" as="h1" color="white">
          {/* {selectedTeamName ? selectedTeamName : ""} */}
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
                <MaterialIconBase name="open_with" size="1em" fill="#958993" />
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

          {/* SCENARIO 1 - WE HAVE CHANNEL ID AND TEAM ID FROM A ROUTE */}
          {viewerState.teamIdShowing !== null &&
          dataUseLoadChannelsByTeamIdQuery &&
          dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId &&
          dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0] &&
          setChannelName &&
          viewerState &&
          viewerState.idShowing &&
          viewerState.idShowing.length > 0 ? (
            <RenderChannelPanel
              channelId={viewerState.idShowing}
              teamId={viewerState.teamIdShowing}
              data={dataUseLoadChannelsByTeamIdQuery}
              error={errorUseLoadChannelsByTeamIdQuery}
              loading={loadingUseLoadChannelsByTeamIdQuery}
              viewerState={viewerState}
              viewerDispatch={viewerDispatch}
              // setChannelName={setChannelName}
              // setOnClickValue={
              //   dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0].name
              // }
              {...theRestUseLoadChannelsByTeamIdQuery}
            />
          ) : viewerState.teamIdShowing &&
            setChannelName && // {/* SCENARIO 2 - WE DON'T HAVE CHANNEL ID BUT TEAM ID HAS BEEN SET VIA ROUTE */}
            dataUseLoadChannelsByTeamIdQuery &&
            dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId &&
            dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0] &&
            dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0].id ? (
            <RenderChannelPanel
              channelId={
                dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0].id
              }
              teamId={viewerState.teamIdShowing}
              data={dataUseLoadChannelsByTeamIdQuery}
              error={errorUseLoadChannelsByTeamIdQuery}
              loading={loadingUseLoadChannelsByTeamIdQuery}
              // setChannelName={setChannelName}
              // setOnClickValue={
              //   dataUseLoadChannelsByTeamIdQuery.loadChannelsByTeamId[0].name
              // }
              {...theRestUseLoadChannelsByTeamIdQuery}
            />
          ) : (
            "nope"
          )}

          {/* END - CHANNEL PANEL */}
        </Flex>

        {/* BEG - DIRECT MESSAGES SECTION & SECTION HEADER */}
        <Flex mt={3} width={1} flexDirection="column">
          {/* DIRECT MESSAGES HEADER */}
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
          {viewerState.teamIdShowing ? (
            <RenderDirectMessagesPanel
              data={dataLoadDirectMessageThreadsByTeamAndUserLazyQuery}
              loading={loadingLoadDirectMessageThreadsByTeamAndUserLazyQuery}
              dataMeQuery={dataMeQuery}
              teamId={viewerState.teamIdShowing}
              threadId={
                viewerState.viewerMode === "directMessage" &&
                viewerState.idShowing
                  ? viewerState.idShowing
                  : ""
              }
              selectedDirectMessageInvitees={selectedDirectMessageInvitees}
              setSelectedDirectMessageInvitees={
                setSelectedDirectMessageInvitees
              }
            />
          ) : (
            ""
          )}
        </Flex>
        {/* END - DIRECT MESSAGES SECTION */}

        {/* BEG - TEAM MEMBERS SECTION */}
        <Flex mt={3} width={1} flexDirection="column">
          <Text pl={2}>Team Members</Text>

          <UnstyledList pl={0} my={0} width={1}>
            <UserListItem name="slackbot" />
            {dataGetAllTeamMembersLazyQuery?.getAllTeamMembers.map(
              ({user: {id, name}})=><UserListItem id={id} name={name} isMe={id === dataMeQuery?.me?.id}  />
            ) ??
              Array.from({ length: 7 }).map((_, index) => (
                <StyledListItem key={index}>
                  <Word
                    bg="rgba(255,255,255,0.4)"
                    // mb={2}
                    // mr={2}
                    borderRadius="8px"
                    height="18px"
                    width={1}
                    sx={{
                      display: "inline-block"
                    }}
                  />
                </StyledListItem>
              ))}
          </UnstyledList>
        </Flex>
        {/* END - TEAM MEMBERS SECTION */}
      </ChannelWrapper>

      {viewerState.teamIdShowing && viewerState.teamIdShowing !== null ? (
        <ProfileModal
          userInfo={dataMeQuery?.me}
          teamId={viewerState.teamIdShowing}
          profileModal={profileModalState}
          setProfileModal={setProfileModalState}
        />
      ) : (
        ""
      )}
      {viewerState.teamIdShowing && viewerState.teamIdShowing !== null ? (
        <AddChannelModal
          teamId={viewerState.teamIdShowing}
          channelModal={channelModalState}
          setChannelModal={setChannelModalState}
        />
      ) : (
        ""
      )}
      {directMessageModalState === "isOpen" ? (
        <AddDirectMessageModal
          teamId={viewerState.teamIdShowing ?? ""}
          dataGetAllTeamMembers={dataGetAllTeamMembersLazyQuery}
          directMessageModal={directMessageModalState}
          setDirectMessageModal={setDirectMessageModalState}
        />
      ) : (
        ""
      )}
      <HeaderWrapper>
        {viewerState.headerInfo &&
        // viewerState.idShowing &&
        viewerState.viewerMode === "channel" ? (
          <Header
            // channelId={viewerState.idShowing}
            data={viewerState.headerInfo}
          />
        ) : null
        // <Header channelId="none" channelName="" />
        }
        {viewerState.headerInfo &&
        // viewerState.idShowing &&
        viewerState.viewerMode === "default" ? (
          <Header
            // channelId={viewerState.idShowing}
            data={viewerState.headerInfo}
          />
        ) : null
        // <Header channelId="none" channelName="" />
        }

        {/* DM HEADER */}
        {viewerState.headerInfo &&
        viewerState.idShowing &&
        viewerState.viewerMode === "directMessage" &&
        typeof viewerState.headerInfo !== "string" ? (
          <DirectMessageHeader
            selectedDirectMessageInvitees={viewerState.headerInfo}
          />
        ) : null
        // <Header channelId="none" channelName="" />
        }

        {/* {threadId ? (
          <DirectMessageHeader
            threadId={threadId}
            setSelectedDirectMessageInvitees={setSelectedDirectMessageInvitees}
            selectedDirectMessageInvitees={selectedDirectMessageInvitees}
          />
        ) : null} */}
      </HeaderWrapper>
      {/* DIRECT MESSAGES QUERY */}
      {/* {dataMeQuery && threadId ? (
        <DirectMessages dataMe={dataMeQuery.me} threadId={threadId} />
      ) : (
        ""
      )} */}

      {/* DISPLAY MESSAGES */}
      {dataMeQuery &&
      !router.pathname.includes("/channel/") &&
      !router.pathname.includes("/mmessages/") &&
      viewerState &&
      viewerState.idShowing &&
      viewerState.viewerMode !== "directMessage" ? (
        <Messages dataMe={dataMeQuery.me} channelId={viewerState.idShowing} 
        fileViewerModalState={{id: "",uri:"",view:"isClosed"}}
        setFileViewerModalState={()=>console.log("SET FILE VIEWER MODAL STATE")
        }
         />
      ) : (
        ""
      )}
      {childrentWithMeDataAndMeSetter}
      {/* {children} */}
      <InputContainer>
        {viewerState &&
        viewerState.idShowing &&
        !router.pathname.includes("/channel") &&
        !router.pathname.includes("/mew-team") &&
        viewerState.headerInfo &&
        typeof viewerState.headerInfo !== "string" &&
        viewerState.viewerMode === "directMessage" &&
        viewerState.idShowing.length > 0 ? (
          <>
            <FormikDirectMessageForm
              initialValues={{ direct_message: "", files: [] }}
              threadId={viewerState.idShowing}
              teamId={viewerState.teamIdShowing ?? ""}
              invitees={
                viewerState.headerInfo.map(person => {
                  if (person.id) return person.id;
                  return "";
                })
                // dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser
                // .filter(dm => dm.id === threadId)
                // .map(single => single.invitees)[0]
                // .map(blah => {
                //   if (blah && blah.id) {
                //     return blah.id;
                //   } else {
                //     return "";
                //   }
                // })
              }
            />
          </>
        ) : (
          ""
        )}
        {viewerState &&
        viewerState.idShowing &&
        typeof viewerState.idShowing === "string" &&
        !router.pathname.includes("/mmessage") &&
        viewerState.idShowing.length > 0 ? (
          <FormikMessageForm
            channelId={viewerState.idShowing}
            teamId={viewerState.idShowing}
            initialValues={{
              channel_message: "",
              files: []
            }}
          />
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
  return (
    <Layout title={page.props.title}>
      <GridLayout title={page.props.title}>{page}</GridLayout>
    </Layout>
  );
};

export default GridLayout;
