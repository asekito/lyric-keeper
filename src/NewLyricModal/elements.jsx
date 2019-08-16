import styled from 'styled-components';
import { MainGren } from '../ColorVars.js';

export const ModalContentWrapper = styled.div`
  text-align: center;
  background-color: white;
  min-width: 600px;
  min-height: 20vh;
  position: absolute;
  margin: auto;
  border: solid ${MainGren} 3px;
  border-radius: 6px;
  top: 34%;
  left: 34%;
`;
