import styled from "styled-components";
import { MainGreen, PrimaryBlue, SecondaryColor } from "ColorVars";
import React from "react";
import { UseResponsiveCheck } from "Hooks";

export const PageWrapper = styled.div`
  text-align: center;
  margin: auto;
  white-space: pre;
`;

export const Songtitle = styled.div`
  font-size: 4.5vh;
  font-weight: 500;
  color: ${MainGreen};
`;

export const SongAuthor = styled.div`
  font-size: 3.5vh;
  font-weight: 500;
  margin-bottom: 50px;
  color: ${PrimaryBlue};
`;

export const SongChorus = styled.div`
  text-align: center !important;
  margin: 20px auto;
  font-size: 2.2vh;
  letter-spacing: 0.1vw;
  color: ${SecondaryColor};
  white-space: pre-wrap;
`;

const SongVerse_ = styled.div<{ isMobile: boolean }>`
  text-align: left;
  margin: auto 27vw;
  margin-top: 5px;
  font-size: 2.1vh;
  letter-spacing: 0.1vw;
  white-space: pre-wrap;
  ${({ isMobile }) =>
    isMobile &&
    `
      margin: auto 10px;
    `}
`;

export const SongVerse: React.FC = ({ children }) => {
  const { isMobile } = UseResponsiveCheck();

  return <SongVerse_ isMobile={isMobile}>{children}</SongVerse_>;
};
