import styled from 'styled-components';
import { MainGreen, PrimaryBlue } from '../ColorVars.js';

export const PageWrapper = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;
`;

export const Songtitle = styled.div`
  font-size: 42px;
  font-weight: 500;
  color: ${MainGreen};
`;

export const SongAuthor = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: ${PrimaryBlue};
`;
