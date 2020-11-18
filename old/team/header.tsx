import styled from "styled-components";

import { Flex, Heading } from "../../modules/primitives/styled-rebass";

interface HeaderProps {
  channelName: string;
  channelId: string;
}

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  min-height: 65px;
  background-color: #eee;
`;

const Header: React.FunctionComponent<HeaderProps> = ({
  // channelId,
  channelName,
}) => {
  return (
    <HeaderWrapper>
      <Flex justifyContent="center">
        <Heading pt={2} as="h1" fontFamily="main">{`# ${channelName}`}</Heading>
      </Flex>
    </HeaderWrapper>
  );
};

export default Header;
