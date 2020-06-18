import styled from "styled-components";
import { MainGreen, PrimaryBlue, SecondaryColor } from "ColorVars";

export const PageWrapper = styled.div`
  text-align: center;
  margin: auto;
  white-space: pre;
  margin-bottom: 60px;
`;

export const Songtitle = styled.div`
  font-size: 4.5vh;
  font-weight: 500;
  color: ${MainGreen};
  margin-top: 40px;
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

export const SongVerse = styled.div`
  text-align: center;
  margin: auto 4vw auto;
  margin-top: 5px;
  font-size: 2.1vh;
  letter-spacing: 0.1vw;
  white-space: pre-wrap;
`;

export const StyledErrorMessage = styled.h1`
  color: red;
  text-align: center;
  margin-top: 20%;
`;
