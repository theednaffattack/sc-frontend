import React from "react";
import { useState } from "react";
import Head from "next/head";
import { User } from "modules/gql-gen/generated/apollo-graphql";

interface LayoutProps {
  title?: string;
  // setChannelName: React.Dispatch<React.SetStateAction<string>>;
  // channelName: string;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title = "This is the default title"
}) => {
  const initialChannelNameState = "";
  const initialDirectMessageInviteesState: ({
    __typename?: "User" | undefined;
  } & Pick<User, "id" | "name">)[] = [];

  const [channelName, setChannelName] = useState<string>(
    initialChannelNameState
  );

  const [
    selectedDirectMessageInvitees,
    setSelectedDirectMessageInvitees
  ] = useState<
    ({
      __typename?: "User" | undefined;
    } & Pick<User, "id" | "name">)[]
  >(initialDirectMessageInviteesState);

  let elements: any = React.Children.toArray(children);

  if (elements.length === 1) {
    // console.log("VIEW ELEMENTS.LENGTH === 1 IN LAYOUT", { elements });
    elements = React.cloneElement(elements[0], {
      channelName,
      setChannelName,
      selectedDirectMessageInvitees,
      setSelectedDirectMessageInvitees
    });
    // console.log(
    //   "VIEW ELEMENTS.LENGTH === 1 IN LAYOUT AFTER SETCHANNEL IS ASSIGNED",
    //   { elements }
    // );
  } else if (elements.length > 0) {
    console.log("VIEW ELEMENTS.LENGTH > 0 IN LAYOUT", { elements });

    let lastElement = elements[elements.length - 1];
    elements = [
      React.cloneElement(elements[0], {
        channelName,
        setChannelName,
        selectedDirectMessageInvitees,
        setSelectedDirectMessageInvitees
      })
    ]
      .concat(elements.slice(1, -1))
      .concat(
        React.cloneElement(lastElement, {
          channelName,
          setChannelName,
          selectedDirectMessageInvitees,
          setSelectedDirectMessageInvitees
        })
      );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {elements}
      {/* {children} */}
    </>
  );
};

export const getLayout = (page: any) => {
  return <Layout title={page.props.title}>{page}</Layout>;
};

export default Layout;
