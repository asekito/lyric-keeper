import styled from 'styled-components';
import { MainGreen } from '../ColorVars.js';

export const ModalContentWrapper = styled.div`
  text-align: center;
  background-color: white;
  min-width: 65%;
  min-height: 60vh;
  position: absolute;
  margin: auto;
  border-radius: 6px;
  top: 16%;
  left: 20%;
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
  font-size: 27px;
  padding: 14px;
  letter-spacing: 2px;
`;
