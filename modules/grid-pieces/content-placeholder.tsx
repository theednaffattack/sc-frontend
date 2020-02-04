import React from "react";
import styled from "styled-components";
import {
  borderRadius,
  height,
  BorderRadiusProps,
  HeightProps
} from "styled-system";

import { Box } from "../primitives/styled-rebass";
import { BoxProps } from "rebass";

const randomInt = (min: number, max: number) =>
  Math.round(
    // mix(min, max, Math.random())
    // From: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527820#1527820
    Math.random() * (max - min) + min
  );

const generateParagraphLength = () => randomInt(10, 40);
const generateWordLength = () => randomInt(20, 100);

// Randomly generate some paragraphs of word lengths
const paragraphs = [...Array(40)].map(() => {
  return [...Array(generateParagraphLength())].map(generateWordLength);
});

interface I_WordProps {
  width: string | number;
}

const WordBase = styled.div`
  height: 18px;
  background: white;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 8px;
  margin-right: 8px;
  background: white;
  border-radius: 10px;
`;

const ContentPlaceholderBase = styled.div`
  max-width: 600px;
  margin-top: 100px;
  margin-bottom: 200px;
  padding: 20px;
`;

const HeaderBase = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const ParagraphBase = styled.div`
  margin-bottom: 40px;
`;

type T_SC_WordRebassProps = BorderRadiusProps & BoxProps & HeightProps;

export const SC_Word = styled(Box)<T_SC_WordRebassProps>`
  ${borderRadius}
  ${height}
`;

const Word: React.FC<I_WordProps> = ({ width }) => (
  <WordBase className="word" style={{ width }} />
);

interface I_ParagraphProps {
  /** length values for placeholder blobs */
  words: number[];
}
const Paragraph: React.FC<I_ParagraphProps> = ({ words }) => (
  <ParagraphBase>
    {words.map(width => (
      <Word width={width} />
    ))}
  </ParagraphBase>
);

export const ContentPlaceholder = () => (
  <ContentPlaceholderBase>
    <HeaderBase>
      <Word width={75} />
      <Word width={245} />
      <Word width={120} />
    </HeaderBase>
    {paragraphs.map(words => (
      <Paragraph words={words} />
    ))}
  </ContentPlaceholderBase>
);
