import React, { useState } from "react";
import { Field, Formik } from "formik";

import {
  GetAllTeamsForUserComponent,
  User,
  useMeQuery,
  useAddMessageToChannelMutation,
} from "../gql-gen/generated/apollo-graphql";
import { getLayout } from "../site-layout/grid-layout";
import GridLayout from "../../old/team/grid-page-container";
// import Channels from "../../../../modules/team/channels";
// import Teams from "../../../../modules/team/teams";
import Header from "../../old/team/header";
import Messages from "../../old/team/messages";
import { Sidebar } from "../../old/team/sidebar";
import InputContainer from "../../old/team/input-container";
// import SendMessage from "../../../../modules/team/input";
import { Input, StyledForm } from "../primitives/forms";
import { NextContext } from "../../typings/NextContext";
import { isBrowser } from "../../lib/isBrowser";
import redirect from "../../lib/redirect";
import { EmptyMessagesWrapper } from "../../old/team/empty-messages-wrapper";
import { Label } from "../primitives/styled-rebass";

const FakeChannelName = "fake channel name";

interface ChannelModalStatesType {
  OPEN: string;
  CLOSED: string;
  IS_OPENING: string;
  IS_CLOSING: string;
}

interface PageProps extends NextContext {
  channelId: string;
  teamId: string;
}

interface GridProps {
  channelId: string;
  query: NextContext["query"];
  teamId: string;
}

interface ViewTeamProps {
  ({
    pathname,
    query,
    referer,
    userAgent,
    channelId,
    teamId,
  }: PageProps): JSX.Element;

  getInitialProps: ({
    pathname,
    query,
    referer,
    userAgent,
  }: NextContext) => Promise<{
    pathname: NextContext["pathname"];
    query: NextContext["query"];
    referer: NextContext["referer"];
    userAgent: NextContext["userAgent"];
    channelId: string;
    teamId: string;
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

export interface ChannelInfoProps {
  channelIndex: number;
  channelId: string;
  channelName: string;
  invitees: User[];
}

export type ChannelInfoStateUpdate = React.Dispatch<
  React.SetStateAction<ChannelInfoProps>
>;

export type TeamIdStateUpdate = React.Dispatch<React.SetStateAction<string>>;

const Grid: React.FunctionComponent<GridProps> = ({
  channelId: channelIdProp,
  query,
  teamId: teamIdProp,
}) => {
  let initialSelectedTeamIndexState = -1;
  let initialChannelInfoState: ChannelInfoProps = {
    channelIndex: query.channelId ? -3 : -1,
    channelId: channelIdProp,
    channelName: "",
    invitees: [],
  };

  let initialChannelState = -1;

  let initialTeamIdState = teamIdProp;

  let channelModalStates: ChannelModalStatesType = {
    OPEN: "isOpen",
    CLOSED: "isClosed",
    IS_OPENING: "isOpening",
    IS_CLOSING: "isClosing",
  };

  let initialChannelModalState = channelModalStates.CLOSED;

  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number>(
    initialSelectedTeamIndexState
  );

  const [selectedChannelIndex, setSelectedChannelIndex] = useState<number>(
    initialChannelState
  );

  const [teamId, setTeamId] = useState(initialTeamIdState);

  const [channelId, setChannelId] = useState(initialChannelInfoState.channelId); // GET RID OF THIS???
  const [channelInfo, setChannelInfo] = useState(initialChannelInfoState);
  const [channelModal, setChannelModal] = useState<string>(
    initialChannelModalState
  );

  const { data: dataMe } = useMeQuery();
  const [
    addMessageMutation,

    // {
    //   data: dataAddMessageToChannel,
    //   error: errorAddMessageToChannel,
    //   loading: loadingAddMessageToChannel
    // }
  ] = useAddMessageToChannelMutation();
  return (
    <GetAllTeamsForUserComponent>
      {(getAllTeamsForUser) => {
        return (
          <GridLayout>
            <Sidebar
              getAllTeamsForUser={getAllTeamsForUser}
              selectedTeamIndex={selectedTeamIndex}
              setSelectedTeamIndex={setSelectedTeamIndex}
              setChannelId={setChannelId}
              setChannelInfo={setChannelInfo}
              channelInfo={channelInfo}
              channelModal={channelModal}
              setChannelModal={setChannelModal}
              teamId={teamId}
              setTeamId={setTeamId}
            />
            <Header
              channelId={channelId}
              channelName={
                channelInfo && channelInfo.channelName
                  ? channelInfo.channelName
                  : FakeChannelName
              }
            />

            {channelId && dataMe ? (
              <Messages
                dataMe={dataMe.me}
                // messages={FakeMessages}
                // setIsLoading={setIsLoading}
                channelId={channelId}
                selectedChannelIndex={selectedChannelIndex}
                setSelectedChannelIndex={setSelectedChannelIndex}
              />
            ) : (
              <EmptyMessagesWrapper>
                Nothing to see (no channel selected) [{channelId}]
              </EmptyMessagesWrapper>
            )}
            <InputContainer>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{ channel_message: "" }}
                onSubmit={({ channel_message }, { resetForm }) => {
                  let getInvitees =
                    channelInfo &&
                    channelInfo.invitees &&
                    channelInfo.invitees.length > 0
                      ? channelInfo.invitees.map(
                          (invitee) => (invitee && invitee.id ? invitee.id : "")
                          // invitee => invitee.id
                        )
                      : [""];
                  addMessageMutation({
                    variables: {
                      data: {
                        channelId,
                        invitees: getInvitees,
                        message: channel_message,
                        sentTo: "",
                        teamId,
                      },
                    },
                  });
                  resetForm({ values: { channel_message: "" } });
                }}
              >
                {({ handleReset, handleSubmit }) => {
                  return (
                    // <form onSubmit={handleSubmit}>
                    <StyledForm
                      flexDirection="row"
                      onSubmit={handleSubmit}
                      onReset={handleReset}
                    >
                      <Field
                        disabled={channelInfo.channelId ? false : true}
                        label="channel message"
                        id="channel_message"
                        name="channel_message"
                        placeholder="Message: #"
                        type="text"
                        component={Input}
                      />
                      <Label bg="hotpink" htmlFor="file">
                        Upload
                      </Label>
                      <Field
                        disabled={channelInfo.channelId ? false : true}
                        label="channel message"
                        id="file"
                        name="file"
                        type="file"
                        component={Input}
                      />
                      {/* <input type="file" /> */}
                    </StyledForm>
                    // </form>
                  );
                }}
              </Formik>
              {/* <SendMessage
                placeholder="Message: #"
                channelName={FakeChannelName}
              /> */}
            </InputContainer>
          </GridLayout>
        );
      }}
    </GetAllTeamsForUserComponent>
  );
};

const ViewTeam: ViewTeamProps = ({ channelId, teamId, query }) => {
  return <Grid channelId={channelId} teamId={teamId} query={query} />;
};

ViewTeam.getInitialProps = async (ctx) => {
  let { pathname, query, referer, userAgent } = ctx;

  const { channelId: channelIdBase, teamId: teamIdBase } = query;

  const channelId =
    typeof channelIdBase === "string" ? channelIdBase : channelIdBase[0];
  const teamId = typeof teamIdBase === "string" ? teamIdBase : teamIdBase[0];

  if (!ctx.token && !isBrowser) {
    console.log("SSR redirect");
    redirect(ctx, "/login", {
      asPath: "/login",
    });
  }

  return {
    pathname,
    query,
    referer,
    userAgent,
    channelId,
    teamId,
  };
};

ViewTeam.getLayout = getLayout;
ViewTeam.title = "View Team";

export default ViewTeam;
