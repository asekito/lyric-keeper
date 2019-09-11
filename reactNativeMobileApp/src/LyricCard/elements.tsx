import styled from 'styled-components';
import { PrimaryBlue, SecondaryColor, MainGreen } from '../ColorVars';
import { Text } from 'react-native';

export const CardWrapper = styled(Text)`
  min-height 40px;
  margin: auto;
  padding: 8px;
  margin-top: 15px;
  border-radius: 6px;
  Text {
    text-decoration: none !important;
  }
`;

export const CardTitle = styled(Text)`
  font-size: 2;
  font-weight: 400;
  color: ${MainGreen};
  flex-direction: column
`;

export const CardAuthor = styled(Text)`
  font-size: 2;
  font-weight: 700;
  color: ${PrimaryBlue};
  flex-direction: column;
`;

export const TitleAuthorDivider = styled(Text)`
  font-size: 2;
  font-weight: 900;
  color: ${SecondaryColor};
  flex-direction: column;
  margin: auto 20px;
`;
