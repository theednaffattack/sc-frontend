import { useRef, useEffect } from "react";

import {
  MeQuery,
  useGetAllChannelMessagesQuery
} from "../gql-gen/generated/apollo-graphql";
import { ChannelMessageListItemProps } from "./channel-message-list-item";
import { EmptyMessagesWrapper } from "./empty-messages-wrapper";
import { FileModalState } from "modules/site-layout/grid-layout_v3";
import { MessageList } from "./messages-list";

interface MessageProps {
  teamId?: string;
  channelId: string;
  messages?: ChannelMessageListItemProps[];
  selectedChannelIndex?: number;
  setSelectedChannelIndex?: React.Dispatch<React.SetStateAction<number>>;
  dataMe: MeQuery["me"];

  fileViewerModalState: FileModalState;
  setFileViewerModalState: React.Dispatch<React.SetStateAction<FileModalState>>;
}

export const Messages: React.FunctionComponent<MessageProps> = ({
  channelId,
  dataMe,
  fileViewerModalState,
  setFileViewerModalState,
  teamId
}) => {
  const {
    data,
    error,
    loading,
    subscribeToMore
  } = useGetAllChannelMessagesQuery({
    variables: { channelId, teamId: teamId ?? "team_ID_is_undefined" }
  });
  let listBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listBottomRef && listBottomRef.current) {
      listBottomRef.current.scrollTop = listBottomRef.current.scrollHeight;
    }
  }, [data]);

  if (loading) {
    return (
      <EmptyMessagesWrapper>loading channel messages...</EmptyMessagesWrapper>
    );
  }

  if (data && teamId) {
    return (
      <div ref={listBottomRef}>
        <MessageList
          data={data}
          channelId={channelId}
          dataMe={dataMe}
          fileViewerModalState={fileViewerModalState}
          setFileViewerModalState={setFileViewerModalState}
          subscribeToMoreMessages={subscribeToMore}
          teamId={teamId}
        />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyMessagesWrapper>
        Error loading channel messages
        {JSON.stringify(error, null, 2)}
      </EmptyMessagesWrapper>
    );
  }

  return (
    <EmptyMessagesWrapper>loading channel messages...</EmptyMessagesWrapper>
  );
};
