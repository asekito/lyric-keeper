import styled from 'styled-components';
import { SemiLightGreen, PrimaryBlue, SecondaryColor } from '../ColorVars.js';

export const CardWrapper = styled.div`
  width: 25%;
  min-height 40px;
  background-color: ${SemiLightGreen};
  margin: auto;
  padding: 8px;
  margin-top: 15px;
  border-radius: 6px;
`;

export const CardTitle = styled.div`
  font-size: 2em;
  font-weight: 400;
  vertical-align: super;
  color: white;
  display: inline;
`;

export const CardAuthor = styled.div`
  font-size: 2em;
  vertical-align: super;
  font-weight: 700;
  color: ${PrimaryBlue};
  display: inline;
`;

export const TitleAuthorDivider = styled.div`
  font-size: 2em;
  font-weight: 900;
  vertical-align: super;
  color: ${SecondaryColor};
  display: inline;
  margin: auto 20px;
`;
