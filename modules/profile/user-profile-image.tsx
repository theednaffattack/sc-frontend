import React from "react";

import {
  Flex,
  Icon,
  FlexUserProfileWrap,
  Avatar,
} from "../primitives/styled-rebass";

export interface IUserProfileImage {
  user?: any;
  flexInstruction?: "row" | "column";
  isMe?: boolean;
}

function UserProfileImage({ user, flexInstruction, isMe }: IUserProfileImage) {
  // const isMeLeftMargin = isMe ? 0 : 3;
  const isMeRightMargin = isMe ? 3 : 1;

  return (
    <Flex
      // ml={isMeLeftMargin}
      mr={isMeRightMargin}
      flexDirection={flexInstruction ? flexInstruction : "row"}
      alignItems="center"
      style={{ minHeight: "40px" }}
      // width="200px"
    >
      <FlexUserProfileWrap
        height="90px"
        width="90px"
        overflow="hidden"
        // borderRadius="50%"
        // boxShadow="2px 2px 16px rgba(0, 0, 0, 0.25)"
        bg="thread_footer"
        alignItems="center"
        justifyContent="center"
      >
        {user && user.profileImgUrl ? (
          <Avatar src={user.profileImgUrl} width={90} height={90} />
        ) : (
          <Icon mt={4} size="100%" name="user" fill="white" />
        )}
      </FlexUserProfileWrap>
      {/* <Box>
        {user ? (
          <Text
            ml={flexInstruction === "row" ? 2 : 0}
            color={color ? color : "text"}
          >
            {user.name}
          </Text>
        ) : (
          ""
        )}
        {user && user.username ? <Text>{user.username}</Text> : ""}
      </Box> */}

      {/* {flexInstruction === "column" ? (
        ""
      ) : (
        <Button
          m={0}
          ml={2}
          type="button"
          bg="rgba(0,0,0,0.2)"
          style={{ overflow: "hidden", padding: 0 }}
          onClick={() => handleRemoveInviteeToThread({ user })}
        >
          <Icon name="close" size="1.5em" fill="#b2b2d8" />
        </Button>
      )} */}
    </Flex>
  );
}

export default UserProfileImage;
