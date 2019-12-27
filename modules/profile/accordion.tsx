import React from "react";
import { useState } from "react";
import styled from "styled-components";

import { Button, Flex, Text } from "../primitives/styled-rebass";
import Icon from "../icon/m-icon";
import { isBrowser } from "../../lib/isBrowser";
import { MeQueryResult } from "../../modules/gql-gen/generated/apollo-graphql";

interface AccordionProps {
  dataMe: MeQueryResult["data"];
}

interface PanelProps {
  open: boolean;
}

interface PanelHeadingProps extends PanelProps {}

const Panel = styled.div<PanelProps>`
  max-height: ${props => (props.open ? "100%" : "0")};
  overflow: hidden;
  padding: ${props => (props.open ? "25px 0" : "0")};
  opacity: ${props => (props.open ? "25px 0" : "0")};
  transition: all 0.3s ease-out;
  /* border: 2px limegreen dashed; */
`;

const PanelHeadingBase = styled.h2<PanelHeadingProps>`
  color: ${props => props.theme.colors};
  /* border: 2px pink dashed; */
  margin-top: 0;
  margin-bottom: 0;
`;

const PanelHeading: React.FunctionComponent<PanelHeadingProps> = ({
  children,
  open
}) => {
  return <PanelHeadingBase open={open}>{children}</PanelHeadingBase>;
};

interface PanelHeadingWrapperProps {}

const PanelHeadingWrapper: React.FunctionComponent<PanelHeadingWrapperProps> = ({
  children
}) => {
  return <Flex alignItems="center">{children}</Flex>;
};

const Accordion: React.FunctionComponent<AccordionProps> = ({ dataMe }) => {
  const initialState = 0;
  const [panelIdxOpen, setPanelIdxOpen] = useState<number>(initialState);
  return (
    <Flex flexDirection="column" data-aria-accordion>
      <PanelHeadingWrapper>
        <Button
          bg="transparent"
          onClick={() => {
            if (panelIdxOpen === 0) {
              setPanelIdxOpen(-1);
            } else {
              setPanelIdxOpen(0);
            }
          }}
        >
          <Icon
            name="keyboard_arrow_down"
            size="36px"
            fill="#ccc"
            setTranslation={panelIdxOpen === 0 ? `rotate(0)` : `rotate(-90)`}
          />
        </Button>
        <PanelHeading open={panelIdxOpen === 0}>Personal Info</PanelHeading>
      </PanelHeadingWrapper>

      <Panel open={panelIdxOpen === 0} data-aria-accordion-panel>
        <Text>{dataMe && dataMe.me ? dataMe.me.firstName : ""}</Text>
        <Text>{dataMe && dataMe.me ? dataMe.me.lastName : ""}</Text>
        <Text>{dataMe && dataMe.me ? dataMe.me.email : ""}</Text>
      </Panel>
      <PanelHeadingWrapper>
        <Button
          bg="transparent"
          onClick={() => {
            if (panelIdxOpen === 1) {
              setPanelIdxOpen(-1);
            } else {
              setPanelIdxOpen(1);
            }
          }}
        >
          <Icon
            name="keyboard_arrow_down"
            size="36px"
            fill="#ccc"
            setTranslation={panelIdxOpen === 1 ? `rotate(0)` : `rotate(-90)`}
          />
        </Button>
        <PanelHeading open={panelIdxOpen === 1}>Account Info</PanelHeading>
      </PanelHeadingWrapper>

      <Panel open={panelIdxOpen === 1} data-aria-accordion-panel>
        <p>Account info goes here</p>
      </Panel>
      <PanelHeadingWrapper>
        <Button
          bg="transparent"
          onClick={() => {
            if (panelIdxOpen === 2) {
              setPanelIdxOpen(-1);
            } else {
              setPanelIdxOpen(2);
            }
          }}
        >
          <Icon
            name="keyboard_arrow_down"
            size="36px"
            fill="#ccc"
            setTranslation={panelIdxOpen === 2 ? `rotate(0)` : `rotate(-90)`}
          />
        </Button>
        <PanelHeading open={panelIdxOpen === 2}>Browser Info</PanelHeading>
      </PanelHeadingWrapper>

      <Panel open={panelIdxOpen === 2} data-aria-accordion-panel>
        <Text>
          <span style={{ backgroundColor: "limegreen" }}>USER-AGENT:</span>{" "}
          {isBrowser ? window.navigator.userAgent : ""}
        </Text>
      </Panel>
    </Flex>
  );
};

export default Accordion;
