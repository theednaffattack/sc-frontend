import { FlexProps, CardProps, ButtonProps } from "rebass";
import {
  BordersProps,
  BoxShadowProps,
  BorderRadiusProps,
  HeightProps,
  MaxWidthProps,
  MinHeightProps,
  SpaceProps,
  ColorProps,
  WidthProps,
  LetterSpacingProps,
  FontWeightProps,
  FontSizeProps,
  FontFamilyProps,
  MinWidthProps,
  MaxHeightProps,
  BottomProps,
  PositionProps,
  TopProps,
  RightProps,
  LeftProps,
  OverflowProps,
  FlexboxProps
} from "styled-system";
import {
  DetailedHTMLProps,
  LiHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes
} from "react";

// export interface IIconProps {
//   fill: string;
//   size: string;
//   width: string | number;
// }

export type TFlexProps = MinHeightProps & BordersProps & FlexProps;

export interface IIconProps {
  fill: string;
  name: string;
  size?: string;
  width?: string;
}

export interface IProfileIconProps extends IIconProps, SpaceProps {}

export interface IAbFlexProps
  extends MinHeightProps,
    BordersProps,
    FlexProps,
    PositionProps,
    BottomProps,
    TopProps,
    RightProps,
    LeftProps,
    OverflowProps {}

export interface IFlexShadowProps extends FlexProps, BoxShadowProps {}

export interface IFlexUserProfileWrapProps
  extends FlexProps,
    BordersProps,
    BorderRadiusProps,
    BoxShadowProps,
    OverflowProps,
    MaxHeightProps,
    MaxWidthProps {}

// bg="thread_footer"
// alignItems="center"
// justifyContent="center"
// boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"

export interface IPosedRouterProps
  extends FlexboxProps,
    SpaceProps,
    WidthProps {
  children: any;
  location?: any;
  style?: any;
}

export type TMaxFlexProps = BordersProps &
  FlexProps &
  MaxWidthProps &
  MinHeightProps &
  MinWidthProps &
  MaxHeightProps;

export type TLogoFlexProps = BoxShadowProps &
  BorderRadiusProps &
  FlexProps &
  HeightProps;

export type TStyleLiProps = HTMLLIElement & SpaceProps;

export type TStyledUl = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

export type TStyledLi = DetailedHTMLProps<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> &
  SpaceProps &
  ColorProps;

export interface ITrySvgProps {
  fill: string;
}

export type TInputBProps = ColorProps &
  BordersProps &
  SpaceProps &
  WidthProps &
  HeightProps &
  BorderRadiusProps &
  FontFamilyProps &
  FontSizeProps &
  FontWeightProps &
  LetterSpacingProps;

export interface IInputBProps
  extends React.DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export interface IInputFieldProps {
  label: string;
}

export interface IIconEmailProps extends SpaceProps, WidthProps {
  fill: string;
}

export interface IRegisterFormBodyProps {
  handleSubmit: any;
}

export interface ICardProps
  extends CardProps,
    MaxWidthProps,
    FontSizeProps,
    FontWeightProps,
    WidthProps,
    SpaceProps,
    BorderRadiusProps,
    BoxShadowProps {}

// fontSize={6}
// fontWeight="bold"
// width={[1, 1, 1 / 2]}
// p={5}
// my={5}
// bg="#f6f6ff"
// borderRadius={8}
// boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
export interface IImagePreviewSingleProps {
  imageFile: any;
}

export interface IUnFollowButtonProps extends ButtonProps {
  me: string;
  oldData: any;
  followingId: string;
}

export interface IChatBodyProps {
  data: any;
  chatEmoji: string;
  chatInput: string;
  dataMessageThreads: any;
  disabled: boolean;
  emojiPickerVisible: boolean;
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  handleSelectEmojiClick: any;
  handleChatFieldChange: any;
  handleUploadFileClick: any;
  handleThreadSelection: any;
  handleThreadAddThreadClick: any;
  handleChatMenuClick: any;
  handleAddInviteeToThread: any;
  handleRemoveInviteeToThread: any;
  loadingMessageThreads: any;
  me: any;
  newThreadInvitees: any;
  newThreadDisabled: boolean;
  selectedThreadId: any;
  selectedThreadIndex: number | null;
  showMessagingAddressBook: any;
  messagesEndRef: any;
  handleCancelNewMessageThread: any;
}

export interface IMinButtonProps extends MinHeightProps, ButtonProps {}

export interface IUserProfileImageCards {
  user: any;
  flexInstruction: "row" | "column";
  color: string;
  handleRemoveInviteeToThread: any;
  buttonThing: boolean;
}

export interface IChatFormProps {
  chatEmoji: string;
  disabled: boolean;
  files: any[];
  handleChatFieldChange: any;
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick?: any;
  handleUploadFileClick: any;
  handleThreadSelection?: any;
  newThreadInvitees: any[];
  selectedThreadId: string;
  sentTo: string;
  threadId: string;
  signS3Mutation: any;

  handleSetLastMessenger: any;
  handleSetLastMessage: any;
}

export interface IChatFormState {
  files: any[];
}

export interface IChatFormProps {
  files: any[];
  selectedThreadId: string;
  newThreadDisabled: boolean;
}

export interface IAddressBookMutationProps {
  // dataMessageThreads: any;
  // selectedThreadIndex: number | null;
  handleAddInviteeToThread: any;
  handleRemoveInviteeToThread: any;
  handleLocalCancelNewThread: any;
  newThreadInvitees: any[];
  handleCancelNewMessageThread: any;
  handleStartNewThread: any;
}
