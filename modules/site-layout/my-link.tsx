import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

interface IStyledLinkProps {
  shade?: string | undefined;
  hover?: boolean;
}

interface MyLinkProps extends SpaceProps {
  href: string;
  name: string;
  shade?: string | undefined;
  hover?: boolean;
}

const StyledLink = styled.a<IStyledLinkProps & SpaceProps>`
  ${space}
  text-decoration: none;
  border-bottom: 2px transparent solid;
  padding-bottom: 8px;

  color: ${(props: any) =>
    props.shade === "dark" ? props.theme.colors.text : "white"};

  :hover {
    color: ${props => (props.hover === false ? "green" : "crimson")};
    border-bottom: ${props =>
      props.hover === false ? "2px transparent solid" : "2px limegreen solid"};
  }
`;

const MyLink: React.FunctionComponent<MyLinkProps> = ({
  children,
  href,
  shade,
  hover,
  ...props
}) => {
  // const initialState = false;
  // const [hovering, setHovering] = useState<boolean>(initialState);
  return (
    <Link href={href} passHref>
      <StyledLink {...props} hover={hover} shade={shade ? shade : undefined}>
        {children}
      </StyledLink>
    </Link>
  );
};

export default MyLink;
