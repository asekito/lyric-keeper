import styled from 'styled-components';
import { MainGreen, PrimaryBlue, SecondaryColor } from '../ColorVars.js';

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
  color: ${PrimaryBlue};
`;

export const SongChorus = styled.div`
  text-align: center;
  margin: 20px auto;
  font-size: 2.2vh;
  letter-spacing: 0.1vw;
  color: ${SecondaryColor};
`;

export const SongVerses = styled.div`
  text-align: left;
  margin: auto 27vw;
  font-size: 2.1vh;
  letter-spacing: 0.1vw;
`;
