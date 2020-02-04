import React from "react";
import {
  Flex,
  Text,
  ChannelMessageListItem as ChannelMessageListItemComp
} from "../primitives/styled-rebass";

import { AvatarPlaceholder } from "../profile/avatar-placeholder";
import {
  // User,
  GetAllChannelMessagesQuery
} from "../gql-gen/generated/apollo-graphql";

export type ChannelMessageListItemProps = {
  highlight: boolean;
  __typename?: "Message" | undefined;
  id: string;
  message: string;
  sentBy: GetAllChannelMessagesQuery["getAllChannelMessages"][0]["sentBy"];
  fromMe: "is_NOT_LoggedInUser" | "isLoggedInUser" | "unknown";
};

// interface TeamListItemProps {
//   fromMe: "isLoggedInUser" | "is_NOT_LoggedInUser" | "error_unknown";
//   dataMeId: string;
// }

export const ChannelMessageListItem: React.FunctionComponent<ChannelMessageListItemProps> = (
  { id, fromMe, message, sentBy },
  index: number
) => {
  return (
    // <ListItem
    //   key={`channelMessage-${id}-${index}`}
    //   mx={3}
    //   my={2}
    //   highlight={highlight}
    // >
    //   <Flex
    //     px={2}
    //     pb={2}
    //     pt={1}
    //     alignItems="center"
    //     // onClick={() => {
    //     //   console.log("TEAM CLICKED", { id, highlight, name, index });
    //     //   // setSelectedTeamIndex(index);
    //     //   // if (index !== selectedTeamIndex) {
    //     //   //   setChannelId("");
    //     //   //   setChannelInfo({
    //     //   //     channelId: "",
    //     //   //     channelIndex: -1,
    //     //   //     channelName: "",
    //     //   //     invitees: []
    //     //   //   });
    //     //   // }
    //     // }}
    //     justifyContent="center"
    //   >
    //     {/* <ChannelMessageListItemComp key={id}>
    //       {message}
    //     </ChannelMessageListItemComp> */}

    //   </Flex>
    // </ListItem>
    <ChannelMessageListItemComp
      p={3}
      // setBackgroundColor="rgba(218, 223, 225, 0.5)"
      key={`${id}-${index}`}
    >
      <Flex
        flexDirection="row"
        // border="2px pink dashed"
        alignItems="center"
        justifyContent="center"
      >
        {fromMe === "isLoggedInUser" ? (
          <Flex flexDirection="column" border="crimson" alignItems="center">
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
          <Flex flexDirection="column" border="crimson" alignItems="center">
            <AvatarPlaceholder size="2em" />
            <Text> {sentBy.name}</Text>
          </Flex>
        ) : (
          ""
        )}
      </Flex>
    </ChannelMessageListItemComp>
  );
};
