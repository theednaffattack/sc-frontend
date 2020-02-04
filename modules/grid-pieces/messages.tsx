import { useRef, useEffect } from "react";
import { SubscribeToMoreOptions } from "apollo-boost";

import {
  Text,
  Flex,
  MessageWrapper,
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
import { EmptyMessagesWrapper } from "../team/empty-messages-wrapper";

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

// type NewMessageSubType = NewMessageSubSubscription["newMessageSub"];

interface MessageProps {
  channelId: string;
  messages?: ChannelMessageListItemProps[];
  selectedChannelIndex?: number;
  setSelectedChannelIndex?: React.Dispatch<React.SetStateAction<number>>;
  dataMe: MeQuery["me"];
}

interface MessageListProps {
  data: GetAllChannelMessagesQueryResult["data"];
  dataMe: MeQuery["me"];
  subscribeToMoreMessages: NewMessageSubType;
}

const MessageList: React.FunctionComponent<MessageListProps> = ({
  data,
  dataMe,
  subscribeToMoreMessages
}) => {
  useEffect(() => {
    if (subscribeToMoreMessages) {
      let unsubscribe = subscribeToMoreMessages({
        document: NewMessageSubDocument,
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
  }, []);

  if (data && dataMe) {
    return (
      <UnstyledList p={0}>
        {data.getAllChannelMessages.map(result => {
          let { id, message, sentBy } = result;
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
  return <li>no list</li>;
  // else {
  //   return (
  //     <>
  //       {[1, 2, 3, 4].map((result, index: number) => (
  //         <li key={result.toString()}>maaaaaaaaan {index.toString()}</li>
  //       ))}
  //     </>
  //   );
  // }
};

export const Messages: React.FunctionComponent<MessageProps> = ({
  channelId,
  dataMe
  // messages,

  // selectedChannelIndex,
  // setSelectedChannelIndex
}) => {
  const { data, subscribeToMore } = useGetAllChannelMessagesQuery({
    variables: { channelId }
  });
  // const [isLoading, setIsLoading] = useState(true);
  let listBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listBottomRef && listBottomRef.current) {
      listBottomRef.current.scrollTop = listBottomRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <>
      {data ? (
        <MessageWrapper ref={listBottomRef}>
          <MessageList
            dataMe={dataMe}
            subscribeToMoreMessages={subscribeToMore}
            data={data}
          />

          {/* <div ref={listBottomRef}></div> */}
        </MessageWrapper>
      ) : (
        <EmptyMessagesWrapper>
          Nothing to see (no channel selected) [{channelId}]
        </EmptyMessagesWrapper>
      )}
    </>
  );
};
