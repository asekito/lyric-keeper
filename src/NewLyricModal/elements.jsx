import styled from 'styled-components';
import { MainGreen } from '../ColorVars.js';

export const ModalContentWrapper = styled.div`
  text-align: center;
  background-color: white;
  min-width: 600px;
  min-height: 20vh;
  position: absolute;
  margin: auto;
  border: solid ${MainGreen} 3px;
  border-radius: 6px;
  top: 16%;
  left: 20%;
  overflow: scroll;
`;

export const TextFieldStyles = styled.div`
  display: block;
`;

export const HeadingWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  background-color: ${MainGreen};
`;

export const HeadingTitle = styled.div`
  font-weight: 700;
  text-align: left;
  color: white;
  font-size: 2.8vh;
  padding: 1.1vw;
  letter-spacing: 2px;
`;
