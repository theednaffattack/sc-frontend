import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface IStyledLinkProps {
  shade?: string | undefined;
}

interface MyLinkProps {
  href: string;
  name: string;
  shade?: string | undefined;
}

const StyledLink = styled.a<IStyledLinkProps>`
  text-decoration: none;
  color: ${(props: any) =>
    props.shade === "dark" ? props.theme.colors.text : "white"};
  :hover {
    color: crimson;
  }
`;

const MyLink: React.FunctionComponent<MyLinkProps> = ({
  href,
  name,
  shade
  // theme
}) => (
  <Link href={href} passHref>
    <StyledLink shade={shade ? shade : undefined}>{name}</StyledLink>
  </Link>
);

export default MyLink;
