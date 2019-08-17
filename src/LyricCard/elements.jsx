import styled from 'styled-components';
import { SemiLightGreen } from '../ColorVars.js';

export const CardWrapper = styled.div`
  width: 50%;
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
  color: white;
`;
