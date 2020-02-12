import {
  Flex,
  StyledListItem,
  UnstyledList
} from "../primitives/styled-rebass";
import Icon from "../icon/m-icon";
import { useGetAllChannelMessagesQuery } from "../gql-gen/generated/apollo-graphql";
// import { FakeDirectMessageItemProps } from "../../pages/view-team";

interface MessageProps {
  channelId: string;
  // directMessages: FakeDirectMessageItemProps[];
}

const GetAllChannelMessages: React.FunctionComponent<MessageProps> = ({
  channelId
}) => {
  const {
    data: dataGetAllChannelMessages,
    error: errorGetAllChannelMessages,
    loading: loadingGetAllChannelMessages
  } = useGetAllChannelMessagesQuery({
    variables: { channelId }
  });
  if (errorGetAllChannelMessages)
    return <p>Error: {JSON.stringify(errorGetAllChannelMessages, null, 2)}</p>;
  if (loadingGetAllChannelMessages) return <p>Loading ...</p>;
  if (dataGetAllChannelMessages) {
    return (
      <ul>
        Channel Message DELETE
        {dataGetAllChannelMessages.getAllChannelMessages.map(value => (
          <li key={value.id}>{value.message}</li>
        ))}
      </ul>
    );
  }
  return <div>Error should be unreachable (GetAllChannelMessages)</div>;
};

// const DirectMessageListItem: React.FunctionComponent<FakeDirectMessageItemProps> = ({
//   id,
//   online_status,
//   username
// }) => (
//   <StyledListItem py={1} key={id}>
//     <Flex alignItems="center" px={2}>
//       <Flex mr={2}>
//         {online_status === "online" ? (
//           <Icon name="lens" size="0.9rem" fill="#38978D" />
//         ) : (
//           <Icon name="panorama_fish" size="0.9rem" fill="#38978D" />
//         )}
//       </Flex>
//       <Flex>{username}</Flex>
//     </Flex>
//   </StyledListItem>
// );

const DirectMessages: React.FunctionComponent<MessageProps> = ({
  channelId
}) => {
  return (
    <Flex flexDirection="column">
      <GetAllChannelMessages channelId={channelId} />
      {/* <UnstyledList p={0} mt={1} mb={3}>
        {directMessages.map(DirectMessageListItem)}
      </UnstyledList> */}
    </Flex>
  );
};

export default DirectMessages;
