import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type ChangePasswordInput = {
  password: Scalars['String'],
  token: Scalars['String'],
};


export type EditUserInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
};

export type GetAllMyMessagesInput = {
  user: Scalars['String'],
};

export type GetMessagesFromUserInput = {
  sentBy: Scalars['String'],
  user: Scalars['String'],
};

export type Image = {
   __typename?: 'Image',
  id: Scalars['ID'],
  uri: Scalars['String'],
  message?: Maybe<Message>,
  user: User,
};

export type ImageSubInput = {
  filename: Scalars['String'],
  filetype: Scalars['String'],
};

export type Message = {
   __typename?: 'Message',
  id: Scalars['ID'],
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
  message: Scalars['String'],
  images?: Maybe<Array<Maybe<Image>>>,
  sentBy: User,
  user: User,
};

export type MessageOutput = {
   __typename?: 'MessageOutput',
  message: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createProduct: Product,
  createUser: User,
  changePassword?: Maybe<User>,
  confirmUser: Scalars['Boolean'],
  forgotPassword: Scalars['Boolean'],
  login?: Maybe<User>,
  logout: Scalars['Boolean'],
  register: User,
  addProfilePicture: UploadProfilePictueReturnType,
  editUserInfo: User,
  signS3: SignedS3Payload,
};


export type MutationCreateProductArgs = {
  data: ProductInput
};


export type MutationCreateUserArgs = {
  data: RegisterInput
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  data: RegisterInput
};


export type MutationAddProfilePictureArgs = {
  data: UploadProfilePictureInput
};


export type MutationEditUserInfoArgs = {
  data: EditUserInput
};


export type MutationSignS3Args = {
  files: Array<ImageSubInput>
};

export type PasswordInput = {
  password: Scalars['String'],
};

export type Product = {
   __typename?: 'Product',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type ProductInput = {
  name: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  helloWorld: Scalars['String'],
  getAllMyMessages?: Maybe<User>,
  getListToCreateThread?: Maybe<TransUserReturn>,
  getMyMessagesFromUser?: Maybe<Array<Message>>,
};


export type QueryGetMyMessagesFromUserArgs = {
  input: GetMessagesFromUserInput
};

export type RegisterInput = {
  password: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
};

export type SignedS3Payload = {
   __typename?: 'SignedS3Payload',
  signatures: Array<SignedS3SubPayload>,
};

export type SignedS3SubPayload = {
   __typename?: 'SignedS3SubPayload',
  url: Scalars['String'],
  signedRequest: Scalars['String'],
};

export type TransUserReturn = {
   __typename?: 'TransUserReturn',
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  thoseICanMessage?: Maybe<Array<User>>,
};

export type UploadProfilePictueReturnType = {
   __typename?: 'UploadProfilePictueReturnType',
  message: Scalars['String'],
  profileImgUrl: Scalars['String'],
};

export type UploadProfilePictureInput = {
  user: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  images?: Maybe<Array<Maybe<Image>>>,
  mappedMessages: Array<Message>,
  followers?: Maybe<Array<Maybe<User>>>,
  following?: Maybe<Array<Maybe<User>>>,
  profileImageUri?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  messages?: Maybe<Array<Message>>,
  sent_messages?: Maybe<Array<Message>>,
};

export type SignS3MutationVariables = {
  files: Array<ImageSubInput>
};


export type SignS3Mutation = (
  { __typename?: 'Mutation' }
  & { signS3: (
    { __typename?: 'SignedS3Payload' }
    & { signatures: Array<(
      { __typename?: 'SignedS3SubPayload' }
      & Pick<SignedS3SubPayload, 'url' | 'signedRequest'>
    )> }
  ) }
);

export type GetAllMyMessagesQueryVariables = {};


export type GetAllMyMessagesQuery = (
  { __typename?: 'Query' }
  & { getAllMyMessages: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
    & { mappedMessages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'created_at' | 'updated_at' | 'message'>
      & { sentBy: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ), user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ) }
    )> }
  )> }
);

export type GetListToCreateThreadQueryVariables = {};


export type GetListToCreateThreadQuery = (
  { __typename?: 'Query' }
  & { getListToCreateThread: Maybe<(
    { __typename?: 'TransUserReturn' }
    & Pick<TransUserReturn, 'id' | 'firstName'>
    & { thoseICanMessage: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )>> }
  )> }
);

export type GetMyMessagesFromUserQueryVariables = {
  input: GetMessagesFromUserInput
};


export type GetMyMessagesFromUserQuery = (
  { __typename?: 'Query' }
  & { getMyMessagesFromUser: Maybe<Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'message' | 'created_at'>
    & { sentBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ) }
  )>> }
);

export type ChangePasswordMutationVariables = {
  data: ChangePasswordInput
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
  )> }
);

export type ForgotPasswordMutationVariables = {
  email: Scalars['String']
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type AddProfilePictureMutationVariables = {
  data: UploadProfilePictureInput
};


export type AddProfilePictureMutation = (
  { __typename?: 'Mutation' }
  & { addProfilePicture: (
    { __typename?: 'UploadProfilePictueReturnType' }
    & Pick<UploadProfilePictueReturnType, 'message' | 'profileImgUrl'>
  ) }
);

export type ConfirmUserMutationVariables = {
  token: Scalars['String']
};


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type EditUserInfoMutationVariables = {
  data: EditUserInput
};


export type EditUserInfoMutation = (
  { __typename?: 'Mutation' }
  & { editUserInfo: (
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'email' | 'name' | 'id' | 'profileImageUri'>
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name' | 'profileImageUri'>
  )> }
);

export type RegisterMutationVariables = {
  data: RegisterInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'email' | 'name' | 'id' | 'profileImageUri'>
  )> }
);

export type HelloWorldQueryVariables = {};


export type HelloWorldQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'helloWorld'>
);


export const SignS3Document = gql`
    mutation SignS3($files: [ImageSubInput!]!) {
  signS3(files: $files) {
    signatures {
      url
      signedRequest
    }
  }
}
    `;
export type SignS3MutationFn = ApolloReactCommon.MutationFunction<SignS3Mutation, SignS3MutationVariables>;
export type SignS3ComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignS3Mutation, SignS3MutationVariables>, 'mutation'>;

    export const SignS3Component = (props: SignS3ComponentProps) => (
      <ApolloReactComponents.Mutation<SignS3Mutation, SignS3MutationVariables> mutation={SignS3Document} {...props} />
    );
    
export type SignS3Props<TChildProps = {}> = ApolloReactHoc.MutateProps<SignS3Mutation, SignS3MutationVariables> | TChildProps;
export function withSignS3<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignS3Mutation,
  SignS3MutationVariables,
  SignS3Props<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SignS3Mutation, SignS3MutationVariables, SignS3Props<TChildProps>>(SignS3Document, {
      alias: 'signS3',
      ...operationOptions
    });
};

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
 *   },
 * });
 */
export function useSignS3Mutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignS3Mutation, SignS3MutationVariables>) {
        return ApolloReactHooks.useMutation<SignS3Mutation, SignS3MutationVariables>(SignS3Document, baseOptions);
      }
export type SignS3MutationHookResult = ReturnType<typeof useSignS3Mutation>;
export type SignS3MutationResult = ApolloReactCommon.MutationResult<SignS3Mutation>;
export type SignS3MutationOptions = ApolloReactCommon.BaseMutationOptions<SignS3Mutation, SignS3MutationVariables>;
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
export type GetAllMyMessagesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>, 'query'>;

    export const GetAllMyMessagesComponent = (props: GetAllMyMessagesComponentProps) => (
      <ApolloReactComponents.Query<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables> query={GetAllMyMessagesDocument} {...props} />
    );
    
export type GetAllMyMessagesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables> | TChildProps;
export function withGetAllMyMessages<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllMyMessagesQuery,
  GetAllMyMessagesQueryVariables,
  GetAllMyMessagesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables, GetAllMyMessagesProps<TChildProps>>(GetAllMyMessagesDocument, {
      alias: 'getAllMyMessages',
      ...operationOptions
    });
};

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
export function useGetAllMyMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>(GetAllMyMessagesDocument, baseOptions);
      }
export function useGetAllMyMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>(GetAllMyMessagesDocument, baseOptions);
        }
export type GetAllMyMessagesQueryHookResult = ReturnType<typeof useGetAllMyMessagesQuery>;
export type GetAllMyMessagesLazyQueryHookResult = ReturnType<typeof useGetAllMyMessagesLazyQuery>;
export type GetAllMyMessagesQueryResult = ApolloReactCommon.QueryResult<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>;
export const GetListToCreateThreadDocument = gql`
    query GetListToCreateThread {
  getListToCreateThread {
    id
    firstName
    thoseICanMessage {
      id
      firstName
      lastName
    }
  }
}
    `;
export type GetListToCreateThreadComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>, 'query'>;

    export const GetListToCreateThreadComponent = (props: GetListToCreateThreadComponentProps) => (
      <ApolloReactComponents.Query<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables> query={GetListToCreateThreadDocument} {...props} />
    );
    
export type GetListToCreateThreadProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables> | TChildProps;
export function withGetListToCreateThread<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetListToCreateThreadQuery,
  GetListToCreateThreadQueryVariables,
  GetListToCreateThreadProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables, GetListToCreateThreadProps<TChildProps>>(GetListToCreateThreadDocument, {
      alias: 'getListToCreateThread',
      ...operationOptions
    });
};

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
 *   },
 * });
 */
export function useGetListToCreateThreadQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>) {
        return ApolloReactHooks.useQuery<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>(GetListToCreateThreadDocument, baseOptions);
      }
export function useGetListToCreateThreadLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>(GetListToCreateThreadDocument, baseOptions);
        }
export type GetListToCreateThreadQueryHookResult = ReturnType<typeof useGetListToCreateThreadQuery>;
export type GetListToCreateThreadLazyQueryHookResult = ReturnType<typeof useGetListToCreateThreadLazyQuery>;
export type GetListToCreateThreadQueryResult = ApolloReactCommon.QueryResult<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>;
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
export type GetMyMessagesFromUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>, 'query'> & ({ variables: GetMyMessagesFromUserQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetMyMessagesFromUserComponent = (props: GetMyMessagesFromUserComponentProps) => (
      <ApolloReactComponents.Query<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables> query={GetMyMessagesFromUserDocument} {...props} />
    );
    
export type GetMyMessagesFromUserProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables> | TChildProps;
export function withGetMyMessagesFromUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMyMessagesFromUserQuery,
  GetMyMessagesFromUserQueryVariables,
  GetMyMessagesFromUserProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables, GetMyMessagesFromUserProps<TChildProps>>(GetMyMessagesFromUserDocument, {
      alias: 'getMyMessagesFromUser',
      ...operationOptions
    });
};

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
export function useGetMyMessagesFromUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>(GetMyMessagesFromUserDocument, baseOptions);
      }
export function useGetMyMessagesFromUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>(GetMyMessagesFromUserDocument, baseOptions);
        }
export type GetMyMessagesFromUserQueryHookResult = ReturnType<typeof useGetMyMessagesFromUserQuery>;
export type GetMyMessagesFromUserLazyQueryHookResult = ReturnType<typeof useGetMyMessagesFromUserLazyQuery>;
export type GetMyMessagesFromUserQueryResult = ApolloReactCommon.QueryResult<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    id
    firstName
    lastName
    email
    name
  }
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;
export type ChangePasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ChangePasswordMutation, ChangePasswordMutationVariables>, 'mutation'>;

    export const ChangePasswordComponent = (props: ChangePasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables> mutation={ChangePasswordDocument} {...props} />
    );
    
export type ChangePasswordProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ChangePasswordMutation, ChangePasswordMutationVariables> | TChildProps;
export function withChangePassword<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  ChangePasswordProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ChangePasswordMutation, ChangePasswordMutationVariables, ChangePasswordProps<TChildProps>>(ChangePasswordDocument, {
      alias: 'changePassword',
      ...operationOptions
    });
};

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export type ForgotPasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>, 'mutation'>;

    export const ForgotPasswordComponent = (props: ForgotPasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> mutation={ForgotPasswordDocument} {...props} />
    );
    
export type ForgotPasswordProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ForgotPasswordMutation, ForgotPasswordMutationVariables> | TChildProps;
export function withForgotPassword<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  ForgotPasswordProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ForgotPasswordMutation, ForgotPasswordMutationVariables, ForgotPasswordProps<TChildProps>>(ForgotPasswordDocument, {
      alias: 'forgotPassword',
      ...operationOptions
    });
};

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
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    
export type LogoutProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LogoutMutation, LogoutMutationVariables> | TChildProps;
export function withLogout<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutation, LogoutMutationVariables, LogoutProps<TChildProps>>(LogoutDocument, {
      alias: 'logout',
      ...operationOptions
    });
};

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
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const AddProfilePictureDocument = gql`
    mutation AddProfilePicture($data: UploadProfilePictureInput!) {
  addProfilePicture(data: $data) {
    message
    profileImgUrl
  }
}
    `;
export type AddProfilePictureMutationFn = ApolloReactCommon.MutationFunction<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
export type AddProfilePictureComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>, 'mutation'>;

    export const AddProfilePictureComponent = (props: AddProfilePictureComponentProps) => (
      <ApolloReactComponents.Mutation<AddProfilePictureMutation, AddProfilePictureMutationVariables> mutation={AddProfilePictureDocument} {...props} />
    );
    
export type AddProfilePictureProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddProfilePictureMutation, AddProfilePictureMutationVariables> | TChildProps;
export function withAddProfilePicture<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddProfilePictureMutation,
  AddProfilePictureMutationVariables,
  AddProfilePictureProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddProfilePictureMutation, AddProfilePictureMutationVariables, AddProfilePictureProps<TChildProps>>(AddProfilePictureDocument, {
      alias: 'addProfilePicture',
      ...operationOptions
    });
};

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
export function useAddProfilePictureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>) {
        return ApolloReactHooks.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument, baseOptions);
      }
export type AddProfilePictureMutationHookResult = ReturnType<typeof useAddProfilePictureMutation>;
export type AddProfilePictureMutationResult = ApolloReactCommon.MutationResult<AddProfilePictureMutation>;
export type AddProfilePictureMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = ApolloReactCommon.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;
export type ConfirmUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ConfirmUserMutation, ConfirmUserMutationVariables>, 'mutation'>;

    export const ConfirmUserComponent = (props: ConfirmUserComponentProps) => (
      <ApolloReactComponents.Mutation<ConfirmUserMutation, ConfirmUserMutationVariables> mutation={ConfirmUserDocument} {...props} />
    );
    
export type ConfirmUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ConfirmUserMutation, ConfirmUserMutationVariables> | TChildProps;
export function withConfirmUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ConfirmUserMutation,
  ConfirmUserMutationVariables,
  ConfirmUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ConfirmUserMutation, ConfirmUserMutationVariables, ConfirmUserProps<TChildProps>>(ConfirmUserDocument, {
      alias: 'confirmUser',
      ...operationOptions
    });
};

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
export function useConfirmUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        return ApolloReactHooks.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = ApolloReactCommon.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
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
export type EditUserInfoMutationFn = ApolloReactCommon.MutationFunction<EditUserInfoMutation, EditUserInfoMutationVariables>;
export type EditUserInfoComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EditUserInfoMutation, EditUserInfoMutationVariables>, 'mutation'>;

    export const EditUserInfoComponent = (props: EditUserInfoComponentProps) => (
      <ApolloReactComponents.Mutation<EditUserInfoMutation, EditUserInfoMutationVariables> mutation={EditUserInfoDocument} {...props} />
    );
    
export type EditUserInfoProps<TChildProps = {}> = ApolloReactHoc.MutateProps<EditUserInfoMutation, EditUserInfoMutationVariables> | TChildProps;
export function withEditUserInfo<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditUserInfoMutation,
  EditUserInfoMutationVariables,
  EditUserInfoProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, EditUserInfoMutation, EditUserInfoMutationVariables, EditUserInfoProps<TChildProps>>(EditUserInfoDocument, {
      alias: 'editUserInfo',
      ...operationOptions
    });
};

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
export function useEditUserInfoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditUserInfoMutation, EditUserInfoMutationVariables>) {
        return ApolloReactHooks.useMutation<EditUserInfoMutation, EditUserInfoMutationVariables>(EditUserInfoDocument, baseOptions);
      }
export type EditUserInfoMutationHookResult = ReturnType<typeof useEditUserInfoMutation>;
export type EditUserInfoMutationResult = ApolloReactCommon.MutationResult<EditUserInfoMutation>;
export type EditUserInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<EditUserInfoMutation, EditUserInfoMutationVariables>;
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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> | TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    
export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables> | TChildProps;
export function withRegister<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};

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
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> | TChildProps;
export function withMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const HelloWorldDocument = gql`
    query HelloWorld {
  helloWorld
}
    `;
export type HelloWorldComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<HelloWorldQuery, HelloWorldQueryVariables>, 'query'>;

    export const HelloWorldComponent = (props: HelloWorldComponentProps) => (
      <ApolloReactComponents.Query<HelloWorldQuery, HelloWorldQueryVariables> query={HelloWorldDocument} {...props} />
    );
    
export type HelloWorldProps<TChildProps = {}> = ApolloReactHoc.DataProps<HelloWorldQuery, HelloWorldQueryVariables> | TChildProps;
export function withHelloWorld<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  HelloWorldQuery,
  HelloWorldQueryVariables,
  HelloWorldProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, HelloWorldQuery, HelloWorldQueryVariables, HelloWorldProps<TChildProps>>(HelloWorldDocument, {
      alias: 'helloWorld',
      ...operationOptions
    });
};

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
export function useHelloWorldQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, baseOptions);
      }
export function useHelloWorldLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, baseOptions);
        }
export type HelloWorldQueryHookResult = ReturnType<typeof useHelloWorldQuery>;
export type HelloWorldLazyQueryHookResult = ReturnType<typeof useHelloWorldLazyQuery>;
export type HelloWorldQueryResult = ApolloReactCommon.QueryResult<HelloWorldQuery, HelloWorldQueryVariables>;