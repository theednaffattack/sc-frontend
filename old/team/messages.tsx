import { SubscribeToMoreOptions } from "apollo-boost";
import { useEffect, useRef } from "react";
import styled from "styled-components";
// import { FakeMessageItemProps } from "../../pages/view-team";
import {
  GetAllChannelMessagesQuery,
  GetAllChannelMessagesQueryResult,

  // MeQueryResult,
  MeQuery,
  Message as MessageType,
  NewMessageSubDocument,

  // GetAllChannelMessagesQueryVariables,
  NewMessageSubSubscription,
  NewMessageSubSubscriptionVariables,
  useGetAllChannelMessagesQuery,
} from "../../modules/gql-gen/generated/apollo-graphql";
import {
  Flex,
  StyledListItem,
  Text,
  UnstyledList,
} from "../../modules/primitives/styled-rebass";
import { AvatarPlaceholder } from "../../modules/profile/avatar-placeholder";

export const MessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
  /* border: 2px pink solid; */
  overflow-y: auto;
`;

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
  // messages?: FakeMessageItemProps[];
  messages?: MessageType[];
  selectedChannelIndex?: number;
  setSelectedChannelIndex?: React.Dispatch<React.SetStateAction<number>>;
  dataMe: MeQuery["me"];
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface BasicUserData {
//   id: string;
//   name: string;
// }

// interface MessageReturnType {
//   id: string;
//   message: string;
//   sentBy: BasicUserData;
// }

// interface LeftTeamListItemProps extends MessageReturnType {
//   fromMe: "isLoggedInUser" | "is_NOT_LoggedInUser" | "error_unknown";
//   dataMeId: string;
// }

// const LeftTeamListItem: React.FunctionComponent<LeftTeamListItemProps> = ({
//   id,
//   dataMeId,
//   fromMe,
//   message,
//   sentBy
// }) => (
//   <StyledListItem p={3} setBackgroundColor="rgba(218, 223, 225, 0.5)" key={id}>
//     <Flex
//       flexDirection="row"
//       // border="2px pink dashed"
//       alignItems="center"
//       justifyContent="center"
//     >
//       {fromMe === "isLoggedInUser" ? (
//         <Flex flexDirection="column" border="crimson" alignItems="center">
//           <AvatarPlaceholder size="2em" />
//           <Text>{sentBy.name}</Text>
//         </Flex>
//       ) : (
//         ""
//       )}
//       <Flex
//         flexDirection="column"
//         border="lime"
//         width={[1, 1, 2 / 3, 2 / 3, 2 / 3]}
//       >
//         {message}
//       </Flex>
//       {fromMe === "is_NOT_LoggedInUser" ? (
//         <Flex flexDirection="column" border="crimson" alignItems="center">
//           <AvatarPlaceholder size="2em" />
//           <Text> {sentBy.name}</Text>
//         </Flex>
//       ) : (
//         ""
//       )}
//     </Flex>
//   </StyledListItem>
// );

// interface RenderChannelMessagesProps {
//   dataMe: MeQueryHookResult["data"];
//   dataGetAllChannelMessages: GetAllChannelMessagesQueryResult["data"];
// }

// const RenderChannelMessages: React.FunctionComponent<RenderChannelMessagesProps> = ({
//   dataMe,
//   dataGetAllChannelMessages
// }) => {
//   let newMap;

//   if (dataMe && dataMe.me && dataMe.me.id && dataGetAllChannelMessages) {
//     newMap = dataGetAllChannelMessages.getAllChannelMessages.map(message => {
//       if (dataMe && dataMe.me && dataMe.me.id) {
//         return {
//           ...message,
//           dataMeId: dataMe.me.id,
//           fromMe:
//             dataMe.me.id === message.sentBy.id
//               ? "isLoggedInUser"
//               : "is_NOT_LoggedInUser"
//         };
//       } else {
//         return { ...message, dataMeId: "", fromMe: "error_unknown" };
//       }
//     });
//   }

//   if (dataMe && dataMe.me && dataMe.me.id && newMap) {
//     // return newMap.map(LeftTeamListItem);
//     return newMap.map(({ fromMe, id, message, sentBy }) => (
//       <StyledListItem
//         p={3}
//         setBackgroundColor="rgba(218, 223, 225, 0.5)"
//         key={id}
//       >
//         <Flex
//           flexDirection="row"
//           // border="2px pink dashed"
//           alignItems="center"
//           justifyContent="center"
//         >
//           {fromMe === "isLoggedInUser" ? (
//             <Flex flexDirection="column" border="crimson" alignItems="center">
//               <AvatarPlaceholder size="2em" />
//               <Text>{sentBy.name}</Text>
//             </Flex>
//           ) : (
//             ""
//           )}
//           <Flex
//             flexDirection="column"
//             border="lime"
//             width={[1, 1, 2 / 3, 2 / 3, 2 / 3]}
//           >
//             {message}
//           </Flex>
//           {fromMe === "is_NOT_LoggedInUser" ? (
//             <Flex flexDirection="column" border="crimson" alignItems="center">
//               <AvatarPlaceholder size="2em" />
//               <Text> {sentBy.name}</Text>
//             </Flex>
//           ) : (
//             ""
//           )}
//         </Flex>
//       </StyledListItem>
//     ));
//   }
//   return ["1", "2", "3"].map(item => (
//     <li key={item}>yeaaaaah this shouldn't be happening</li>
//   ));
// };

// const GetAllChannelMessages: React.FunctionComponent<MessageProps> = ({
//   channelId,
//   dataMe
//   // setIsLoading
// }) => {
//   const {
//     data: dataGetAllChannelMessages,
//     error: errorGetAllChannelMessages,
//     loading: loadingGetAllChannelMessages
//     // subscribeToMore: subscribeToMoreGetAllChannelMessages
//   } = useGetAllChannelMessagesQuery({
//     variables: { channelId }
//   });
//   // setIsLoading(false);
//   if (errorGetAllChannelMessages)
//     return <p>Error: {JSON.stringify(errorGetAllChannelMessages, null, 2)}</p>;
//   if (loadingGetAllChannelMessages) return <p>Loading ...</p>;
//   if (dataGetAllChannelMessages) {
//     return (
//       <UnstyledList p={0}>
//         <RenderChannelMessages
//           dataMe={dataMe}
//           dataGetAllChannelMessages={dataGetAllChannelMessages}
//         />
//         {/* {dataGetAllChannelMessages.getAllChannelMessages.map(LeftTeamListItem)} */}
//       </UnstyledList>
//     );
//   }
//   return <div>Error should be unreachable (GetAllChannelMessages)</div>;
// };

interface MessageListProps {
  data: GetAllChannelMessagesQueryResult["data"];
  dataMe: MeQuery["me"];
  subscribeToMoreMessages: NewMessageSubType;
}

const MessageList: React.FunctionComponent<MessageListProps> = ({
  data,
  dataMe,
  subscribeToMoreMessages,
}) => {
  useEffect(() => {
    if (subscribeToMoreMessages) {
      let unsubscribe = subscribeToMoreMessages({
        document: NewMessageSubDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newFeedItem = subscriptionData.data.newMessageSub;

          const newFeed = Object.assign({}, prev, {
            getAllChannelMessages: [...prev.getAllChannelMessages, newFeedItem],
          });

          return newFeed;
        },
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  if (data && dataMe) {
    return (
      <UnstyledList p={0}>
        {data.getAllChannelMessages.map((result) => {
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
                  <Flex
                    flexDirection="column"
                    border="crimson"
                    alignItems="center"
                  >
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

const Message: React.FunctionComponent<MessageProps> = ({
  channelId,
  dataMe,
  // messages,

  // selectedChannelIndex,
  // setSelectedChannelIndex
}) => {
  const { data, subscribeToMore } = useGetAllChannelMessagesQuery({
    variables: { channelId, teamId: "" },
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
      <MessageWrapper ref={listBottomRef}>
        {data && dataMe ? (
          <MessageList
            dataMe={dataMe}
            subscribeToMoreMessages={subscribeToMore}
            data={data}
          />
        ) : (
          ""
        )}
        {/* <ul>{messages.map(TeamListItem)}</ul> */}
        {/* {channelId !== "" ? (
          <GetAllChannelMessages
            setIsLoading={setIsLoading}
            dataMe={dataMe}
            channelId={channelId}
          />
        ) : (
          ""
        )} */}
        <div ref={listBottomRef}></div>
      </MessageWrapper>
    </>
  );
};

export default Message;
