import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as React from "react";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHoc from "@apollo/react-hoc";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddChannelInput = {
  teamId: Scalars["ID"];
  name: Scalars["String"];
};

export type AddDirectMessagePayload = {
  __typename?: "AddDirectMessagePayload";
  success: Scalars["Boolean"];
  threadId: Scalars["ID"];
  message: Message;
  sentBy: User;
  invitees: Array<User>;
};

export type AddDirectMessageToThreadInput = {
  threadId: Scalars["ID"];
  teamId: Scalars["ID"];
  message_text: Scalars["String"];
  invitees: Array<Scalars["String"]>;
};

export type AddMessagePayload = {
  __typename?: "AddMessagePayload";
  success: Scalars["Boolean"];
  channelId: Scalars["ID"];
  message: Message;
  user: User;
  invitees?: Maybe<Array<Maybe<User>>>;
};

export type AddMessageToChannelInput = {
  channelId: Scalars["ID"];
  teamId: Scalars["ID"];
  created_at?: Maybe<Scalars["DateTime"]>;
  sentTo: Scalars["String"];
  invitees?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
  files?: Maybe<Array<Maybe<FileInputHelper>>>;
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token?: Maybe<Scalars["String"]>;
};

export type Channel = {
  __typename?: "Channel";
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  messages?: Maybe<Array<Maybe<Message>>>;
  last_message?: Maybe<Scalars["String"]>;
  message_count: Scalars["Int"];
  /** Determines whether this channel is viewable to the public. (default = false) */
  public?: Maybe<Scalars["Boolean"]>;
  team: Array<Team>;
  invitees?: Maybe<Array<Maybe<User>>>;
  created_by: User;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

export type CreateDirectMessageInput = {
  teamId: Scalars["ID"];
  message_text: Scalars["String"];
  invitees: Array<Scalars["String"]>;
};

export type EditUserInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  teamRoles: Array<TeamRoleEnum>;
  teamId: Scalars["ID"];
};

export type FileEntity = {
  __typename?: "FileEntity";
  id: Scalars["ID"];
  uri: Scalars["String"];
  file_type: FileTypeEnum;
  message?: Maybe<Message>;
  upload_user: User;
};

export type FileInput = {
  id: Scalars["ID"];
  uri: Scalars["String"];
};

export type FileInputHelper = {
  uri: Scalars["String"];
  file_type: FileTypeEnum;
};

/** css | csv | image-all | pdf | svg | other */
export enum FileTypeEnum {
  Css = "CSS",
  Csv = "CSV",
  Image = "IMAGE",
  Pdf = "PDF",
  Svg = "SVG",
  Md = "MD",
  Doc = "DOC",
  Other = "OTHER"
}

export type GetAllMyMessagesInput = {
  user: Scalars["String"];
};

export type GetFileObjectInput = {
  id: Scalars["ID"];
  uri: Scalars["String"];
};

export type GetMessagesFromUserInput = {
  sentBy: Scalars["String"];
  user: Scalars["String"];
};

export type Image = {
  __typename?: "Image";
  id: Scalars["ID"];
  uri: Scalars["String"];
  message?: Maybe<Message>;
  user: User;
};

export type ImageSubInput = {
  type: Scalars["String"];
  lastModified: Scalars["Float"];
  lastModifiedDate: Scalars["DateTime"];
  size: Scalars["Int"];
  name: Scalars["String"];
  webkitRelativePath: Scalars["String"];
  path: Scalars["String"];
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Image>>>;
  files?: Maybe<Array<Maybe<FileEntity>>>;
  sentBy: User;
  user: User;
  channel?: Maybe<Channel>;
  thread?: Maybe<Thread>;
};

export type MessageOutput = {
  __typename?: "MessageOutput";
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createProduct: Product;
  createUser: User;
  addTeamMember: UserToTeamIdReferencesOnlyClass;
  createTeam: Team;
  teamLogin?: Maybe<User>;
  changePasswordFromContextUserid?: Maybe<User>;
  changePasswordFromToken?: Maybe<User>;
  confirmUser: Scalars["Boolean"];
  forgotPassword: Scalars["Boolean"];
  login?: Maybe<User>;
  logout: Scalars["Boolean"];
  register: User;
  addProfilePicture: UploadProfilePictueReturnType;
  editUserInfo: User;
  adminEditUserInfo: UserClassTypeWithReferenceIds;
  signS3: SignedS3Payload;
  signS3GetObject: SignedS3Payload;
  addMessageToChannel: AddMessagePayload;
  addChannelMember: Scalars["Boolean"];
  removeChannelMember: Scalars["Boolean"];
  createChannel: Channel;
  updateChannelName: Scalars["Boolean"];
  deleteChannel: Scalars["Boolean"];
  addDirectMessageToThread: AddDirectMessagePayload;
  createDirectMessage: AddDirectMessagePayload;
};

export type MutationCreateProductArgs = {
  data: ProductInput;
};

export type MutationCreateUserArgs = {
  data: RegisterInput;
};

export type MutationAddTeamMemberArgs = {
  roles: Array<TeamRoleEnum>;
  teamId: Scalars["String"];
  email: Scalars["String"];
};

export type MutationCreateTeamArgs = {
  name: Scalars["String"];
};

export type MutationTeamLoginArgs = {
  email: Scalars["Int"];
  password: Scalars["Int"];
  teamId: Scalars["String"];
};

export type MutationChangePasswordFromContextUseridArgs = {
  data: PasswordInput;
};

export type MutationChangePasswordFromTokenArgs = {
  data: ChangePasswordInput;
};

export type MutationConfirmUserArgs = {
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationAddProfilePictureArgs = {
  data: UploadProfilePictureInput;
};

export type MutationEditUserInfoArgs = {
  data: EditUserInput;
};

export type MutationAdminEditUserInfoArgs = {
  data: EditUserInput;
};

export type MutationSignS3Args = {
  files: Array<ImageSubInput>;
  action: S3SignatureAction;
};

export type MutationSignS3GetObjectArgs = {
  files: Array<FileInput>;
  action?: Maybe<S3SignatureAction>;
};

export type MutationAddMessageToChannelArgs = {
  data: AddMessageToChannelInput;
};

export type MutationAddChannelMemberArgs = {
  channelId: Scalars["String"];
  userId: Scalars["ID"];
};

export type MutationRemoveChannelMemberArgs = {
  channelId: Scalars["String"];
  userId: Scalars["ID"];
};

export type MutationCreateChannelArgs = {
  input: AddChannelInput;
};

export type MutationUpdateChannelNameArgs = {
  channelId: Scalars["String"];
  name: Scalars["String"];
};

export type MutationDeleteChannelArgs = {
  channelId: Scalars["String"];
  channelName: Scalars["String"];
};

export type MutationAddDirectMessageToThreadArgs = {
  input: AddDirectMessageToThreadInput;
};

export type MutationCreateDirectMessageArgs = {
  input: CreateDirectMessageInput;
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ProductInput = {
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  batchTeams: Array<Team>;
  getAllTeamMembers: Array<UserToTeam>;
  getAllTeamsForUser: Array<Team>;
  teamMembers?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  helloWorld: Scalars["String"];
  getAllMyMessages?: Maybe<User>;
  getListToCreateThread: Array<Maybe<User>>;
  getMyMessagesFromUser?: Maybe<Array<Message>>;
  getChannelName: Scalars["String"];
  getAllChannelMembers: Array<User>;
  getAllChannelMessages: Array<Message>;
  loadChannelsByTeamId: Array<Channel>;
  channelMembers?: Maybe<Array<Maybe<User>>>;
  loadDirectMessagesThreadById: Thread;
  loadDirectMessageThreadsByTeamAndUser: Array<Thread>;
};

export type QueryGetAllTeamMembersArgs = {
  teamId: Scalars["String"];
};

export type QueryTeamMembersArgs = {
  teamIds: Array<Scalars["ID"]>;
};

export type QueryGetListToCreateThreadArgs = {
  teamId: Scalars["String"];
};

export type QueryGetMyMessagesFromUserArgs = {
  input: GetMessagesFromUserInput;
};

export type QueryGetChannelNameArgs = {
  channelId: Scalars["String"];
};

export type QueryGetAllChannelMembersArgs = {
  channelId: Scalars["String"];
};

export type QueryGetAllChannelMessagesArgs = {
  teamId?: Maybe<Scalars["String"]>;
  channelId?: Maybe<Scalars["String"]>;
};

export type QueryLoadChannelsByTeamIdArgs = {
  teamId: Scalars["String"];
};

export type QueryChannelMembersArgs = {
  channelIds: Array<Scalars["ID"]>;
};

export type QueryLoadDirectMessagesThreadByIdArgs = {
  teamId: Scalars["String"];
  threadId: Scalars["String"];
};

export type QueryLoadDirectMessageThreadsByTeamAndUserArgs = {
  teamId: Scalars["String"];
};

export type RegisterInput = {
  password: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
};

export type Role = {
  __typename?: "Role";
  id?: Maybe<Scalars["ID"]>;
  teamRoleAuthorizations: Array<TeamRoleEnum>;
};

/** The actions associated with obtaining a signed URL from S3 (get | put | delete) */
export enum S3SignatureAction {
  PutObject = "putObject",
  GetObject = "getObject"
}

export type SignedS3Payload = {
  __typename?: "SignedS3Payload";
  signatures: Array<SignedS3SubPayload>;
};

export type SignedS3SubPayload = {
  __typename?: "SignedS3SubPayload";
  uri: Scalars["String"];
  signedRequest: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  newMessageSub: Message;
  newDirectMessageSub: AddDirectMessagePayload;
};

export type SubscriptionNewMessageSubArgs = {
  data: AddMessageToChannelInput;
};

export type Team = {
  __typename?: "Team";
  id: Scalars["ID"];
  name: Scalars["String"];
  owner: User;
  channels: Array<Maybe<Channel>>;
  threads: Array<Maybe<Thread>>;
  members: Array<Maybe<User>>;
  userToTeams: Array<Maybe<UserToTeam>>;
};

/** admin | owner | member | public guest */
export enum TeamRoleEnum {
  Admin = "ADMIN",
  Owner = "OWNER",
  Member = "MEMBER",
  PublicGuest = "PUBLIC_GUEST"
}

export type Thread = {
  __typename?: "Thread";
  id?: Maybe<Scalars["ID"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  last_message?: Maybe<Scalars["String"]>;
  message_count: Scalars["Int"];
  user: User;
  team?: Maybe<Team>;
  invitees: Array<User>;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

export type UploadProfilePictueReturnType = {
  __typename?: "UploadProfilePictueReturnType";
  message: Scalars["String"];
  profileImgUrl: Scalars["String"];
};

export type UploadProfilePictureInput = {
  user: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id?: Maybe<Scalars["ID"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  channels_created?: Maybe<Channel>;
  images?: Maybe<Array<Maybe<Image>>>;
  files?: Maybe<Array<Maybe<FileEntity>>>;
  mappedMessages?: Maybe<Array<Maybe<Message>>>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  threads?: Maybe<Array<Thread>>;
  thread_invitations?: Maybe<Array<Maybe<Thread>>>;
  channel_memberships?: Maybe<Array<Maybe<Channel>>>;
  profileImageUri?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  team_ownership: Scalars["String"];
  messages?: Maybe<Array<Message>>;
  sent_messages?: Maybe<Array<Message>>;
  userToTeams?: Maybe<Array<UserToTeam>>;
};

export type UserClassTypeWithReferenceIds = {
  __typename?: "UserClassTypeWithReferenceIds";
  id?: Maybe<Scalars["ID"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  channels_created?: Maybe<Channel>;
  images?: Maybe<Array<Maybe<Image>>>;
  files?: Maybe<Array<Maybe<FileEntity>>>;
  mappedMessages?: Maybe<Array<Maybe<Message>>>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  threads?: Maybe<Array<Thread>>;
  thread_invitations?: Maybe<Array<Maybe<Thread>>>;
  channel_memberships?: Maybe<Array<Maybe<Channel>>>;
  profileImageUri?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  team_ownership: Scalars["String"];
  messages?: Maybe<Array<Message>>;
  sent_messages?: Maybe<Array<Message>>;
  userToTeams?: Maybe<Array<UserToTeamIdReferencesOnlyClass>>;
};

export type UserTeam = {
  __typename?: "UserTeam";
  userId: Scalars["ID"];
  teamId: Scalars["ID"];
  name: Scalars["String"];
};

export type UserToTeam = {
  __typename?: "UserToTeam";
  userToTeamId: Scalars["ID"];
  userId: Scalars["ID"];
  teamId: Scalars["ID"];
  teamRoleAuthorizations: Array<TeamRoleEnum>;
  user: User;
  team: Team;
};

export type UserToTeamIdReferencesOnlyClass = {
  __typename?: "UserToTeamIdReferencesOnlyClass";
  userToTeamId: Scalars["ID"];
  userId: Scalars["ID"];
  teamId: Scalars["ID"];
  teamRoleAuthorizations: Array<TeamRoleEnum>;
};

export type AddChannelMemberMutationVariables = {
  channelId: Scalars["String"];
  userId: Scalars["ID"];
};

export type AddChannelMemberMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "addChannelMember"
>;

export type AddMessageToChannelMutationVariables = {
  data: AddMessageToChannelInput;
};

export type AddMessageToChannelMutation = { __typename?: "Mutation" } & {
  addMessageToChannel: { __typename?: "AddMessagePayload" } & Pick<
    AddMessagePayload,
    "success"
  >;
};

export type CreateChannelMutationVariables = {
  input: AddChannelInput;
};

export type CreateChannelMutation = { __typename?: "Mutation" } & {
  createChannel: { __typename?: "Channel" } & Pick<
    Channel,
    "id" | "name" | "last_message"
  > & {
      invitees: Maybe<
        Array<Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>>
      >;
    };
};

export type DeleteChannelMutationVariables = {
  channelId: Scalars["String"];
  channelName: Scalars["String"];
};

export type DeleteChannelMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteChannel"
>;

export type GetAllChannelMessagesQueryVariables = {
  channelId: Scalars["String"];
  teamId: Scalars["String"];
};

export type GetAllChannelMessagesQuery = { __typename?: "Query" } & {
  getAllChannelMessages: Array<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "message" | "created_at"
    > & {
        files: Maybe<
          Array<
            Maybe<
              { __typename?: "FileEntity" } & Pick<
                FileEntity,
                "id" | "uri" | "file_type"
              >
            >
          >
        >;
        sentBy: { __typename?: "User" } & Pick<User, "id" | "name">;
      }
  >;
};

export type RemoveChannelMemberMutationVariables = {
  channelId: Scalars["String"];
  userId: Scalars["ID"];
};

export type RemoveChannelMemberMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "removeChannelMember"
>;

export type GetAllChannelMembersQueryVariables = {
  channelId: Scalars["String"];
};

export type GetAllChannelMembersQuery = { __typename?: "Query" } & {
  getAllChannelMembers: Array<
    { __typename?: "User" } & Pick<User, "id" | "name">
  >;
};

export type GetChannelNameQueryVariables = {
  channelId: Scalars["String"];
};

export type GetChannelNameQuery = { __typename?: "Query" } & Pick<
  Query,
  "getChannelName"
>;

export type LoadChannelsByTeamIdQueryVariables = {
  teamId: Scalars["String"];
};

export type LoadChannelsByTeamIdQuery = { __typename?: "Query" } & {
  loadChannelsByTeamId: Array<
    { __typename?: "Channel" } & Pick<Channel, "id" | "name"> & {
        invitees: Maybe<
          Array<Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>>
        >;
      }
  >;
};

export type NewMessageSubSubscriptionVariables = {
  data: AddMessageToChannelInput;
};

export type NewMessageSubSubscription = { __typename?: "Subscription" } & {
  newMessageSub: { __typename?: "Message" } & Pick<
    Message,
    "id" | "created_at" | "message"
  > & {
      files: Maybe<
        Array<
          Maybe<
            { __typename?: "FileEntity" } & Pick<
              FileEntity,
              "id" | "uri" | "file_type"
            >
          >
        >
      >;
      sentBy: { __typename?: "User" } & Pick<User, "id" | "name">;
      user: { __typename?: "User" } & Pick<User, "id" | "name">;
    };
};

export type SignS3MutationVariables = {
  files: Array<ImageSubInput>;
  action: S3SignatureAction;
};

export type SignS3Mutation = { __typename?: "Mutation" } & {
  signS3: { __typename?: "SignedS3Payload" } & {
    signatures: Array<
      { __typename?: "SignedS3SubPayload" } & Pick<
        SignedS3SubPayload,
        "uri" | "signedRequest"
      >
    >;
  };
};

export type SignS3GetObjectMutationVariables = {
  files: Array<FileInput>;
  action?: Maybe<S3SignatureAction>;
};

export type SignS3GetObjectMutation = { __typename?: "Mutation" } & {
  signS3GetObject: { __typename?: "SignedS3Payload" } & {
    signatures: Array<
      { __typename?: "SignedS3SubPayload" } & Pick<
        SignedS3SubPayload,
        "uri" | "signedRequest"
      >
    >;
  };
};

export type AddDirectMessageToThreadMutationVariables = {
  input: AddDirectMessageToThreadInput;
};

export type AddDirectMessageToThreadMutation = { __typename?: "Mutation" } & {
  addDirectMessageToThread: { __typename?: "AddDirectMessagePayload" } & Pick<
    AddDirectMessagePayload,
    "success" | "threadId"
  > & {
      message: { __typename?: "Message" } & Pick<Message, "id" | "message">;
      sentBy: { __typename?: "User" } & Pick<User, "id" | "name">;
      invitees: Array<{ __typename?: "User" } & Pick<User, "id" | "name">>;
    };
};

export type CreateDirectMessageMutationVariables = {
  input: CreateDirectMessageInput;
};

export type CreateDirectMessageMutation = { __typename?: "Mutation" } & {
  createDirectMessage: { __typename?: "AddDirectMessagePayload" } & Pick<
    AddDirectMessagePayload,
    "success" | "threadId"
  > & {
      invitees: Array<{ __typename?: "User" } & Pick<User, "id" | "name">>;
      message: { __typename?: "Message" } & Pick<Message, "id" | "message"> & {
          sentBy: { __typename?: "User" } & Pick<User, "id" | "name">;
        };
    };
};

export type GetAllMyMessagesQueryVariables = {};

export type GetAllMyMessagesQuery = { __typename?: "Query" } & {
  getAllMyMessages: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "firstName" | "lastName"> & {
        mappedMessages: Maybe<
          Array<
            Maybe<
              { __typename?: "Message" } & Pick<
                Message,
                "id" | "created_at" | "updated_at" | "message"
              > & {
                  sentBy: { __typename?: "User" } & Pick<
                    User,
                    "id" | "firstName" | "lastName"
                  >;
                  user: { __typename?: "User" } & Pick<
                    User,
                    "id" | "firstName" | "lastName"
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type GetListToCreateThreadQueryVariables = {
  teamId: Scalars["String"];
};

export type GetListToCreateThreadQuery = { __typename?: "Query" } & {
  getListToCreateThread: Array<
    Maybe<{ __typename?: "User" } & Pick<User, "id" | "firstName" | "lastName">>
  >;
};

export type GetMyMessagesFromUserQueryVariables = {
  input: GetMessagesFromUserInput;
};

export type GetMyMessagesFromUserQuery = { __typename?: "Query" } & {
  getMyMessagesFromUser: Maybe<
    Array<
      { __typename?: "Message" } & Pick<
        Message,
        "id" | "message" | "created_at"
      > & {
          sentBy: { __typename?: "User" } & Pick<
            User,
            "id" | "firstName" | "lastName"
          >;
        }
    >
  >;
};

export type LoadDirectMessageThreadsByTeamAndUserQueryVariables = {
  teamId: Scalars["String"];
};

export type LoadDirectMessageThreadsByTeamAndUserQuery = {
  __typename?: "Query";
} & {
  loadDirectMessageThreadsByTeamAndUser: Array<
    { __typename?: "Thread" } & Pick<Thread, "id" | "last_message"> & {
        invitees: Array<{ __typename?: "User" } & Pick<User, "id" | "name">>;
        messages: Maybe<
          Array<
            Maybe<{ __typename?: "Message" } & Pick<Message, "id" | "message">>
          >
        >;
      }
  >;
};

export type LoadDirectMessagesThreadByIdQueryVariables = {
  threadId: Scalars["String"];
  teamId: Scalars["String"];
};

export type LoadDirectMessagesThreadByIdQuery = { __typename?: "Query" } & {
  loadDirectMessagesThreadById: { __typename?: "Thread" } & Pick<
    Thread,
    "id"
  > & {
      invitees: Array<{ __typename?: "User" } & Pick<User, "id" | "name">>;
      messages: Maybe<
        Array<
          Maybe<
            { __typename?: "Message" } & Pick<Message, "id" | "message"> & {
                sentBy: { __typename?: "User" } & Pick<User, "id" | "name">;
              }
          >
        >
      >;
    };
};

export type NewDirectMessageSubSubscriptionVariables = {};

export type NewDirectMessageSubSubscription = {
  __typename?: "Subscription";
} & {
  newDirectMessageSub: { __typename?: "AddDirectMessagePayload" } & Pick<
    AddDirectMessagePayload,
    "success" | "threadId"
  > & {
      message: { __typename?: "Message" } & Pick<Message, "id" | "message">;
      sentBy: { __typename?: "User" } & Pick<User, "id" | "name">;
    };
};

export type AddTeamMemberMutationVariables = {
  roles: Array<TeamRoleEnum>;
  teamId: Scalars["String"];
  email: Scalars["String"];
};

export type AddTeamMemberMutation = { __typename?: "Mutation" } & {
  addTeamMember: { __typename?: "UserToTeamIdReferencesOnlyClass" } & Pick<
    UserToTeamIdReferencesOnlyClass,
    "userId" | "teamId" | "teamRoleAuthorizations"
  >;
};

export type CreateTeamMutationVariables = {
  name: Scalars["String"];
};

export type CreateTeamMutation = { __typename?: "Mutation" } & {
  createTeam: { __typename?: "Team" } & Pick<Team, "id" | "name">;
};

export type GetAllTeamMembersQueryVariables = {
  teamId: Scalars["String"];
};

export type GetAllTeamMembersQuery = { __typename?: "Query" } & {
  getAllTeamMembers: Array<
    { __typename?: "UserToTeam" } & Pick<
      UserToTeam,
      "userToTeamId" | "teamId"
    > & { user: { __typename?: "User" } & Pick<User, "id" | "name"> }
  >;
};

export type GetAllTeamsForUserQueryVariables = {};

export type GetAllTeamsForUserQuery = { __typename?: "Query" } & {
  getAllTeamsForUser: Array<
    { __typename?: "Team" } & Pick<Team, "id" | "name"> & {
        members: Array<
          Maybe<{ __typename?: "User" } & Pick<User, "id" | "firstName">>
        >;
        userToTeams: Array<
          Maybe<
            { __typename?: "UserToTeam" } & Pick<
              UserToTeam,
              "userToTeamId" | "teamRoleAuthorizations"
            >
          >
        >;
        channels: Array<
          Maybe<
            { __typename?: "Channel" } & Pick<
              Channel,
              "id" | "name" | "last_message"
            > & {
                invitees: Maybe<
                  Array<
                    Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type ForgotPasswordMutationVariables = {
  email: Scalars["String"];
};

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>;

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type AddProfilePictureMutationVariables = {
  data: UploadProfilePictureInput;
};

export type AddProfilePictureMutation = { __typename?: "Mutation" } & {
  addProfilePicture: { __typename?: "UploadProfilePictueReturnType" } & Pick<
    UploadProfilePictueReturnType,
    "message" | "profileImgUrl"
  >;
};

export type AdminEditUserInfoMutationVariables = {
  data: EditUserInput;
};

export type AdminEditUserInfoMutation = { __typename?: "Mutation" } & {
  adminEditUserInfo: { __typename?: "UserClassTypeWithReferenceIds" } & Pick<
    UserClassTypeWithReferenceIds,
    "id" | "name" | "email"
  > & {
      userToTeams: Maybe<
        Array<
          { __typename?: "UserToTeamIdReferencesOnlyClass" } & Pick<
            UserToTeamIdReferencesOnlyClass,
            "userToTeamId" | "teamRoleAuthorizations" | "teamId" | "userId"
          >
        >
      >;
    };
};

export type ChangePasswordFromContextUseridMutationVariables = {
  data: PasswordInput;
};

export type ChangePasswordFromContextUseridMutation = {
  __typename?: "Mutation";
} & {
  changePasswordFromContextUserid: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "firstName" | "lastName" | "email" | "name"
    >
  >;
};

export type ChangePasswordFromTokenMutationVariables = {
  data: ChangePasswordInput;
};

export type ChangePasswordFromTokenMutation = { __typename?: "Mutation" } & {
  changePasswordFromToken: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "firstName" | "lastName" | "email" | "name"
    >
  >;
};

export type ConfirmUserMutationVariables = {
  token: Scalars["String"];
};

export type ConfirmUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "confirmUser"
>;

export type EditUserInfoMutationVariables = {
  data: EditUserInput;
};

export type EditUserInfoMutation = { __typename?: "Mutation" } & {
  editUserInfo: { __typename?: "User" } & Pick<
    User,
    "firstName" | "lastName" | "email" | "name" | "id" | "profileImageUri"
  >;
};

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "firstName" | "lastName" | "email" | "name" | "profileImageUri"
    >
  >;
};

export type RegisterMutationVariables = {
  data: RegisterInput;
};

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & Pick<
    User,
    "id" | "firstName" | "lastName" | "email" | "name"
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "firstName" | "lastName" | "email" | "name" | "id" | "profileImageUri"
    >
  >;
};

export type HelloWorldQueryVariables = {};

export type HelloWorldQuery = { __typename?: "Query" } & Pick<
  Query,
  "helloWorld"
>;

export const AddChannelMemberDocument = gql`
  mutation AddChannelMember($channelId: String!, $userId: ID!) {
    addChannelMember(channelId: $channelId, userId: $userId)
  }
`;
export type AddChannelMemberMutationFn = ApolloReactCommon.MutationFunction<
  AddChannelMemberMutation,
  AddChannelMemberMutationVariables
>;
export type AddChannelMemberComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AddChannelMemberMutation,
    AddChannelMemberMutationVariables
  >,
  "mutation"
>;

export const AddChannelMemberComponent = (
  props: AddChannelMemberComponentProps
) => (
  <ApolloReactComponents.Mutation<
    AddChannelMemberMutation,
    AddChannelMemberMutationVariables
  >
    mutation={AddChannelMemberDocument}
    {...props}
  />
);

export type AddChannelMemberProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      AddChannelMemberMutation,
      AddChannelMemberMutationVariables
    >
  | TChildProps;
export function withAddChannelMember<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddChannelMemberMutation,
    AddChannelMemberMutationVariables,
    AddChannelMemberProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddChannelMemberMutation,
    AddChannelMemberMutationVariables,
    AddChannelMemberProps<TChildProps>
  >(AddChannelMemberDocument, {
    alias: "addChannelMember",
    ...operationOptions
  });
}

/**
 * __useAddChannelMemberMutation__
 *
 * To run a mutation, you first call `useAddChannelMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChannelMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChannelMemberMutation, { data, loading, error }] = useAddChannelMemberMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddChannelMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddChannelMemberMutation,
    AddChannelMemberMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddChannelMemberMutation,
    AddChannelMemberMutationVariables
  >(AddChannelMemberDocument, baseOptions);
}
export type AddChannelMemberMutationHookResult = ReturnType<
  typeof useAddChannelMemberMutation
>;
export type AddChannelMemberMutationResult = ApolloReactCommon.MutationResult<
  AddChannelMemberMutation
>;
export type AddChannelMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddChannelMemberMutation,
  AddChannelMemberMutationVariables
>;
export const AddMessageToChannelDocument = gql`
  mutation AddMessageToChannel($data: AddMessageToChannelInput!) {
    addMessageToChannel(data: $data) {
      success
    }
  }
`;
export type AddMessageToChannelMutationFn = ApolloReactCommon.MutationFunction<
  AddMessageToChannelMutation,
  AddMessageToChannelMutationVariables
>;
export type AddMessageToChannelComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AddMessageToChannelMutation,
    AddMessageToChannelMutationVariables
  >,
  "mutation"
>;

export const AddMessageToChannelComponent = (
  props: AddMessageToChannelComponentProps
) => (
  <ApolloReactComponents.Mutation<
    AddMessageToChannelMutation,
    AddMessageToChannelMutationVariables
  >
    mutation={AddMessageToChannelDocument}
    {...props}
  />
);

export type AddMessageToChannelProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      AddMessageToChannelMutation,
      AddMessageToChannelMutationVariables
    >
  | TChildProps;
export function withAddMessageToChannel<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddMessageToChannelMutation,
    AddMessageToChannelMutationVariables,
    AddMessageToChannelProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddMessageToChannelMutation,
    AddMessageToChannelMutationVariables,
    AddMessageToChannelProps<TChildProps>
  >(AddMessageToChannelDocument, {
    alias: "addMessageToChannel",
    ...operationOptions
  });
}

/**
 * __useAddMessageToChannelMutation__
 *
 * To run a mutation, you first call `useAddMessageToChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageToChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageToChannelMutation, { data, loading, error }] = useAddMessageToChannelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddMessageToChannelMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddMessageToChannelMutation,
    AddMessageToChannelMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddMessageToChannelMutation,
    AddMessageToChannelMutationVariables
  >(AddMessageToChannelDocument, baseOptions);
}
export type AddMessageToChannelMutationHookResult = ReturnType<
  typeof useAddMessageToChannelMutation
>;
export type AddMessageToChannelMutationResult = ApolloReactCommon.MutationResult<
  AddMessageToChannelMutation
>;
export type AddMessageToChannelMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddMessageToChannelMutation,
  AddMessageToChannelMutationVariables
>;
export const CreateChannelDocument = gql`
  mutation CreateChannel($input: AddChannelInput!) {
    createChannel(input: $input) {
      id
      name
      invitees {
        id
        name
      }
      last_message
    }
  }
`;
export type CreateChannelMutationFn = ApolloReactCommon.MutationFunction<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;
export type CreateChannelComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >,
  "mutation"
>;

export const CreateChannelComponent = (props: CreateChannelComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >
    mutation={CreateChannelDocument}
    {...props}
  />
);

export type CreateChannelProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      CreateChannelMutation,
      CreateChannelMutationVariables
    >
  | TChildProps;
export function withCreateChannel<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateChannelMutation,
    CreateChannelMutationVariables,
    CreateChannelProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateChannelMutation,
    CreateChannelMutationVariables,
    CreateChannelProps<TChildProps>
  >(CreateChannelDocument, {
    alias: "createChannel",
    ...operationOptions
  });
}

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CreateChannelDocument, baseOptions);
}
export type CreateChannelMutationHookResult = ReturnType<
  typeof useCreateChannelMutation
>;
export type CreateChannelMutationResult = ApolloReactCommon.MutationResult<
  CreateChannelMutation
>;
export type CreateChannelMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;
export const DeleteChannelDocument = gql`
  mutation DeleteChannel($channelId: String!, $channelName: String!) {
    deleteChannel(channelId: $channelId, channelName: $channelName)
  }
`;
export type DeleteChannelMutationFn = ApolloReactCommon.MutationFunction<
  DeleteChannelMutation,
  DeleteChannelMutationVariables
>;
export type DeleteChannelComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >,
  "mutation"
>;

export const DeleteChannelComponent = (props: DeleteChannelComponentProps) => (
  <ApolloReactComponents.Mutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >
    mutation={DeleteChannelDocument}
    {...props}
  />
);

export type DeleteChannelProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      DeleteChannelMutation,
      DeleteChannelMutationVariables
    >
  | TChildProps;
export function withDeleteChannel<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteChannelMutation,
    DeleteChannelMutationVariables,
    DeleteChannelProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteChannelMutation,
    DeleteChannelMutationVariables,
    DeleteChannelProps<TChildProps>
  >(DeleteChannelDocument, {
    alias: "deleteChannel",
    ...operationOptions
  });
}

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      channelName: // value for 'channelName'
 *   },
 * });
 */
export function useDeleteChannelMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >(DeleteChannelDocument, baseOptions);
}
export type DeleteChannelMutationHookResult = ReturnType<
  typeof useDeleteChannelMutation
>;
export type DeleteChannelMutationResult = ApolloReactCommon.MutationResult<
  DeleteChannelMutation
>;
export type DeleteChannelMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteChannelMutation,
  DeleteChannelMutationVariables
>;
export const GetAllChannelMessagesDocument = gql`
  query GetAllChannelMessages($channelId: String!, $teamId: String!) {
    getAllChannelMessages(channelId: $channelId, teamId: $teamId) {
      id
      message
      files {
        id
        uri
        file_type
      }
      created_at
      sentBy {
        id
        name
      }
    }
  }
`;
export type GetAllChannelMessagesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAllChannelMessagesQuery,
    GetAllChannelMessagesQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetAllChannelMessagesQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetAllChannelMessagesComponent = (
  props: GetAllChannelMessagesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetAllChannelMessagesQuery,
    GetAllChannelMessagesQueryVariables
  >
    query={GetAllChannelMessagesDocument}
    {...props}
  />
);

export type GetAllChannelMessagesProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      GetAllChannelMessagesQuery,
      GetAllChannelMessagesQueryVariables
    >
  | TChildProps;
export function withGetAllChannelMessages<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAllChannelMessagesQuery,
    GetAllChannelMessagesQueryVariables,
    GetAllChannelMessagesProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAllChannelMessagesQuery,
    GetAllChannelMessagesQueryVariables,
    GetAllChannelMessagesProps<TChildProps>
  >(GetAllChannelMessagesDocument, {
    alias: "getAllChannelMessages",
    ...operationOptions
  });
}

/**
 * __useGetAllChannelMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllChannelMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetAllChannelMessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllChannelMessagesQuery,
    GetAllChannelMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetAllChannelMessagesQuery,
    GetAllChannelMessagesQueryVariables
  >(GetAllChannelMessagesDocument, baseOptions);
}
export function useGetAllChannelMessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllChannelMessagesQuery,
    GetAllChannelMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllChannelMessagesQuery,
    GetAllChannelMessagesQueryVariables
  >(GetAllChannelMessagesDocument, baseOptions);
}
export type GetAllChannelMessagesQueryHookResult = ReturnType<
  typeof useGetAllChannelMessagesQuery
>;
export type GetAllChannelMessagesLazyQueryHookResult = ReturnType<
  typeof useGetAllChannelMessagesLazyQuery
>;
export type GetAllChannelMessagesQueryResult = ApolloReactCommon.QueryResult<
  GetAllChannelMessagesQuery,
  GetAllChannelMessagesQueryVariables
>;
export const RemoveChannelMemberDocument = gql`
  mutation RemoveChannelMember($channelId: String!, $userId: ID!) {
    removeChannelMember(channelId: $channelId, userId: $userId)
  }
`;
export type RemoveChannelMemberMutationFn = ApolloReactCommon.MutationFunction<
  RemoveChannelMemberMutation,
  RemoveChannelMemberMutationVariables
>;
export type RemoveChannelMemberComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    RemoveChannelMemberMutation,
    RemoveChannelMemberMutationVariables
  >,
  "mutation"
>;

export const RemoveChannelMemberComponent = (
  props: RemoveChannelMemberComponentProps
) => (
  <ApolloReactComponents.Mutation<
    RemoveChannelMemberMutation,
    RemoveChannelMemberMutationVariables
  >
    mutation={RemoveChannelMemberDocument}
    {...props}
  />
);

export type RemoveChannelMemberProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      RemoveChannelMemberMutation,
      RemoveChannelMemberMutationVariables
    >
  | TChildProps;
export function withRemoveChannelMember<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveChannelMemberMutation,
    RemoveChannelMemberMutationVariables,
    RemoveChannelMemberProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveChannelMemberMutation,
    RemoveChannelMemberMutationVariables,
    RemoveChannelMemberProps<TChildProps>
  >(RemoveChannelMemberDocument, {
    alias: "removeChannelMember",
    ...operationOptions
  });
}

/**
 * __useRemoveChannelMemberMutation__
 *
 * To run a mutation, you first call `useRemoveChannelMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChannelMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChannelMemberMutation, { data, loading, error }] = useRemoveChannelMemberMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveChannelMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveChannelMemberMutation,
    RemoveChannelMemberMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveChannelMemberMutation,
    RemoveChannelMemberMutationVariables
  >(RemoveChannelMemberDocument, baseOptions);
}
export type RemoveChannelMemberMutationHookResult = ReturnType<
  typeof useRemoveChannelMemberMutation
>;
export type RemoveChannelMemberMutationResult = ApolloReactCommon.MutationResult<
  RemoveChannelMemberMutation
>;
export type RemoveChannelMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveChannelMemberMutation,
  RemoveChannelMemberMutationVariables
>;
export const GetAllChannelMembersDocument = gql`
  query GetAllChannelMembers($channelId: String!) {
    getAllChannelMembers(channelId: $channelId) {
      id
      name
    }
  }
`;
export type GetAllChannelMembersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAllChannelMembersQuery,
    GetAllChannelMembersQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetAllChannelMembersQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetAllChannelMembersComponent = (
  props: GetAllChannelMembersComponentProps
) => (
  <ApolloReactComponents.Query<
    GetAllChannelMembersQuery,
    GetAllChannelMembersQueryVariables
  >
    query={GetAllChannelMembersDocument}
    {...props}
  />
);

export type GetAllChannelMembersProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      GetAllChannelMembersQuery,
      GetAllChannelMembersQueryVariables
    >
  | TChildProps;
export function withGetAllChannelMembers<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAllChannelMembersQuery,
    GetAllChannelMembersQueryVariables,
    GetAllChannelMembersProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAllChannelMembersQuery,
    GetAllChannelMembersQueryVariables,
    GetAllChannelMembersProps<TChildProps>
  >(GetAllChannelMembersDocument, {
    alias: "getAllChannelMembers",
    ...operationOptions
  });
}

/**
 * __useGetAllChannelMembersQuery__
 *
 * To run a query within a React component, call `useGetAllChannelMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllChannelMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllChannelMembersQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetAllChannelMembersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllChannelMembersQuery,
    GetAllChannelMembersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetAllChannelMembersQuery,
    GetAllChannelMembersQueryVariables
  >(GetAllChannelMembersDocument, baseOptions);
}
export function useGetAllChannelMembersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllChannelMembersQuery,
    GetAllChannelMembersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllChannelMembersQuery,
    GetAllChannelMembersQueryVariables
  >(GetAllChannelMembersDocument, baseOptions);
}
export type GetAllChannelMembersQueryHookResult = ReturnType<
  typeof useGetAllChannelMembersQuery
>;
export type GetAllChannelMembersLazyQueryHookResult = ReturnType<
  typeof useGetAllChannelMembersLazyQuery
>;
export type GetAllChannelMembersQueryResult = ApolloReactCommon.QueryResult<
  GetAllChannelMembersQuery,
  GetAllChannelMembersQueryVariables
>;
export const GetChannelNameDocument = gql`
  query GetChannelName($channelId: String!) {
    getChannelName(channelId: $channelId)
  }
`;
export type GetChannelNameComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetChannelNameQuery,
    GetChannelNameQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetChannelNameQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetChannelNameComponent = (
  props: GetChannelNameComponentProps
) => (
  <ApolloReactComponents.Query<
    GetChannelNameQuery,
    GetChannelNameQueryVariables
  >
    query={GetChannelNameDocument}
    {...props}
  />
);

export type GetChannelNameProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<GetChannelNameQuery, GetChannelNameQueryVariables>
  | TChildProps;
export function withGetChannelName<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetChannelNameQuery,
    GetChannelNameQueryVariables,
    GetChannelNameProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetChannelNameQuery,
    GetChannelNameQueryVariables,
    GetChannelNameProps<TChildProps>
  >(GetChannelNameDocument, {
    alias: "getChannelName",
    ...operationOptions
  });
}

/**
 * __useGetChannelNameQuery__
 *
 * To run a query within a React component, call `useGetChannelNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelNameQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetChannelNameQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetChannelNameQuery,
    GetChannelNameQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetChannelNameQuery,
    GetChannelNameQueryVariables
  >(GetChannelNameDocument, baseOptions);
}
export function useGetChannelNameLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetChannelNameQuery,
    GetChannelNameQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetChannelNameQuery,
    GetChannelNameQueryVariables
  >(GetChannelNameDocument, baseOptions);
}
export type GetChannelNameQueryHookResult = ReturnType<
  typeof useGetChannelNameQuery
>;
export type GetChannelNameLazyQueryHookResult = ReturnType<
  typeof useGetChannelNameLazyQuery
>;
export type GetChannelNameQueryResult = ApolloReactCommon.QueryResult<
  GetChannelNameQuery,
  GetChannelNameQueryVariables
>;
export const LoadChannelsByTeamIdDocument = gql`
  query LoadChannelsByTeamId($teamId: String!) {
    loadChannelsByTeamId(teamId: $teamId) {
      id
      name
      invitees {
        id
        name
      }
    }
  }
`;
export type LoadChannelsByTeamIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >,
  "query"
> &
  (
    | { variables: LoadChannelsByTeamIdQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const LoadChannelsByTeamIdComponent = (
  props: LoadChannelsByTeamIdComponentProps
) => (
  <ApolloReactComponents.Query<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >
    query={LoadChannelsByTeamIdDocument}
    {...props}
  />
);

export type LoadChannelsByTeamIdProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      LoadChannelsByTeamIdQuery,
      LoadChannelsByTeamIdQueryVariables
    >
  | TChildProps;
export function withLoadChannelsByTeamId<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables,
    LoadChannelsByTeamIdProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables,
    LoadChannelsByTeamIdProps<TChildProps>
  >(LoadChannelsByTeamIdDocument, {
    alias: "loadChannelsByTeamId",
    ...operationOptions
  });
}

/**
 * __useLoadChannelsByTeamIdQuery__
 *
 * To run a query within a React component, call `useLoadChannelsByTeamIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadChannelsByTeamIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadChannelsByTeamIdQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLoadChannelsByTeamIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >(LoadChannelsByTeamIdDocument, baseOptions);
}
export function useLoadChannelsByTeamIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >(LoadChannelsByTeamIdDocument, baseOptions);
}
export type LoadChannelsByTeamIdQueryHookResult = ReturnType<
  typeof useLoadChannelsByTeamIdQuery
>;
export type LoadChannelsByTeamIdLazyQueryHookResult = ReturnType<
  typeof useLoadChannelsByTeamIdLazyQuery
>;
export type LoadChannelsByTeamIdQueryResult = ApolloReactCommon.QueryResult<
  LoadChannelsByTeamIdQuery,
  LoadChannelsByTeamIdQueryVariables
>;
export const NewMessageSubDocument = gql`
  subscription NewMessageSub($data: AddMessageToChannelInput!) {
    newMessageSub(data: $data) {
      id
      created_at
      message
      created_at
      files {
        id
        uri
        file_type
      }
      sentBy {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
`;
export type NewMessageSubComponentProps = Omit<
  ApolloReactComponents.SubscriptionComponentOptions<
    NewMessageSubSubscription,
    NewMessageSubSubscriptionVariables
  >,
  "subscription"
>;

export const NewMessageSubComponent = (props: NewMessageSubComponentProps) => (
  <ApolloReactComponents.Subscription<
    NewMessageSubSubscription,
    NewMessageSubSubscriptionVariables
  >
    subscription={NewMessageSubDocument}
    {...props}
  />
);

export type NewMessageSubProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      NewMessageSubSubscription,
      NewMessageSubSubscriptionVariables
    >
  | TChildProps;
export function withNewMessageSub<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    NewMessageSubSubscription,
    NewMessageSubSubscriptionVariables,
    NewMessageSubProps<TChildProps>
  >
) {
  return ApolloReactHoc.withSubscription<
    TProps,
    NewMessageSubSubscription,
    NewMessageSubSubscriptionVariables,
    NewMessageSubProps<TChildProps>
  >(NewMessageSubDocument, {
    alias: "newMessageSub",
    ...operationOptions
  });
}

/**
 * __useNewMessageSubSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewMessageSubSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    NewMessageSubSubscription,
    NewMessageSubSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    NewMessageSubSubscription,
    NewMessageSubSubscriptionVariables
  >(NewMessageSubDocument, baseOptions);
}
export type NewMessageSubSubscriptionHookResult = ReturnType<
  typeof useNewMessageSubSubscription
>;
export type NewMessageSubSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  NewMessageSubSubscription
>;
export const SignS3Document = gql`
  mutation SignS3($files: [ImageSubInput!]!, $action: S3SignatureAction!) {
    signS3(files: $files, action: $action) {
      signatures {
        uri
        signedRequest
      }
    }
  }
`;
export type SignS3MutationFn = ApolloReactCommon.MutationFunction<
  SignS3Mutation,
  SignS3MutationVariables
>;
export type SignS3ComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SignS3Mutation,
    SignS3MutationVariables
  >,
  "mutation"
>;

export const SignS3Component = (props: SignS3ComponentProps) => (
  <ApolloReactComponents.Mutation<SignS3Mutation, SignS3MutationVariables>
    mutation={SignS3Document}
    {...props}
  />
);

export type SignS3Props<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<SignS3Mutation, SignS3MutationVariables>
  | TChildProps;
export function withSignS3<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignS3Mutation,
    SignS3MutationVariables,
    SignS3Props<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SignS3Mutation,
    SignS3MutationVariables,
    SignS3Props<TChildProps>
  >(SignS3Document, {
    alias: "signS3",
    ...operationOptions
  });
}

/**
 * __useSignS3Mutation__
 *
 * To run a mutation, you first call `useSignS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3Mutation, { data, loading, error }] = useSignS3Mutation({
 *   variables: {
 *      files: // value for 'files'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useSignS3Mutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignS3Mutation,
    SignS3MutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignS3Mutation, SignS3MutationVariables>(
    SignS3Document,
    baseOptions
  );
}
export type SignS3MutationHookResult = ReturnType<typeof useSignS3Mutation>;
export type SignS3MutationResult = ApolloReactCommon.MutationResult<
  SignS3Mutation
>;
export type SignS3MutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignS3Mutation,
  SignS3MutationVariables
>;
export const SignS3GetObjectDocument = gql`
  mutation SignS3GetObject($files: [FileInput!]!, $action: S3SignatureAction) {
    signS3GetObject(files: $files, action: $action) {
      signatures {
        uri
        signedRequest
      }
    }
  }
`;
export type SignS3GetObjectMutationFn = ApolloReactCommon.MutationFunction<
  SignS3GetObjectMutation,
  SignS3GetObjectMutationVariables
>;
export type SignS3GetObjectComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SignS3GetObjectMutation,
    SignS3GetObjectMutationVariables
  >,
  "mutation"
>;

export const SignS3GetObjectComponent = (
  props: SignS3GetObjectComponentProps
) => (
  <ApolloReactComponents.Mutation<
    SignS3GetObjectMutation,
    SignS3GetObjectMutationVariables
  >
    mutation={SignS3GetObjectDocument}
    {...props}
  />
);

export type SignS3GetObjectProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      SignS3GetObjectMutation,
      SignS3GetObjectMutationVariables
    >
  | TChildProps;
export function withSignS3GetObject<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignS3GetObjectMutation,
    SignS3GetObjectMutationVariables,
    SignS3GetObjectProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SignS3GetObjectMutation,
    SignS3GetObjectMutationVariables,
    SignS3GetObjectProps<TChildProps>
  >(SignS3GetObjectDocument, {
    alias: "signS3GetObject",
    ...operationOptions
  });
}

/**
 * __useSignS3GetObjectMutation__
 *
 * To run a mutation, you first call `useSignS3GetObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3GetObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3GetObjectMutation, { data, loading, error }] = useSignS3GetObjectMutation({
 *   variables: {
 *      files: // value for 'files'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useSignS3GetObjectMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignS3GetObjectMutation,
    SignS3GetObjectMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SignS3GetObjectMutation,
    SignS3GetObjectMutationVariables
  >(SignS3GetObjectDocument, baseOptions);
}
export type SignS3GetObjectMutationHookResult = ReturnType<
  typeof useSignS3GetObjectMutation
>;
export type SignS3GetObjectMutationResult = ApolloReactCommon.MutationResult<
  SignS3GetObjectMutation
>;
export type SignS3GetObjectMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignS3GetObjectMutation,
  SignS3GetObjectMutationVariables
>;
export const AddDirectMessageToThreadDocument = gql`
  mutation AddDirectMessageToThread($input: AddDirectMessageToThreadInput!) {
    addDirectMessageToThread(input: $input) {
      success
      threadId
      message {
        id
        message
      }
      sentBy {
        id
        name
      }
      invitees {
        id
        name
      }
    }
  }
`;
export type AddDirectMessageToThreadMutationFn = ApolloReactCommon.MutationFunction<
  AddDirectMessageToThreadMutation,
  AddDirectMessageToThreadMutationVariables
>;
export type AddDirectMessageToThreadComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AddDirectMessageToThreadMutation,
    AddDirectMessageToThreadMutationVariables
  >,
  "mutation"
>;

export const AddDirectMessageToThreadComponent = (
  props: AddDirectMessageToThreadComponentProps
) => (
  <ApolloReactComponents.Mutation<
    AddDirectMessageToThreadMutation,
    AddDirectMessageToThreadMutationVariables
  >
    mutation={AddDirectMessageToThreadDocument}
    {...props}
  />
);

export type AddDirectMessageToThreadProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      AddDirectMessageToThreadMutation,
      AddDirectMessageToThreadMutationVariables
    >
  | TChildProps;
export function withAddDirectMessageToThread<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddDirectMessageToThreadMutation,
    AddDirectMessageToThreadMutationVariables,
    AddDirectMessageToThreadProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddDirectMessageToThreadMutation,
    AddDirectMessageToThreadMutationVariables,
    AddDirectMessageToThreadProps<TChildProps>
  >(AddDirectMessageToThreadDocument, {
    alias: "addDirectMessageToThread",
    ...operationOptions
  });
}

/**
 * __useAddDirectMessageToThreadMutation__
 *
 * To run a mutation, you first call `useAddDirectMessageToThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDirectMessageToThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDirectMessageToThreadMutation, { data, loading, error }] = useAddDirectMessageToThreadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDirectMessageToThreadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddDirectMessageToThreadMutation,
    AddDirectMessageToThreadMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddDirectMessageToThreadMutation,
    AddDirectMessageToThreadMutationVariables
  >(AddDirectMessageToThreadDocument, baseOptions);
}
export type AddDirectMessageToThreadMutationHookResult = ReturnType<
  typeof useAddDirectMessageToThreadMutation
>;
export type AddDirectMessageToThreadMutationResult = ApolloReactCommon.MutationResult<
  AddDirectMessageToThreadMutation
>;
export type AddDirectMessageToThreadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddDirectMessageToThreadMutation,
  AddDirectMessageToThreadMutationVariables
>;
export const CreateDirectMessageDocument = gql`
  mutation CreateDirectMessage($input: CreateDirectMessageInput!) {
    createDirectMessage(input: $input) {
      success
      threadId
      invitees {
        id
        name
      }
      message {
        id
        message
        sentBy {
          id
          name
        }
      }
    }
  }
`;
export type CreateDirectMessageMutationFn = ApolloReactCommon.MutationFunction<
  CreateDirectMessageMutation,
  CreateDirectMessageMutationVariables
>;
export type CreateDirectMessageComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateDirectMessageMutation,
    CreateDirectMessageMutationVariables
  >,
  "mutation"
>;

export const CreateDirectMessageComponent = (
  props: CreateDirectMessageComponentProps
) => (
  <ApolloReactComponents.Mutation<
    CreateDirectMessageMutation,
    CreateDirectMessageMutationVariables
  >
    mutation={CreateDirectMessageDocument}
    {...props}
  />
);

export type CreateDirectMessageProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      CreateDirectMessageMutation,
      CreateDirectMessageMutationVariables
    >
  | TChildProps;
export function withCreateDirectMessage<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateDirectMessageMutation,
    CreateDirectMessageMutationVariables,
    CreateDirectMessageProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateDirectMessageMutation,
    CreateDirectMessageMutationVariables,
    CreateDirectMessageProps<TChildProps>
  >(CreateDirectMessageDocument, {
    alias: "createDirectMessage",
    ...operationOptions
  });
}

/**
 * __useCreateDirectMessageMutation__
 *
 * To run a mutation, you first call `useCreateDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMessageMutation, { data, loading, error }] = useCreateDirectMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDirectMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateDirectMessageMutation,
    CreateDirectMessageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateDirectMessageMutation,
    CreateDirectMessageMutationVariables
  >(CreateDirectMessageDocument, baseOptions);
}
export type CreateDirectMessageMutationHookResult = ReturnType<
  typeof useCreateDirectMessageMutation
>;
export type CreateDirectMessageMutationResult = ApolloReactCommon.MutationResult<
  CreateDirectMessageMutation
>;
export type CreateDirectMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateDirectMessageMutation,
  CreateDirectMessageMutationVariables
>;
export const GetAllMyMessagesDocument = gql`
  query GetAllMyMessages {
    getAllMyMessages {
      id
      firstName
      lastName
      mappedMessages {
        id
        created_at
        updated_at
        message
        sentBy {
          id
          firstName
          lastName
        }
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
export type GetAllMyMessagesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >,
  "query"
>;

export const GetAllMyMessagesComponent = (
  props: GetAllMyMessagesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >
    query={GetAllMyMessagesDocument}
    {...props}
  />
);

export type GetAllMyMessagesProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      GetAllMyMessagesQuery,
      GetAllMyMessagesQueryVariables
    >
  | TChildProps;
export function withGetAllMyMessages<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables,
    GetAllMyMessagesProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables,
    GetAllMyMessagesProps<TChildProps>
  >(GetAllMyMessagesDocument, {
    alias: "getAllMyMessages",
    ...operationOptions
  });
}

/**
 * __useGetAllMyMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllMyMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMyMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMyMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMyMessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >(GetAllMyMessagesDocument, baseOptions);
}
export function useGetAllMyMessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >(GetAllMyMessagesDocument, baseOptions);
}
export type GetAllMyMessagesQueryHookResult = ReturnType<
  typeof useGetAllMyMessagesQuery
>;
export type GetAllMyMessagesLazyQueryHookResult = ReturnType<
  typeof useGetAllMyMessagesLazyQuery
>;
export type GetAllMyMessagesQueryResult = ApolloReactCommon.QueryResult<
  GetAllMyMessagesQuery,
  GetAllMyMessagesQueryVariables
>;
export const GetListToCreateThreadDocument = gql`
  query GetListToCreateThread($teamId: String!) {
    getListToCreateThread(teamId: $teamId) {
      id
      firstName
      lastName
    }
  }
`;
export type GetListToCreateThreadComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetListToCreateThreadQuery,
    GetListToCreateThreadQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetListToCreateThreadQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetListToCreateThreadComponent = (
  props: GetListToCreateThreadComponentProps
) => (
  <ApolloReactComponents.Query<
    GetListToCreateThreadQuery,
    GetListToCreateThreadQueryVariables
  >
    query={GetListToCreateThreadDocument}
    {...props}
  />
);

export type GetListToCreateThreadProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      GetListToCreateThreadQuery,
      GetListToCreateThreadQueryVariables
    >
  | TChildProps;
export function withGetListToCreateThread<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetListToCreateThreadQuery,
    GetListToCreateThreadQueryVariables,
    GetListToCreateThreadProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetListToCreateThreadQuery,
    GetListToCreateThreadQueryVariables,
    GetListToCreateThreadProps<TChildProps>
  >(GetListToCreateThreadDocument, {
    alias: "getListToCreateThread",
    ...operationOptions
  });
}

/**
 * __useGetListToCreateThreadQuery__
 *
 * To run a query within a React component, call `useGetListToCreateThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListToCreateThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListToCreateThreadQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetListToCreateThreadQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetListToCreateThreadQuery,
    GetListToCreateThreadQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetListToCreateThreadQuery,
    GetListToCreateThreadQueryVariables
  >(GetListToCreateThreadDocument, baseOptions);
}
export function useGetListToCreateThreadLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetListToCreateThreadQuery,
    GetListToCreateThreadQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetListToCreateThreadQuery,
    GetListToCreateThreadQueryVariables
  >(GetListToCreateThreadDocument, baseOptions);
}
export type GetListToCreateThreadQueryHookResult = ReturnType<
  typeof useGetListToCreateThreadQuery
>;
export type GetListToCreateThreadLazyQueryHookResult = ReturnType<
  typeof useGetListToCreateThreadLazyQuery
>;
export type GetListToCreateThreadQueryResult = ApolloReactCommon.QueryResult<
  GetListToCreateThreadQuery,
  GetListToCreateThreadQueryVariables
>;
export const GetMyMessagesFromUserDocument = gql`
  query GetMyMessagesFromUser($input: GetMessagesFromUserInput!) {
    getMyMessagesFromUser(input: $input) {
      id
      message
      created_at
      sentBy {
        id
        firstName
        lastName
      }
    }
  }
`;
export type GetMyMessagesFromUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetMyMessagesFromUserQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetMyMessagesFromUserComponent = (
  props: GetMyMessagesFromUserComponentProps
) => (
  <ApolloReactComponents.Query<
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserQueryVariables
  >
    query={GetMyMessagesFromUserDocument}
    {...props}
  />
);

export type GetMyMessagesFromUserProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      GetMyMessagesFromUserQuery,
      GetMyMessagesFromUserQueryVariables
    >
  | TChildProps;
export function withGetMyMessagesFromUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserQueryVariables,
    GetMyMessagesFromUserProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserQueryVariables,
    GetMyMessagesFromUserProps<TChildProps>
  >(GetMyMessagesFromUserDocument, {
    alias: "getMyMessagesFromUser",
    ...operationOptions
  });
}

/**
 * __useGetMyMessagesFromUserQuery__
 *
 * To run a query within a React component, call `useGetMyMessagesFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMessagesFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMessagesFromUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyMessagesFromUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserQueryVariables
  >(GetMyMessagesFromUserDocument, baseOptions);
}
export function useGetMyMessagesFromUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserQueryVariables
  >(GetMyMessagesFromUserDocument, baseOptions);
}
export type GetMyMessagesFromUserQueryHookResult = ReturnType<
  typeof useGetMyMessagesFromUserQuery
>;
export type GetMyMessagesFromUserLazyQueryHookResult = ReturnType<
  typeof useGetMyMessagesFromUserLazyQuery
>;
export type GetMyMessagesFromUserQueryResult = ApolloReactCommon.QueryResult<
  GetMyMessagesFromUserQuery,
  GetMyMessagesFromUserQueryVariables
>;
export const LoadDirectMessageThreadsByTeamAndUserDocument = gql`
  query LoadDirectMessageThreadsByTeamAndUser($teamId: String!) {
    loadDirectMessageThreadsByTeamAndUser(teamId: $teamId) {
      id
      last_message
      invitees {
        id
        name
      }
      messages {
        id
        message
      }
    }
  }
`;
export type LoadDirectMessageThreadsByTeamAndUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >,
  "query"
> &
  (
    | {
        variables: LoadDirectMessageThreadsByTeamAndUserQueryVariables;
        skip?: boolean;
      }
    | { skip: boolean }
  );

export const LoadDirectMessageThreadsByTeamAndUserComponent = (
  props: LoadDirectMessageThreadsByTeamAndUserComponentProps
) => (
  <ApolloReactComponents.Query<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >
    query={LoadDirectMessageThreadsByTeamAndUserDocument}
    {...props}
  />
);

export type LoadDirectMessageThreadsByTeamAndUserProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      LoadDirectMessageThreadsByTeamAndUserQuery,
      LoadDirectMessageThreadsByTeamAndUserQueryVariables
    >
  | TChildProps;
export function withLoadDirectMessageThreadsByTeamAndUser<
  TProps,
  TChildProps = {}
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables,
    LoadDirectMessageThreadsByTeamAndUserProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables,
    LoadDirectMessageThreadsByTeamAndUserProps<TChildProps>
  >(LoadDirectMessageThreadsByTeamAndUserDocument, {
    alias: "loadDirectMessageThreadsByTeamAndUser",
    ...operationOptions
  });
}

/**
 * __useLoadDirectMessageThreadsByTeamAndUserQuery__
 *
 * To run a query within a React component, call `useLoadDirectMessageThreadsByTeamAndUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadDirectMessageThreadsByTeamAndUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadDirectMessageThreadsByTeamAndUserQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLoadDirectMessageThreadsByTeamAndUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >(LoadDirectMessageThreadsByTeamAndUserDocument, baseOptions);
}
export function useLoadDirectMessageThreadsByTeamAndUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >(LoadDirectMessageThreadsByTeamAndUserDocument, baseOptions);
}
export type LoadDirectMessageThreadsByTeamAndUserQueryHookResult = ReturnType<
  typeof useLoadDirectMessageThreadsByTeamAndUserQuery
>;
export type LoadDirectMessageThreadsByTeamAndUserLazyQueryHookResult = ReturnType<
  typeof useLoadDirectMessageThreadsByTeamAndUserLazyQuery
>;
export type LoadDirectMessageThreadsByTeamAndUserQueryResult = ApolloReactCommon.QueryResult<
  LoadDirectMessageThreadsByTeamAndUserQuery,
  LoadDirectMessageThreadsByTeamAndUserQueryVariables
>;
export const LoadDirectMessagesThreadByIdDocument = gql`
  query LoadDirectMessagesThreadById($threadId: String!, $teamId: String!) {
    loadDirectMessagesThreadById(threadId: $threadId, teamId: $teamId) {
      id
      invitees {
        id
        name
      }
      messages {
        id
        message
        sentBy {
          id
          name
        }
      }
    }
  }
`;
export type LoadDirectMessagesThreadByIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >,
  "query"
> &
  (
    | { variables: LoadDirectMessagesThreadByIdQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const LoadDirectMessagesThreadByIdComponent = (
  props: LoadDirectMessagesThreadByIdComponentProps
) => (
  <ApolloReactComponents.Query<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >
    query={LoadDirectMessagesThreadByIdDocument}
    {...props}
  />
);

export type LoadDirectMessagesThreadByIdProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      LoadDirectMessagesThreadByIdQuery,
      LoadDirectMessagesThreadByIdQueryVariables
    >
  | TChildProps;
export function withLoadDirectMessagesThreadById<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables,
    LoadDirectMessagesThreadByIdProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables,
    LoadDirectMessagesThreadByIdProps<TChildProps>
  >(LoadDirectMessagesThreadByIdDocument, {
    alias: "loadDirectMessagesThreadById",
    ...operationOptions
  });
}

/**
 * __useLoadDirectMessagesThreadByIdQuery__
 *
 * To run a query within a React component, call `useLoadDirectMessagesThreadByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadDirectMessagesThreadByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadDirectMessagesThreadByIdQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLoadDirectMessagesThreadByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >(LoadDirectMessagesThreadByIdDocument, baseOptions);
}
export function useLoadDirectMessagesThreadByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >(LoadDirectMessagesThreadByIdDocument, baseOptions);
}
export type LoadDirectMessagesThreadByIdQueryHookResult = ReturnType<
  typeof useLoadDirectMessagesThreadByIdQuery
>;
export type LoadDirectMessagesThreadByIdLazyQueryHookResult = ReturnType<
  typeof useLoadDirectMessagesThreadByIdLazyQuery
>;
export type LoadDirectMessagesThreadByIdQueryResult = ApolloReactCommon.QueryResult<
  LoadDirectMessagesThreadByIdQuery,
  LoadDirectMessagesThreadByIdQueryVariables
>;
export const NewDirectMessageSubDocument = gql`
  subscription NewDirectMessageSub {
    newDirectMessageSub {
      success
      threadId
      message {
        id
        message
      }
      sentBy {
        id
        name
      }
    }
  }
`;
export type NewDirectMessageSubComponentProps = Omit<
  ApolloReactComponents.SubscriptionComponentOptions<
    NewDirectMessageSubSubscription,
    NewDirectMessageSubSubscriptionVariables
  >,
  "subscription"
>;

export const NewDirectMessageSubComponent = (
  props: NewDirectMessageSubComponentProps
) => (
  <ApolloReactComponents.Subscription<
    NewDirectMessageSubSubscription,
    NewDirectMessageSubSubscriptionVariables
  >
    subscription={NewDirectMessageSubDocument}
    {...props}
  />
);

export type NewDirectMessageSubProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      NewDirectMessageSubSubscription,
      NewDirectMessageSubSubscriptionVariables
    >
  | TChildProps;
export function withNewDirectMessageSub<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    NewDirectMessageSubSubscription,
    NewDirectMessageSubSubscriptionVariables,
    NewDirectMessageSubProps<TChildProps>
  >
) {
  return ApolloReactHoc.withSubscription<
    TProps,
    NewDirectMessageSubSubscription,
    NewDirectMessageSubSubscriptionVariables,
    NewDirectMessageSubProps<TChildProps>
  >(NewDirectMessageSubDocument, {
    alias: "newDirectMessageSub",
    ...operationOptions
  });
}

/**
 * __useNewDirectMessageSubSubscription__
 *
 * To run a query within a React component, call `useNewDirectMessageSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewDirectMessageSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewDirectMessageSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewDirectMessageSubSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    NewDirectMessageSubSubscription,
    NewDirectMessageSubSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    NewDirectMessageSubSubscription,
    NewDirectMessageSubSubscriptionVariables
  >(NewDirectMessageSubDocument, baseOptions);
}
export type NewDirectMessageSubSubscriptionHookResult = ReturnType<
  typeof useNewDirectMessageSubSubscription
>;
export type NewDirectMessageSubSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  NewDirectMessageSubSubscription
>;
export const AddTeamMemberDocument = gql`
  mutation AddTeamMember(
    $roles: [TeamRoleEnum!]!
    $teamId: String!
    $email: String!
  ) {
    addTeamMember(roles: $roles, teamId: $teamId, email: $email) {
      userId
      teamId
      teamRoleAuthorizations
    }
  }
`;
export type AddTeamMemberMutationFn = ApolloReactCommon.MutationFunction<
  AddTeamMemberMutation,
  AddTeamMemberMutationVariables
>;
export type AddTeamMemberComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AddTeamMemberMutation,
    AddTeamMemberMutationVariables
  >,
  "mutation"
>;

export const AddTeamMemberComponent = (props: AddTeamMemberComponentProps) => (
  <ApolloReactComponents.Mutation<
    AddTeamMemberMutation,
    AddTeamMemberMutationVariables
  >
    mutation={AddTeamMemberDocument}
    {...props}
  />
);

export type AddTeamMemberProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      AddTeamMemberMutation,
      AddTeamMemberMutationVariables
    >
  | TChildProps;
export function withAddTeamMember<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddTeamMemberMutation,
    AddTeamMemberMutationVariables,
    AddTeamMemberProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddTeamMemberMutation,
    AddTeamMemberMutationVariables,
    AddTeamMemberProps<TChildProps>
  >(AddTeamMemberDocument, {
    alias: "addTeamMember",
    ...operationOptions
  });
}

/**
 * __useAddTeamMemberMutation__
 *
 * To run a mutation, you first call `useAddTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMemberMutation, { data, loading, error }] = useAddTeamMemberMutation({
 *   variables: {
 *      roles: // value for 'roles'
 *      teamId: // value for 'teamId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddTeamMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddTeamMemberMutation,
    AddTeamMemberMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddTeamMemberMutation,
    AddTeamMemberMutationVariables
  >(AddTeamMemberDocument, baseOptions);
}
export type AddTeamMemberMutationHookResult = ReturnType<
  typeof useAddTeamMemberMutation
>;
export type AddTeamMemberMutationResult = ApolloReactCommon.MutationResult<
  AddTeamMemberMutation
>;
export type AddTeamMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddTeamMemberMutation,
  AddTeamMemberMutationVariables
>;
export const CreateTeamDocument = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`;
export type CreateTeamMutationFn = ApolloReactCommon.MutationFunction<
  CreateTeamMutation,
  CreateTeamMutationVariables
>;
export type CreateTeamComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >,
  "mutation"
>;

export const CreateTeamComponent = (props: CreateTeamComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >
    mutation={CreateTeamDocument}
    {...props}
  />
);

export type CreateTeamProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<CreateTeamMutation, CreateTeamMutationVariables>
  | TChildProps;
export function withCreateTeam<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateTeamMutation,
    CreateTeamMutationVariables,
    CreateTeamProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateTeamMutation,
    CreateTeamMutationVariables,
    CreateTeamProps<TChildProps>
  >(CreateTeamDocument, {
    alias: "createTeam",
    ...operationOptions
  });
}

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >(CreateTeamDocument, baseOptions);
}
export type CreateTeamMutationHookResult = ReturnType<
  typeof useCreateTeamMutation
>;
export type CreateTeamMutationResult = ApolloReactCommon.MutationResult<
  CreateTeamMutation
>;
export type CreateTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTeamMutation,
  CreateTeamMutationVariables
>;
export const GetAllTeamMembersDocument = gql`
  query GetAllTeamMembers($teamId: String!) {
    getAllTeamMembers(teamId: $teamId) {
      userToTeamId
      teamId
      user {
        id
        name
      }
    }
  }
`;
export type GetAllTeamMembersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetAllTeamMembersQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetAllTeamMembersComponent = (
  props: GetAllTeamMembersComponentProps
) => (
  <ApolloReactComponents.Query<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >
    query={GetAllTeamMembersDocument}
    {...props}
  />
);

export type GetAllTeamMembersProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      GetAllTeamMembersQuery,
      GetAllTeamMembersQueryVariables
    >
  | TChildProps;
export function withGetAllTeamMembers<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables,
    GetAllTeamMembersProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables,
    GetAllTeamMembersProps<TChildProps>
  >(GetAllTeamMembersDocument, {
    alias: "getAllTeamMembers",
    ...operationOptions
  });
}

/**
 * __useGetAllTeamMembersQuery__
 *
 * To run a query within a React component, call `useGetAllTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamMembersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetAllTeamMembersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >(GetAllTeamMembersDocument, baseOptions);
}
export function useGetAllTeamMembersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >(GetAllTeamMembersDocument, baseOptions);
}
export type GetAllTeamMembersQueryHookResult = ReturnType<
  typeof useGetAllTeamMembersQuery
>;
export type GetAllTeamMembersLazyQueryHookResult = ReturnType<
  typeof useGetAllTeamMembersLazyQuery
>;
export type GetAllTeamMembersQueryResult = ApolloReactCommon.QueryResult<
  GetAllTeamMembersQuery,
  GetAllTeamMembersQueryVariables
>;
export const GetAllTeamsForUserDocument = gql`
  query GetAllTeamsForUser {
    getAllTeamsForUser {
      id
      name
      members {
        id
        firstName
      }
      userToTeams {
        userToTeamId
        teamRoleAuthorizations
      }
      channels {
        id
        name
        last_message
        invitees {
          id
          name
        }
      }
    }
  }
`;
export type GetAllTeamsForUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >,
  "query"
>;

export const GetAllTeamsForUserComponent = (
  props: GetAllTeamsForUserComponentProps
) => (
  <ApolloReactComponents.Query<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >
    query={GetAllTeamsForUserDocument}
    {...props}
  />
);

export type GetAllTeamsForUserProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      GetAllTeamsForUserQuery,
      GetAllTeamsForUserQueryVariables
    >
  | TChildProps;
export function withGetAllTeamsForUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables,
    GetAllTeamsForUserProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables,
    GetAllTeamsForUserProps<TChildProps>
  >(GetAllTeamsForUserDocument, {
    alias: "getAllTeamsForUser",
    ...operationOptions
  });
}

/**
 * __useGetAllTeamsForUserQuery__
 *
 * To run a query within a React component, call `useGetAllTeamsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamsForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTeamsForUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >(GetAllTeamsForUserDocument, baseOptions);
}
export function useGetAllTeamsForUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >(GetAllTeamsForUserDocument, baseOptions);
}
export type GetAllTeamsForUserQueryHookResult = ReturnType<
  typeof useGetAllTeamsForUserQuery
>;
export type GetAllTeamsForUserLazyQueryHookResult = ReturnType<
  typeof useGetAllTeamsForUserLazyQuery
>;
export type GetAllTeamsForUserQueryResult = ApolloReactCommon.QueryResult<
  GetAllTeamsForUserQuery,
  GetAllTeamsForUserQueryVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export type ForgotPasswordComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
  "mutation"
>;

export const ForgotPasswordComponent = (
  props: ForgotPasswordComponentProps
) => (
  <ApolloReactComponents.Mutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
    mutation={ForgotPasswordDocument}
    {...props}
  />
);

export type ForgotPasswordProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      ForgotPasswordMutation,
      ForgotPasswordMutationVariables
    >
  | TChildProps;
export function withForgotPassword<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    ForgotPasswordProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    ForgotPasswordProps<TChildProps>
  >(ForgotPasswordDocument, {
    alias: "forgotPassword",
    ...operationOptions
  });
}

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<
  ForgotPasswordMutation
>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;
export type LogoutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
  "mutation"
>;

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type LogoutProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<LogoutMutation, LogoutMutationVariables>
  | TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: "logout",
    ...operationOptions
  });
}

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const AddProfilePictureDocument = gql`
  mutation AddProfilePicture($data: UploadProfilePictureInput!) {
    addProfilePicture(data: $data) {
      message
      profileImgUrl
    }
  }
`;
export type AddProfilePictureMutationFn = ApolloReactCommon.MutationFunction<
  AddProfilePictureMutation,
  AddProfilePictureMutationVariables
>;
export type AddProfilePictureComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables
  >,
  "mutation"
>;

export const AddProfilePictureComponent = (
  props: AddProfilePictureComponentProps
) => (
  <ApolloReactComponents.Mutation<
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables
  >
    mutation={AddProfilePictureDocument}
    {...props}
  />
);

export type AddProfilePictureProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      AddProfilePictureMutation,
      AddProfilePictureMutationVariables
    >
  | TChildProps;
export function withAddProfilePicture<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables,
    AddProfilePictureProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables,
    AddProfilePictureProps<TChildProps>
  >(AddProfilePictureDocument, {
    alias: "addProfilePicture",
    ...operationOptions
  });
}

/**
 * __useAddProfilePictureMutation__
 *
 * To run a mutation, you first call `useAddProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfilePictureMutation, { data, loading, error }] = useAddProfilePictureMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddProfilePictureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables
  >(AddProfilePictureDocument, baseOptions);
}
export type AddProfilePictureMutationHookResult = ReturnType<
  typeof useAddProfilePictureMutation
>;
export type AddProfilePictureMutationResult = ApolloReactCommon.MutationResult<
  AddProfilePictureMutation
>;
export type AddProfilePictureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddProfilePictureMutation,
  AddProfilePictureMutationVariables
>;
export const AdminEditUserInfoDocument = gql`
  mutation AdminEditUserInfo($data: EditUserInput!) {
    adminEditUserInfo(data: $data) {
      id
      name
      email
      userToTeams {
        userToTeamId
        teamRoleAuthorizations
        teamId
        userId
      }
    }
  }
`;
export type AdminEditUserInfoMutationFn = ApolloReactCommon.MutationFunction<
  AdminEditUserInfoMutation,
  AdminEditUserInfoMutationVariables
>;
export type AdminEditUserInfoComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AdminEditUserInfoMutation,
    AdminEditUserInfoMutationVariables
  >,
  "mutation"
>;

export const AdminEditUserInfoComponent = (
  props: AdminEditUserInfoComponentProps
) => (
  <ApolloReactComponents.Mutation<
    AdminEditUserInfoMutation,
    AdminEditUserInfoMutationVariables
  >
    mutation={AdminEditUserInfoDocument}
    {...props}
  />
);

export type AdminEditUserInfoProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      AdminEditUserInfoMutation,
      AdminEditUserInfoMutationVariables
    >
  | TChildProps;
export function withAdminEditUserInfo<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AdminEditUserInfoMutation,
    AdminEditUserInfoMutationVariables,
    AdminEditUserInfoProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AdminEditUserInfoMutation,
    AdminEditUserInfoMutationVariables,
    AdminEditUserInfoProps<TChildProps>
  >(AdminEditUserInfoDocument, {
    alias: "adminEditUserInfo",
    ...operationOptions
  });
}

/**
 * __useAdminEditUserInfoMutation__
 *
 * To run a mutation, you first call `useAdminEditUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminEditUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminEditUserInfoMutation, { data, loading, error }] = useAdminEditUserInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminEditUserInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AdminEditUserInfoMutation,
    AdminEditUserInfoMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AdminEditUserInfoMutation,
    AdminEditUserInfoMutationVariables
  >(AdminEditUserInfoDocument, baseOptions);
}
export type AdminEditUserInfoMutationHookResult = ReturnType<
  typeof useAdminEditUserInfoMutation
>;
export type AdminEditUserInfoMutationResult = ApolloReactCommon.MutationResult<
  AdminEditUserInfoMutation
>;
export type AdminEditUserInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AdminEditUserInfoMutation,
  AdminEditUserInfoMutationVariables
>;
export const ChangePasswordFromContextUseridDocument = gql`
  mutation ChangePasswordFromContextUserid($data: PasswordInput!) {
    changePasswordFromContextUserid(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
export type ChangePasswordFromContextUseridMutationFn = ApolloReactCommon.MutationFunction<
  ChangePasswordFromContextUseridMutation,
  ChangePasswordFromContextUseridMutationVariables
>;
export type ChangePasswordFromContextUseridComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables
  >,
  "mutation"
>;

export const ChangePasswordFromContextUseridComponent = (
  props: ChangePasswordFromContextUseridComponentProps
) => (
  <ApolloReactComponents.Mutation<
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables
  >
    mutation={ChangePasswordFromContextUseridDocument}
    {...props}
  />
);

export type ChangePasswordFromContextUseridProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      ChangePasswordFromContextUseridMutation,
      ChangePasswordFromContextUseridMutationVariables
    >
  | TChildProps;
export function withChangePasswordFromContextUserid<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables,
    ChangePasswordFromContextUseridProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables,
    ChangePasswordFromContextUseridProps<TChildProps>
  >(ChangePasswordFromContextUseridDocument, {
    alias: "changePasswordFromContextUserid",
    ...operationOptions
  });
}

/**
 * __useChangePasswordFromContextUseridMutation__
 *
 * To run a mutation, you first call `useChangePasswordFromContextUseridMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordFromContextUseridMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordFromContextUseridMutation, { data, loading, error }] = useChangePasswordFromContextUseridMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordFromContextUseridMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables
  >(ChangePasswordFromContextUseridDocument, baseOptions);
}
export type ChangePasswordFromContextUseridMutationHookResult = ReturnType<
  typeof useChangePasswordFromContextUseridMutation
>;
export type ChangePasswordFromContextUseridMutationResult = ApolloReactCommon.MutationResult<
  ChangePasswordFromContextUseridMutation
>;
export type ChangePasswordFromContextUseridMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangePasswordFromContextUseridMutation,
  ChangePasswordFromContextUseridMutationVariables
>;
export const ChangePasswordFromTokenDocument = gql`
  mutation ChangePasswordFromToken($data: ChangePasswordInput!) {
    changePasswordFromToken(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
export type ChangePasswordFromTokenMutationFn = ApolloReactCommon.MutationFunction<
  ChangePasswordFromTokenMutation,
  ChangePasswordFromTokenMutationVariables
>;
export type ChangePasswordFromTokenComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ChangePasswordFromTokenMutation,
    ChangePasswordFromTokenMutationVariables
  >,
  "mutation"
>;

export const ChangePasswordFromTokenComponent = (
  props: ChangePasswordFromTokenComponentProps
) => (
  <ApolloReactComponents.Mutation<
    ChangePasswordFromTokenMutation,
    ChangePasswordFromTokenMutationVariables
  >
    mutation={ChangePasswordFromTokenDocument}
    {...props}
  />
);

export type ChangePasswordFromTokenProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      ChangePasswordFromTokenMutation,
      ChangePasswordFromTokenMutationVariables
    >
  | TChildProps;
export function withChangePasswordFromToken<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ChangePasswordFromTokenMutation,
    ChangePasswordFromTokenMutationVariables,
    ChangePasswordFromTokenProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ChangePasswordFromTokenMutation,
    ChangePasswordFromTokenMutationVariables,
    ChangePasswordFromTokenProps<TChildProps>
  >(ChangePasswordFromTokenDocument, {
    alias: "changePasswordFromToken",
    ...operationOptions
  });
}

/**
 * __useChangePasswordFromTokenMutation__
 *
 * To run a mutation, you first call `useChangePasswordFromTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordFromTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordFromTokenMutation, { data, loading, error }] = useChangePasswordFromTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordFromTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangePasswordFromTokenMutation,
    ChangePasswordFromTokenMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangePasswordFromTokenMutation,
    ChangePasswordFromTokenMutationVariables
  >(ChangePasswordFromTokenDocument, baseOptions);
}
export type ChangePasswordFromTokenMutationHookResult = ReturnType<
  typeof useChangePasswordFromTokenMutation
>;
export type ChangePasswordFromTokenMutationResult = ApolloReactCommon.MutationResult<
  ChangePasswordFromTokenMutation
>;
export type ChangePasswordFromTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangePasswordFromTokenMutation,
  ChangePasswordFromTokenMutationVariables
>;
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
export type ConfirmUserMutationFn = ApolloReactCommon.MutationFunction<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;
export type ConfirmUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ConfirmUserMutation,
    ConfirmUserMutationVariables
  >,
  "mutation"
>;

export const ConfirmUserComponent = (props: ConfirmUserComponentProps) => (
  <ApolloReactComponents.Mutation<
    ConfirmUserMutation,
    ConfirmUserMutationVariables
  >
    mutation={ConfirmUserDocument}
    {...props}
  />
);

export type ConfirmUserProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      ConfirmUserMutation,
      ConfirmUserMutationVariables
    >
  | TChildProps;
export function withConfirmUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ConfirmUserMutation,
    ConfirmUserMutationVariables,
    ConfirmUserProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ConfirmUserMutation,
    ConfirmUserMutationVariables,
    ConfirmUserProps<TChildProps>
  >(ConfirmUserDocument, {
    alias: "confirmUser",
    ...operationOptions
  });
}

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ConfirmUserMutation,
    ConfirmUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ConfirmUserMutation,
    ConfirmUserMutationVariables
  >(ConfirmUserDocument, baseOptions);
}
export type ConfirmUserMutationHookResult = ReturnType<
  typeof useConfirmUserMutation
>;
export type ConfirmUserMutationResult = ApolloReactCommon.MutationResult<
  ConfirmUserMutation
>;
export type ConfirmUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;
export const EditUserInfoDocument = gql`
  mutation EditUserInfo($data: EditUserInput!) {
    editUserInfo(data: $data) {
      firstName
      lastName
      email
      name
      id
      profileImageUri
    }
  }
`;
export type EditUserInfoMutationFn = ApolloReactCommon.MutationFunction<
  EditUserInfoMutation,
  EditUserInfoMutationVariables
>;
export type EditUserInfoComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    EditUserInfoMutation,
    EditUserInfoMutationVariables
  >,
  "mutation"
>;

export const EditUserInfoComponent = (props: EditUserInfoComponentProps) => (
  <ApolloReactComponents.Mutation<
    EditUserInfoMutation,
    EditUserInfoMutationVariables
  >
    mutation={EditUserInfoDocument}
    {...props}
  />
);

export type EditUserInfoProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      EditUserInfoMutation,
      EditUserInfoMutationVariables
    >
  | TChildProps;
export function withEditUserInfo<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    EditUserInfoMutation,
    EditUserInfoMutationVariables,
    EditUserInfoProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    EditUserInfoMutation,
    EditUserInfoMutationVariables,
    EditUserInfoProps<TChildProps>
  >(EditUserInfoDocument, {
    alias: "editUserInfo",
    ...operationOptions
  });
}

/**
 * __useEditUserInfoMutation__
 *
 * To run a mutation, you first call `useEditUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserInfoMutation, { data, loading, error }] = useEditUserInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditUserInfoMutation,
    EditUserInfoMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    EditUserInfoMutation,
    EditUserInfoMutationVariables
  >(EditUserInfoDocument, baseOptions);
}
export type EditUserInfoMutationHookResult = ReturnType<
  typeof useEditUserInfoMutation
>;
export type EditUserInfoMutationResult = ApolloReactCommon.MutationResult<
  EditUserInfoMutation
>;
export type EditUserInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditUserInfoMutation,
  EditUserInfoMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      name
      profileImageUri
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LoginMutation,
    LoginMutationVariables
  >,
  "mutation"
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables>
  | TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: "login",
    ...operationOptions
  });
}

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;
export type RegisterComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
  "mutation"
>;

export const RegisterComponent = (props: RegisterComponentProps) => (
  <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
);

export type RegisterProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables>
  | TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: "register",
    ...operationOptions
  });
}

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const MeDocument = gql`
  query me {
    me {
      firstName
      lastName
      email
      name
      id
      profileImageUri
    }
  }
`;
export type MeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>,
  "query"
>;

export const MeComponent = (props: MeComponentProps) => (
  <ApolloReactComponents.Query<MeQuery, MeQueryVariables>
    query={MeDocument}
    {...props}
  />
);

export type MeProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<MeQuery, MeQueryVariables>
  | TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, {
    alias: "me",
    ...operationOptions
  });
}

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>;
export const HelloWorldDocument = gql`
  query HelloWorld {
    helloWorld
  }
`;
export type HelloWorldComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    HelloWorldQuery,
    HelloWorldQueryVariables
  >,
  "query"
>;

export const HelloWorldComponent = (props: HelloWorldComponentProps) => (
  <ApolloReactComponents.Query<HelloWorldQuery, HelloWorldQueryVariables>
    query={HelloWorldDocument}
    {...props}
  />
);

export type HelloWorldProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<HelloWorldQuery, HelloWorldQueryVariables>
  | TChildProps;
export function withHelloWorld<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    HelloWorldQuery,
    HelloWorldQueryVariables,
    HelloWorldProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    HelloWorldQuery,
    HelloWorldQueryVariables,
    HelloWorldProps<TChildProps>
  >(HelloWorldDocument, {
    alias: "helloWorld",
    ...operationOptions
  });
}

/**
 * __useHelloWorldQuery__
 *
 * To run a query within a React component, call `useHelloWorldQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloWorldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloWorldQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloWorldQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    HelloWorldQuery,
    HelloWorldQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<HelloWorldQuery, HelloWorldQueryVariables>(
    HelloWorldDocument,
    baseOptions
  );
}
export function useHelloWorldLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HelloWorldQuery,
    HelloWorldQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    HelloWorldQuery,
    HelloWorldQueryVariables
  >(HelloWorldDocument, baseOptions);
}
export type HelloWorldQueryHookResult = ReturnType<typeof useHelloWorldQuery>;
export type HelloWorldLazyQueryHookResult = ReturnType<
  typeof useHelloWorldLazyQuery
>;
export type HelloWorldQueryResult = ApolloReactCommon.QueryResult<
  HelloWorldQuery,
  HelloWorldQueryVariables
>;
