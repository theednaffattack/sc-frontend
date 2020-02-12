import { useRef, useEffect } from "react";
import { SubscribeToMoreOptions } from "apollo-boost";

import {
  Text,
  Flex,
  // @ts-ignore
  MessageWrapper,
  StyledListItem,
  UnstyledList
} from "../../primitives/styled-rebass";
import { AvatarPlaceholder } from "../../profile/avatar-placeholder";

import {
  // useGetAllChannelMessagesQuery,
  // GetAllChannelMessagesQueryResult,
  // GetAllChannelMessagesQuery,
  NewDirectMessageSubDocument,
  NewDirectMessageSubSubscription,
  MeQuery,
  useLoadDirectMessagesThreadByIdQuery,
  LoadDirectMessagesThreadByIdQuery,
  LoadDirectMessagesThreadByIdQueryResult,
  NewDirectMessageSubSubscriptionVariables
} from "../../gql-gen/generated/apollo-graphql";
import { ChannelMessageListItemProps } from "../channel-message-list-item";
// @ts-ignore
import { EmptyMessagesWrapper } from "../empty-messages-wrapper";

type NewMessageSubType = <
  TSubscriptionData = NewDirectMessageSubSubscription,
  TSubscriptionVariables = NewDirectMessageSubSubscriptionVariables
>(
  options: SubscribeToMoreOptions<
    LoadDirectMessagesThreadByIdQuery,
    TSubscriptionVariables,
    TSubscriptionData
  >
) => () => void;

// type NewMessageSubType = NewMessageSubSubscription["newMessageSub"];

interface DirectMessageProps {
  threadId: string;
  messages?: ChannelMessageListItemProps[];
  selectedChannelIndex?: number;
  setSelectedChannelIndex?: React.Dispatch<React.SetStateAction<number>>;
  dataMe: MeQuery["me"];
}

interface DirectMessageListProps {
  data: LoadDirectMessagesThreadByIdQueryResult["data"];
  dataMe: MeQuery["me"];
  subscribeToMoreMessages: NewMessageSubType;
}

// @ts-ignore
const DirectMessageList: React.FunctionComponent<DirectMessageListProps> = ({
  data,
  dataMe,
  subscribeToMoreMessages
}) => {
  useEffect(() => {
    if (subscribeToMoreMessages) {
      let unsubscribe = subscribeToMoreMessages({
        document: NewDirectMessageSubDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newFeedItem = subscriptionData.data.newDirectMessageSub;

          const newFeed = Object.assign({}, prev, {
            loadDirectMessagesThreadById: {
              id: newFeedItem.threadId,
              __typename: prev.loadDirectMessagesThreadById.__typename,
              invitees: prev.loadDirectMessagesThreadById.invitees,
              messages:
                prev.loadDirectMessagesThreadById &&
                prev.loadDirectMessagesThreadById.messages
                  ? prev.loadDirectMessagesThreadById.messages.concat({
                      id: newFeedItem.message.id,
                      __typename: newFeedItem.message.__typename,
                      message: newFeedItem.message.message,
                      sentBy: newFeedItem.sentBy
                    })
                  : prev.loadDirectMessagesThreadById.messages
            }
          });

          return newFeed;
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  if (data && dataMe) {
    return (
      <UnstyledList p={0}>
        {data &&
        data.loadDirectMessagesThreadById &&
        data.loadDirectMessagesThreadById.messages
          ? data.loadDirectMessagesThreadById.messages.map(result => {
              if (result) {
                let { id, message, sentBy } = result;
                let getUserId =
                  dataMe && dataMe.id ? dataMe.id : "unable to determine user";
                let fromMe =
                  sentBy.id === getUserId
                    ? "isLoggedInUser"
                    : "is_NOT_LoggedInUser";

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
              }
            })
          : ""}{" "}
      </UnstyledList>
    );
  }
  return <li>no list</li>;
};

export const DirectMessages: React.FunctionComponent<DirectMessageProps> = ({
  threadId,
  dataMe
}) => {
  const {
    data,
    error,
    loading,
    subscribeToMore
  } = useLoadDirectMessagesThreadByIdQuery({
    variables: { threadId }
  });

  useEffect(() => {
    if (listBottomRef && listBottomRef.current) {
      listBottomRef.current.scrollTop = listBottomRef.current.scrollHeight;
    }
  }, [data]);

  let listBottomRef = useRef<HTMLDivElement>(null);

  if (loading) return <>"Loading...";</>;
  if (error) return <>`Error! ${error.message}`;</>;
  return (
    <>
      {data ? (
        <MessageWrapper ref={listBottomRef}>
          <DirectMessageList
            dataMe={dataMe}
            subscribeToMoreMessages={subscribeToMore}
            data={data}
          />
        </MessageWrapper>
      ) : (
        <EmptyMessagesWrapper>
          Nothing to see (no DM selected) [{threadId}]
        </EmptyMessagesWrapper>
      )}
    </>
  );
};
