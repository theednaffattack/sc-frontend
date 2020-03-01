import { useRef, useEffect } from "react";
import { SubscribeToMoreOptions } from "apollo-boost";

import {
  Text,
  Flex,
  // MessageWrapper,
  StyledListItem,
  UnstyledList
} from "../primitives/styled-rebass";
import { AvatarPlaceholder } from "../profile/avatar-placeholder";
import {
  useGetAllChannelMessagesQuery,
  GetAllChannelMessagesQueryResult,
  NewMessageSubDocument,
  GetAllChannelMessagesQuery,
  NewMessageSubSubscription,
  NewMessageSubSubscriptionVariables,
  MeQuery
} from "../gql-gen/generated/apollo-graphql";
import { ChannelMessageListItemProps } from "./channel-message-list-item";
import { EmptyMessagesWrapper } from "./empty-messages-wrapper";

type NewMessageSubType = <
  TSubscriptionData = NewMessageSubSubscription,
  TSubscriptionVariables = NewMessageSubSubscriptionVariables
>(
  options: SubscribeToMoreOptions<
    GetAllChannelMessagesQuery,
    TSubscriptionVariables,
    TSubscriptionData
  >
) => () => void;

interface MessageProps {
  teamId?: string;
  channelId: string;
  messages?: ChannelMessageListItemProps[];
  selectedChannelIndex?: number;
  setSelectedChannelIndex?: React.Dispatch<React.SetStateAction<number>>;
  dataMe: MeQuery["me"];
}

interface MessageListProps {
  channelId: string;
  teamId: string;
  data: GetAllChannelMessagesQueryResult["data"];
  dataMe: MeQuery["me"];
  subscribeToMoreMessages: NewMessageSubType;
}

const MessageList: React.FunctionComponent<MessageListProps> = ({
  channelId,
  teamId,
  data,
  dataMe,
  subscribeToMoreMessages
}) => {
  useEffect(() => {
    if (subscribeToMoreMessages) {
      let newMessageArgs: NewMessageSubSubscriptionVariables = {
        data: {
          channelId,
          teamId,
          message: "",

          sentTo: ""
        }
      };
      let unsubscribe = subscribeToMoreMessages({
        document: NewMessageSubDocument,
        variables: newMessageArgs,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newFeedItem = subscriptionData.data.newMessageSub;

          const newFeed = Object.assign({}, prev, {
            getAllChannelMessages: [...prev.getAllChannelMessages, newFeedItem]
          });

          return newFeed;
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [data, channelId, teamId]);

  if (data && dataMe) {
    return (
      <UnstyledList p={0}>
        {data.getAllChannelMessages.map(result => {
          let { id, images, message, sentBy } = result;
          let getUserId =
            dataMe && dataMe.id ? dataMe.id : "unable to determine user";
          let fromMe =
            sentBy.id === getUserId ? "isLoggedInUser" : "is_NOT_LoggedInUser";

          return (
            <StyledListItem
              p={3}
              setBackgroundColor="rgba(218, 223, 225, 0.5)"
              key={id}
            >
              <Flex
                flexDirection="row"
                // border="2px pink dashed"
                alignItems="center"
                justifyContent="center"
              >
                {fromMe === "isLoggedInUser" ? (
                  <Flex flexDirection="column" alignItems="center">
                    <AvatarPlaceholder size="2em" />
                    <Text>{sentBy.name}</Text>
                  </Flex>
                ) : (
                  ""
                )}
                <Flex
                  flexDirection="column"
                  border="lime"
                  width={[1, 1, 2 / 3, 2 / 3, 2 / 3]}
                >
                  {images
                    ? images.map(image => {
                        if (image && image.uri) {
                          return image.uri;
                        }
                        return "no-image-uri";
                      })
                    : ""}
                  {message}
                </Flex>
                {fromMe === "is_NOT_LoggedInUser" ? (
                  <Flex
                    flexDirection="column"
                    border="crimson"
                    alignItems="center"
                  >
                    <AvatarPlaceholder size="2em" />
                    <Text> {sentBy.name}</Text>
                  </Flex>
                ) : (
                  ""
                )}
              </Flex>
            </StyledListItem>
          );
        })}{" "}
      </UnstyledList>
    );
  }
  return (
    <UnstyledList p={0}>
      <li>no list</li>
    </UnstyledList>
  );
};

export const Messages: React.FunctionComponent<MessageProps> = ({
  channelId,
  dataMe,
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
          dataMe={dataMe}
          subscribeToMoreMessages={subscribeToMore}
          data={data}
          channelId={channelId}
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
