import React, { useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";

import Layout from "../site-layout/main-v3";
import {
  Button,
  ChannelWrapper,
  Flex,
  GridPageContainer,
  HeaderWrapper,
  Heading,
  TeamWrapper,
  Text,
  UnstyledList,
  MaterialIconBase,
  StyledListItem
} from "../primitives/styled-rebass";
import { SC_Word as Word } from "../grid-pieces/content-placeholder";
import { FormikMessageForm } from "../grid-pieces/formik-message-form";
import { FormikDirectMessageForm } from "../grid-pieces/formik-direct-message-form";
import { EmptyMessagesWrapper } from "../grid-pieces/empty-messages-wrapper";
import {} from "../grid-pieces/messages";
import {
  useMeQuery,
  useLoadDirectMessageThreadsByTeamAndUserLazyQuery,
  useGetAllTeamsForUserQuery,
  useLoadChannelsByTeamIdLazyQuery,
  User,
  useGetAllTeamMembersLazyQuery,
  LoadDirectMessageThreadsByTeamAndUserQuery,
  LoadChannelsByTeamIdQuery
} from "../gql-gen/generated/apollo-graphql";
import Header from "../grid-pieces/header_v2";
import DirectMessageHeader from "../grid-pieces/direct-message-header";
import { AddTeamMemberModal } from "../grid-pieces/add-team-member-modal";
import { AddChannelModal } from "../grid-pieces/add-channel-modal";
import { AddDirectMessageModal } from "../grid-pieces/direct-messages/direct-message-modal";
import { ProfileModal } from "../grid-pieces/profile-modal";
import { RenderTeamPanel } from "../grid-pieces/render-team-panel";
import { RenderChannelPanel } from "../grid-pieces/render-channel-panel";
import { RenderDirectMessagesPanel } from "../grid-pieces/render-direct-message-panel";
import { AdminEditUserModal } from "../grid-pieces/admin-edit-user-modal";
import { TeamMemberListItem } from "../grid-pieces/team-member-list-item";

interface EmptyGridProps {}

const EmptyGrid: React.FC<EmptyGridProps> = () => {
  return <GridPageContainer>Empty</GridPageContainer>;
};

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
  router: NextRouter;
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
        viewerMode: state.viewerMode,
        router: state.router
      };
    case "decrement":
      return {
        teamIdShowing: state.teamIdShowing,
        count: state.count - 1,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: state.headerInfo,
        idShowing: state.idShowing,
        viewerMode: state.viewerMode,
        router: state.router
      };
    case "reset":
      return {
        count: 0,
        teamIdShowing: null,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: state.headerInfo,
        idShowing: state.idShowing,
        viewerMode: state.viewerMode,
        router: state.router
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
        viewerMode: state.viewerMode,
        router: state.router
      };

    case "updateViewerModeAndHeaderInfo":
      return {
        teamIdShowing: state.teamIdShowing,
        count: state.count,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: event.header,
        idShowing: event.data,
        viewerMode: event.mode,
        router: state.router
      };

    case "updateTeamId":
      return {
        teamIdShowing: event.data,
        count: state.count,
        modalState: state.modalState,
        activeModalId: state.activeModalId,
        headerInfo: state.headerInfo,
        idShowing: state.idShowing,
        viewerMode: state.viewerMode,
        router: state.router
      };
    default:
      throw new Error("Expected a different event.type!");
  }
}

export const noQParams = {
  teamId: "teamIdUndefined",
  channelId: "channelIdUndefined",
  threadId: "threadIdUndefined"
};

function getQueryVariables(
  router: NextRouter
): {
  teamId: string;
  threadId: string;
  channelId: string;
} {
  let teamId;
  let threadId;
  let channelId;
  let returnObj;

  if (router && router.query) {
    const { query } = router;

    const {
      teamId: teamIdBase,
      threadId: threadIdBase,
      channelId: channelIdBase
    } = query;

    teamId = teamIdBase
      ? typeof teamIdBase === "string"
        ? teamIdBase
        : teamIdBase[0]
      : noQParams.teamId;

    threadId = threadIdBase
      ? typeof threadIdBase === "string"
        ? threadIdBase
        : threadIdBase[0]
      : noQParams.threadId;

    channelId = channelIdBase
      ? typeof channelIdBase === "string"
        ? channelIdBase
        : channelIdBase[0]
      : noQParams.channelId;

    returnObj = {
      teamId,
      threadId,
      channelId
    };
  } else {
    returnObj = {
      teamId: noQParams.teamId,
      threadId: noQParams.threadId,
      channelId: noQParams.channelId
    };
  }

  return returnObj;
}

const GridLayout: React.FunctionComponent<GridLayoutProps> = ({ children }) => {
  const router: NextRouter = useRouter();

  const isDynamicPage = (theRouter: NextRouter) => {
    if (theRouter && theRouter.route) {
      return /\[.+\]/.test(theRouter.route);
    }
    return false;
  };

  const routerIsReady = (theRouter: NextRouter) =>
    !isDynamicPage(theRouter) || router.asPath !== theRouter.route;

  const initialViewerState: ViewerStateInterface = {
    count: -1,
    teamIdShowing: null,
    viewerMode: "default",
    modalState: "isClosed",
    activeModalId: "modalIsInactive",
    headerInfo: "",
    idShowing: "",
    router
  };

  const {
    data: dataGetAllTeamsForUserQuery,
    error: errorGetAllTeamsForUserQuery,
    loading: loadingGetAllTeamsForUserQuery,
    ...theRestGetAllTeamsForUserQuery
  } = useGetAllTeamsForUserQuery();

  const [
    loadDirectMessageThreadsByTeamAndUserLazyQuery,
    resultLoadDirectMessageThreadsByTeamAndUserLazyQuery
  ] = useLoadDirectMessageThreadsByTeamAndUserLazyQuery();

  const {
    data: dataLoadDirectMessageThreadsByTeamAndUserLazyQuery,
    // error: errorLoadDirectMessageThreadsByTeamAndUserLazyQuery,
    loading: loadingLoadDirectMessageThreadsByTeamAndUserLazyQuery
    // ...theRestLoadDirectMessageThreadsByTeamAndUserLazyQuery
  } = resultLoadDirectMessageThreadsByTeamAndUserLazyQuery;

  const [
    loadChannelsByTeamIdQuery,
    resultUseLoadChannelsByTeamIdQuery
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

  const [channelIdb, setChannelIdb] = useState<string | null | undefined>(
    undefined
  );

  const [viewerState, viewerDispatch] = React.useReducer(
    reducer,
    initialViewerState
  );

  let { data: dataMeQuery } = useMeQuery();

  useEffect(() => {
    // DATA LOAD SCENARIO #1 (TEAMS & MEMBERS) - if we  DO NOT HAVE a channel ID OR Team ID from router
    if (
      routerIsReady(router) === true &&
      dataGetAllTeamsForUserQuery &&
      dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
      dataGetAllTeamsForUserQuery.getAllTeamsForUser[0] !== undefined &&
      dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id &&
      getQueryVariables(router).channelId === noQParams.channelId &&
      getQueryVariables(router).teamId === noQParams.teamId
    ) {
      console.log("SCENARIO #1 - TEAMS & MEMBERS");

      loadChannelsByTeamIdQuery({
        variables: {
          teamId: dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
        }
      });

      getAllTeamMembersLazyQuery({
        variables: {
          teamId: dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
        }
      });

      loadDirectMessageThreadsByTeamAndUserLazyQuery({
        variables: {
          teamId: dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
        }
      });
    }

    // DATA LOAD SCENARIO (TEAMS & TEAM MEMBERS) #2 - if we have a team ID & channel ID
    if (
      routerIsReady(router) === true &&
      getQueryVariables(router).channelId !== noQParams.channelId &&
      getQueryVariables(router).teamId !== noQParams.teamId
    ) {
      loadChannelsByTeamIdQuery({
        variables: {
          teamId: getQueryVariables(router).teamId
        }
      });

      getAllTeamMembersLazyQuery({
        variables: {
          teamId: getQueryVariables(router).teamId
        }
      });

      loadDirectMessageThreadsByTeamAndUserLazyQuery({
        variables: {
          teamId: getQueryVariables(router).teamId
        }
      });
    }

    // DATA LOAD SCENARIO #3 - TEAMS & MEMBERS - if we have a team ID but no channel ID
    if (
      routerIsReady(router) === true &&
      getQueryVariables(router).channelId === noQParams.channelId &&
      getQueryVariables(router).teamId !== noQParams.teamId
    ) {
      loadChannelsByTeamIdQuery({
        variables: {
          teamId: getQueryVariables(router).teamId
        }
      });

      getAllTeamMembersLazyQuery({
        variables: {
          teamId: getQueryVariables(router).teamId
        }
      });

      loadDirectMessageThreadsByTeamAndUserLazyQuery({
        variables: {
          teamId: getQueryVariables(router).teamId
        }
      });
    }
  }, [
    routerIsReady(router) === true,
    dataGetAllTeamsForUserQuery,
    getQueryVariables(router).teamId,
    getQueryVariables(router).channelId
  ]);

  let childrentWithMeDataAndMeSetter;

  if (
    routerIsReady(router) === true &&
    React.isValidElement(children) &&
    resultUseLoadChannelsByTeamIdQuery &&
    resultUseLoadChannelsByTeamIdQuery.data &&
    getQueryVariables(router).channelId !== noQParams.channelId
    // &&
    // channelIdb
  ) {
    childrentWithMeDataAndMeSetter = React.cloneElement(children, {
      setMeData: () => console.log,
      clonedChannelId: getQueryVariables(router).channelId,
      clonedTeamId: getQueryVariables(router).teamId,
      clonedThreadId: getQueryVariables(router).threadId,
      meData: dataMeQuery,
      channelIdb,
      setChannelIdb,
      viewerDispatch,
      viewerState,
      headerInfo: resultUseLoadChannelsByTeamIdQuery.data
    });
  }

  if (
    routerIsReady(router) === true &&
    React.isValidElement(children) &&
    resultUseLoadChannelsByTeamIdQuery &&
    resultUseLoadChannelsByTeamIdQuery.data &&
    resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId &&
    resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0].id &&
    getQueryVariables(router).channelId === noQParams.channelId
    // &&
    // channelIdb
  ) {
    childrentWithMeDataAndMeSetter = React.cloneElement(children, {
      setMeData: () => console.log,
      clonedChannelId:
        resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0].id,
      clonedTeamId: getQueryVariables(router).teamId,
      clonedThreadId: getQueryVariables(router).threadId,
      meData: dataMeQuery,
      channelIdb,
      setChannelIdb,
      viewerDispatch,
      viewerState,
      headerInfo: resultUseLoadChannelsByTeamIdQuery.data
    });
  }

  const initialAdminEditUserModalState = "isClosed";
  const initialProfileModalState = "isClosed";
  const initialChannelModalState = "isClosed";
  const initialDirectMessageModalState = "isClosed";

  const initialTeamMemberModalState = "isClosed";

  const [profileModalState, setProfileModalState] = useState<ModalStatesType>(
    initialProfileModalState
  );

  const [adminEditUserModalState, setAdminEditUserModalState] = useState<
    ModalStatesType
  >(initialAdminEditUserModalState);

  const [channelModalState, setChannelModalState] = useState<ModalStatesType>(
    initialChannelModalState
  );

  const [directMessageModalState, setDirectMessageModalState] = useState<
    ModalStatesType
  >(initialDirectMessageModalState);

  const [teamMemberModalState, setTeamMemberModalState] = useState<
    ModalStatesType
  >(initialTeamMemberModalState);

  if (dataGetAllTeamsForUserQuery === undefined) {
    return <EmptyGrid>NOTHING TO SEE HERE!!!</EmptyGrid>;
  } else {
    let teamMembers = dataGetAllTeamMembersLazyQuery?.getAllTeamMembers.map(
      person => {
        const returnObject = {
          ...person,
          adminEditUserModalState,
          setAdminEditUserModalState
        };
        // console.log("RETURN OBJECT", { returnObject });
        return returnObject;
      }
    );

    return (
      <GridPageContainer>
        <TeamWrapper>
          <RenderTeamPanel
            data={dataGetAllTeamsForUserQuery}
            error={errorGetAllTeamsForUserQuery}
            loading={loadingGetAllTeamsForUserQuery}
            selectedTeamId={getQueryVariables(router).teamId}
            {...theRestGetAllTeamsForUserQuery}
          />
        </TeamWrapper>
        <ChannelWrapper>
          {/* IF WE'RE ON THE VIEW-TEAM INDEX */}
          {dataGetAllTeamsForUserQuery &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser[0] &&
          getQueryVariables(router).teamId === noQParams.teamId ? (
            <Heading ml={2} fontFamily="main" as="h1" color="white">
              {dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].name}
            </Heading>
          ) : (
            ""
          )}
          {/* IF WE ARE NOT ON THE VIEW-TEAM INDEX */}
          {dataGetAllTeamsForUserQuery &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
          routerIsReady(router) &&
          getQueryVariables(router).teamId !== noQParams.teamId ? (
            <Heading ml={2} fontFamily="main" as="h1" color="white">
              {dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].name}
            </Heading>
          ) : (
            ""
          )}
          {/* USERNAME HEADER */}

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
                size="2em"
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
                  <MaterialIconBase
                    name="open_with"
                    size="1em"
                    fill="#958993"
                  />
                </span>
              </Button>
            </Flex>
          </Flex>

          {/* BEG - CHANNEL SECTION & SECTION HEADER */}
          {dataGetAllTeamsForUserQuery &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser.length > 0 ? (
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
                  <span arial-role="button">
                    <MaterialIconBase
                      name="add_circle"
                      size="1em"
                      fill="#958993"
                    />
                  </span>
                </Button>
              </Flex>
              {/* END - CHANNEL  HEADER */}

              {/* BEG - CHANNEL PANEL */}
              {/* SCENARIO 1 - WE HAVE CHANNEL ID AND TEAM ID FROM A ROUTE */}
              {getQueryVariables(router).channelId !== noQParams.channelId &&
              getQueryVariables(router).teamId !== noQParams.teamId &&
              resultUseLoadChannelsByTeamIdQuery ? (
                <RenderChannelPanel
                  channelId={getQueryVariables(router).channelId}
                  teamId={getQueryVariables(router).teamId}
                  data={resultUseLoadChannelsByTeamIdQuery.data}
                  error={resultUseLoadChannelsByTeamIdQuery.error}
                  loading={resultUseLoadChannelsByTeamIdQuery.loading}
                  viewerState={viewerState}
                  viewerDispatch={viewerDispatch}
                  {...resultUseLoadChannelsByTeamIdQuery}
                />
              ) : (
                ""
              )}
              {/* SCENARIO 2 - WE DO NOT HAVE CHANNEL ID NOR TEAM ID FROM A ROUTE */}
              {getQueryVariables(router).channelId === noQParams.channelId &&
              getQueryVariables(router).teamId === noQParams.teamId &&
              resultUseLoadChannelsByTeamIdQuery &&
              resultUseLoadChannelsByTeamIdQuery.data &&
              resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId &&
              resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0]
                .id ? (
                <RenderChannelPanel
                  channelId={
                    resultUseLoadChannelsByTeamIdQuery.data
                      .loadChannelsByTeamId[0].id
                  }
                  teamId={dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id}
                  data={resultUseLoadChannelsByTeamIdQuery.data}
                  error={resultUseLoadChannelsByTeamIdQuery.error}
                  loading={resultUseLoadChannelsByTeamIdQuery.loading}
                  viewerState={viewerState}
                  viewerDispatch={viewerDispatch}
                  {...resultUseLoadChannelsByTeamIdQuery}
                />
              ) : (
                ""
              )}
              {/* SCENARIO 3 - WE DO NOT HAVE CHANNEL ID NOR THREAD ID, BUT WE *DO HAVE* TEAM ID FROM A ROUTE */}
              {getQueryVariables(router).channelId === noQParams.channelId &&
              getQueryVariables(router).threadId === noQParams.threadId &&
              getQueryVariables(router).teamId !== noQParams.teamId &&
              resultUseLoadChannelsByTeamIdQuery &&
              resultUseLoadChannelsByTeamIdQuery.data &&
              resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId &&
              resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0]
                .id ? (
                <RenderChannelPanel
                  channelId={
                    resultUseLoadChannelsByTeamIdQuery.data
                      .loadChannelsByTeamId[0].id
                  }
                  teamId={getQueryVariables(router).teamId}
                  data={resultUseLoadChannelsByTeamIdQuery.data}
                  error={resultUseLoadChannelsByTeamIdQuery.error}
                  loading={resultUseLoadChannelsByTeamIdQuery.loading}
                  viewerState={viewerState}
                  viewerDispatch={viewerDispatch}
                  {...resultUseLoadChannelsByTeamIdQuery}
                />
              ) : (
                ""
              )}
              {/* CHANNEL PANEL - SCENARIO 3 - WE DO NOT HAVE CHANNEL ID NOR THREAD ID, BUT WE *DO HAVE* TEAM ID FROM A ROUTE */}
              {getQueryVariables(router).channelId === noQParams.channelId &&
              getQueryVariables(router).threadId !== noQParams.threadId &&
              getQueryVariables(router).teamId !== noQParams.teamId &&
              resultUseLoadChannelsByTeamIdQuery &&
              resultUseLoadChannelsByTeamIdQuery.data &&
              resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId &&
              resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0]
                .id ? (
                <RenderChannelPanel
                  channelId={""}
                  teamId={getQueryVariables(router).teamId}
                  data={resultUseLoadChannelsByTeamIdQuery.data}
                  error={resultUseLoadChannelsByTeamIdQuery.error}
                  loading={resultUseLoadChannelsByTeamIdQuery.loading}
                  viewerState={viewerState}
                  viewerDispatch={viewerDispatch}
                  {...resultUseLoadChannelsByTeamIdQuery}
                />
              ) : (
                ""
              )}
              {/* END - CHANNEL PANEL */}
            </Flex>
          ) : (
            ""
          )}

          {/* BEG - DIRECT MESSAGES SECTION & SECTION HEADER */}
          {dataGetAllTeamsForUserQuery &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser.length > 0 ? (
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
                        size="1em"
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
                        size="1em"
                        fill="#958993"
                      />
                    </span>
                  </Button>
                </Flex>
              </Flex>

              {/* DIRECT MESSAGES PANEL */}
              {/* DM SCENARIO 1 - WE'RE ON A DM ROUTE AND HAVE THREAD ID AND TEAM ID  */}
              {routerIsReady(router) === true &&
              dataLoadDirectMessageThreadsByTeamAndUserLazyQuery &&
              getQueryVariables(router).teamId !== noQParams.teamId &&
              getQueryVariables(router).threadId !== noQParams.threadId ? (
                <RenderDirectMessagesPanel
                  data={dataLoadDirectMessageThreadsByTeamAndUserLazyQuery}
                  loading={
                    loadingLoadDirectMessageThreadsByTeamAndUserLazyQuery
                  }
                  dataMeQuery={dataMeQuery}
                  teamId={getQueryVariables(router).teamId}
                  threadId={getQueryVariables(router).threadId}
                  selectedDirectMessageInvitees={
                    // dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser.filter(
                    //   dm => {
                    //     console.log("VIEW DM", { dm });
                    //     return dm.id === getQueryVariables(router).threadId;
                    //   }
                    // )[0].invitees
                    []
                  }
                  setSelectedDirectMessageInvitees={() => console.log}
                />
              ) : (
                // <
                ""
              )}

              {/* DM SCENARIO 2 - WE'RE NOT ON A DM ROUTE AND HAVE TEAM ID, BUT NO THREAD ID  */}
              {routerIsReady(router) &&
              dataLoadDirectMessageThreadsByTeamAndUserLazyQuery &&
              dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser &&
              dataLoadDirectMessageThreadsByTeamAndUserLazyQuery
                .loadDirectMessageThreadsByTeamAndUser[0] &&
              // dataLoadDirectMessageThreadsByTeamAndUserLazyQuery
              // .loadDirectMessageThreadsByTeamAndUser[0].id &&
              getQueryVariables(router).teamId !== noQParams.teamId &&
              getQueryVariables(router).threadId === noQParams.threadId ? (
                <RenderDirectMessagesPanel
                  data={dataLoadDirectMessageThreadsByTeamAndUserLazyQuery}
                  loading={
                    loadingLoadDirectMessageThreadsByTeamAndUserLazyQuery
                  }
                  dataMeQuery={dataMeQuery}
                  teamId={getQueryVariables(router).teamId}
                  threadId={
                    ""
                    // dataLoadDirectMessageThreadsByTeamAndUserLazyQuery
                    //   .loadDirectMessageThreadsByTeamAndUser[0].id
                  }
                  selectedDirectMessageInvitees={
                    dataLoadDirectMessageThreadsByTeamAndUserLazyQuery
                      .loadDirectMessageThreadsByTeamAndUser[0].invitees
                  }
                  setSelectedDirectMessageInvitees={() => console.log}
                />
              ) : (
                ""
              )}

              {/* DM SCENARIO 3 - WE'RE ON VIEW TEAM INDEX  */}
              {dataLoadDirectMessageThreadsByTeamAndUserLazyQuery &&
              dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser &&
              dataLoadDirectMessageThreadsByTeamAndUserLazyQuery
                .loadDirectMessageThreadsByTeamAndUser[0] &&
              dataLoadDirectMessageThreadsByTeamAndUserLazyQuery
                .loadDirectMessageThreadsByTeamAndUser[0].id &&
              getQueryVariables(router).teamId === noQParams.teamId &&
              getQueryVariables(router).threadId === noQParams.threadId ? (
                <RenderDirectMessagesPanel
                  data={dataLoadDirectMessageThreadsByTeamAndUserLazyQuery}
                  loading={
                    loadingLoadDirectMessageThreadsByTeamAndUserLazyQuery
                  }
                  dataMeQuery={dataMeQuery}
                  teamId={getQueryVariables(router).teamId}
                  threadId={
                    ""
                    // dataLoadDirectMessageThreadsByTeamAndUserLazyQuery
                    //   .loadDirectMessageThreadsByTeamAndUser[0].id
                  }
                  selectedDirectMessageInvitees={
                    dataLoadDirectMessageThreadsByTeamAndUserLazyQuery
                      .loadDirectMessageThreadsByTeamAndUser[0].invitees
                  }
                  setSelectedDirectMessageInvitees={() => console.log}
                />
              ) : (
                ""
              )}
            </Flex>
          ) : (
            ""
          )}
          {/* END - DIRECT MESSAGES SECTION */}

          {/* BEG - TEAM MEMBERS SECTION */}

          {dataGetAllTeamsForUserQuery &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
          dataGetAllTeamsForUserQuery.getAllTeamsForUser.length > 0 ? (
            // &&
            // getQueryVariables(router).teamId !== noQParams.teamId
            <Flex mt={3} width={1} flexDirection="column">
              <Flex alignItems="center">
                <Text pl={2}>Team Members</Text>

                <Button
                  bg="transparent"
                  p={0}
                  type="button"
                  onClick={() => setTeamMemberModalState("isOpen")} // CHANGE THIS TO NEW ADD TEAM MEMBER MODAL
                  style={{ textAlign: "center" }}
                  ml="auto"
                  mr={2}
                >
                  <span arial-role="cutton">
                    <MaterialIconBase
                      name="add_circle"
                      size="1em"
                      fill="#958993"
                    />
                  </span>
                </Button>
              </Flex>
              <UnstyledList pl={0} my={0} width={1}>
                <TeamMemberListItem user={{ name: "slackbot", id: "fake" }} />
                {(teamMembers && teamMembers.map(TeamMemberListItem)) ??
                  //  JSON.stringify(teamMembers)
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
          ) : (
            ""
          )}
          {/* END - TEAM MEMBERS SECTION */}
        </ChannelWrapper>
        {profileModalState === "isOpen" &&
        dataGetAllTeamsForUserQuery &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser ? (
          <ProfileModal
            userInfo={dataMeQuery?.me}
            teamId={
              getQueryVariables(router).teamId !== noQParams.teamId
                ? getQueryVariables(router).teamId
                : dataGetAllTeamsForUserQuery.getAllTeamsForUser[0] &&
                  dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
                ? dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
                : "blank teamId"
            }
            profileModal={profileModalState}
            setProfileModal={setProfileModalState}
          />
        ) : (
          ""
        )}
        {/* EDIT USER MODAL */}
        {adminEditUserModalState === "isOpen" &&
        dataGetAllTeamsForUserQuery &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser ? (
          <AdminEditUserModal
            userInfo={dataMeQuery?.me}
            teamId={
              getQueryVariables(router).teamId !== noQParams.teamId
                ? getQueryVariables(router).teamId
                : dataGetAllTeamsForUserQuery.getAllTeamsForUser[0] &&
                  dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
                ? dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id
                : "blank teamId"
            }
            adminEditUserModal={adminEditUserModalState}
            setAdminEditUserModal={setAdminEditUserModalState}
          />
        ) : (
          ""
        )}
        {/* FOR TEAM INDEX */}
        {channelModalState === "isOpen" &&
        getQueryVariables(router).teamId === noQParams.teamId &&
        dataGetAllTeamsForUserQuery &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser[0] ? (
          <AddChannelModal
            teamId={dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id}
            channelModal={channelModalState}
            setChannelModal={setChannelModalState}
          />
        ) : (
          ""
        )}
        {channelModalState === "isOpen" &&
        getQueryVariables(router).teamId !== noQParams.teamId ? (
          <AddChannelModal
            teamId={getQueryVariables(router).teamId}
            channelModal={channelModalState}
            setChannelModal={setChannelModalState}
          />
        ) : (
          ""
        )}
        {directMessageModalState === "isOpen" &&
        getQueryVariables(router).teamId === noQParams.teamId &&
        dataGetAllTeamsForUserQuery &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser[0] ? (
          <AddDirectMessageModal
            teamId={dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id}
            dataGetAllTeamMembers={dataGetAllTeamMembersLazyQuery}
            directMessageModal={directMessageModalState}
            setDirectMessageModal={setDirectMessageModalState}
          />
        ) : (
          ""
        )}
        {directMessageModalState === "isOpen" &&
        getQueryVariables(router).teamId !== noQParams.teamId ? (
          <AddDirectMessageModal
            teamId={getQueryVariables(router).teamId}
            dataGetAllTeamMembers={dataGetAllTeamMembersLazyQuery}
            directMessageModal={directMessageModalState}
            setDirectMessageModal={setDirectMessageModalState}
          />
        ) : (
          ""
        )}

        {teamMemberModalState === "isOpen" &&
        getQueryVariables(router).teamId === noQParams.teamId &&
        dataGetAllTeamsForUserQuery &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser[0] ? (
          <AddTeamMemberModal
            teamId={dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id}
            // dataGetAllTeamMembers={dataGetAllTeamMembersLazyQuery}
            teamMemberModal={teamMemberModalState}
            setTeamMemberModalState={setTeamMemberModalState}
          />
        ) : (
          ""
        )}

        {teamMemberModalState === "isOpen" &&
        getQueryVariables(router).teamId !== noQParams.teamId ? (
          <AddTeamMemberModal
            teamId={getQueryVariables(router).teamId}
            // dataGetAllTeamMembers={dataGetAllTeamMembersLazyQuery}
            teamMemberModal={teamMemberModalState}
            setTeamMemberModalState={setTeamMemberModalState}
          />
        ) : (
          ""
        )}
        <HeaderWrapper>
          {/* SCENARIO 1 - CHANNEL ROUTE (WE HAVE CHANNEL ID AND TEAM ID FROM A ROUTE) */}
          {getQueryVariables(router).channelId !== noQParams.channelId &&
          getQueryVariables(router).teamId !== noQParams.teamId &&
          resultUseLoadChannelsByTeamIdQuery &&
          resultUseLoadChannelsByTeamIdQuery.data &&
          resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId ? (
            <Header
              data={
                resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId.filter(
                  channel => channel.id === getQueryVariables(router).channelId
                )[0].name
              }
            />
          ) : (
            ""
          )}
          {/* SCENARIO 2 - THREAD ROUTE (WE HAVE NO CHANNEL ID, BUT DO HAVE A TEAM ID FROM A ROUTE) */}
          {getQueryVariables(router).channelId === noQParams.channelId &&
          getQueryVariables(router).threadId !== noQParams.threadId &&
          getQueryVariables(router).teamId !== noQParams.teamId &&
          resultLoadDirectMessageThreadsByTeamAndUserLazyQuery &&
          resultLoadDirectMessageThreadsByTeamAndUserLazyQuery.data &&
          resultLoadDirectMessageThreadsByTeamAndUserLazyQuery.data
            .loadDirectMessageThreadsByTeamAndUser ? (
            <DirectMessageHeader
              selectedDirectMessageInvitees={
                resultLoadDirectMessageThreadsByTeamAndUserLazyQuery.data
                  .loadDirectMessageThreadsByTeamAndUser[0].invitees
              }
            />
          ) : (
            ""
          )}
          {/* SCENARIO 3 - TEAM ONLY ROUTE (WE HAVE NO CHANNEL ID, NOR THREAD ID, BUT DO HAVE A TEAM ID FROM A ROUTE) */}
          {getQueryVariables(router).channelId === noQParams.channelId &&
          getQueryVariables(router).threadId === noQParams.threadId &&
          getQueryVariables(router).teamId !== noQParams.teamId &&
          resultUseLoadChannelsByTeamIdQuery &&
          resultUseLoadChannelsByTeamIdQuery.data &&
          resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId ? (
            <Header
              data={
                resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0]
                  .name
              }
            />
          ) : (
            ""
          )}
          {/* SCENARIO 4 - NO ID'S WERE PROVIDED FROM ROUTES) */}
          {getQueryVariables(router).channelId === noQParams.channelId &&
          getQueryVariables(router).threadId === noQParams.threadId &&
          getQueryVariables(router).teamId === noQParams.teamId &&
          resultUseLoadChannelsByTeamIdQuery &&
          resultUseLoadChannelsByTeamIdQuery.data &&
          resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId &&
          resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0]
            .name ? (
            <>
              <Header
                data={
                  resultUseLoadChannelsByTeamIdQuery.data
                    .loadChannelsByTeamId[0].name
                }
              />
            </>
          ) : (
            ""
          )}
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
        </HeaderWrapper>
        {/* DIRECT MESSAGES QUERY */}
        {/* {dataMeQuery && threadId ? (
        <DirectMessages dataMe={dataMeQuery.me} threadId={threadId} />
      ) : (
        ""
      )} */}
        {/* DISPLAY MESSAGES */}
        {dataGetAllTeamsForUserQuery &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser.length === 0 &&
        getQueryVariables(router).teamId === noQParams.teamId ? (
          <EmptyMessagesWrapper>
            You must be invited to a Team to continue
          </EmptyMessagesWrapper>
        ) : (
          ""
        )}
        {/* {childrentWithMeDataAndMeSetter} */}
        {/* <InputContainer> */}
        {/* SCENARIO 1 */}
        {/* NEW FORM SCENARIO 1 - WE'RE ON A DM ROUTE */}

        {getQueryVariables(router).threadId !== noQParams.threadId &&
        getQueryVariables(router).teamId !== noQParams.teamId &&
        getQueryVariables(router).channelId === noQParams.channelId &&
        router.pathname.includes("messages") &&
        dataLoadDirectMessageThreadsByTeamAndUserLazyQuery &&
        dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser ? (
          <FormikDirectMessageForm
            initialValues={{ direct_message: "", files: [] }}
            threadId={getQueryVariables(router).threadId}
            teamId={getQueryVariables(router).teamId}
            invitees={
              dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser
                .filter(dm => dm.id === getQueryVariables(router).threadId)[0]
                .invitees.map(person => person.id)
                ? dataLoadDirectMessageThreadsByTeamAndUserLazyQuery.loadDirectMessageThreadsByTeamAndUser
                    .filter(
                      dm => dm.id === getQueryVariables(router).threadId
                    )[0]
                    .invitees.map(person => {
                      if (person.id) return person.id;
                      return "";
                    })
                : [""]
            }
          >
            {childrentWithMeDataAndMeSetter}
          </FormikDirectMessageForm>
        ) : (
          ""
        )}
        {/* NEW FORM SCENARIO 2 - WE HAVE TEAM ID & CHANNEL ID*/}
        {getQueryVariables(router).teamId !== noQParams.teamId &&
        getQueryVariables(router).channelId !== noQParams.channelId &&
        !router.pathname.includes("messages") ? (
          <FormikMessageForm
            channelId={getQueryVariables(router).channelId}
            teamId={getQueryVariables(router).teamId}
            initialValues={{
              channel_message: "",
              files: []
            }}
          >
            {childrentWithMeDataAndMeSetter}
          </FormikMessageForm>
        ) : (
          ""
        )}
        {/* FORM SCENARIO 3 - WE HAVE TEAM ID BUT NO CHANNEL ID*/}
        {/* THIS IS IT */}
        {getQueryVariables(router).teamId !== noQParams.teamId &&
        getQueryVariables(router).channelId === noQParams.channelId &&
        resultUseLoadChannelsByTeamIdQuery &&
        resultUseLoadChannelsByTeamIdQuery.data &&
        resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId &&
        resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0].id &&
        !router.pathname.includes("messages") ? (
          <FormikMessageForm
            channelId={
              resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0].id
            }
            teamId={getQueryVariables(router).teamId}
            initialValues={{
              channel_message: "",
              files: []
            }}
          >
            {childrentWithMeDataAndMeSetter}
          </FormikMessageForm>
        ) : (
          ""
        )}
        {/* FORM SCENARIO 4 - WE DO NOT HAVE TEAM ID NOR CHANNEL ID*/}
        {getQueryVariables(router).teamId === noQParams.teamId &&
        getQueryVariables(router).channelId === noQParams.channelId &&
        resultUseLoadChannelsByTeamIdQuery &&
        resultUseLoadChannelsByTeamIdQuery.data &&
        resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId &&
        resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0].id &&
        dataGetAllTeamsForUserQuery &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser &&
        dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id ? (
          <FormikMessageForm
            channelId={
              resultUseLoadChannelsByTeamIdQuery.data.loadChannelsByTeamId[0].id
            }
            teamId={dataGetAllTeamsForUserQuery.getAllTeamsForUser[0].id}
            initialValues={{
              channel_message: "",
              files: []
            }}
          >
            {childrentWithMeDataAndMeSetter}
          </FormikMessageForm>
        ) : (
          ""
        )}
        {/* </InputContainer> */}
      </GridPageContainer>
    );
  }
};

export const getLayout = (page: any) => {
  return (
    <Layout title={page.props.title}>
      <GridLayout title={page.props.title}>{page}</GridLayout>
    </Layout>
  );
};

export default GridLayout;
