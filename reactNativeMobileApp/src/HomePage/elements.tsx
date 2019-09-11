import styled from 'styled-components';
import { MainGreen } from '../ColorVars';
import { Text, TextInput, View } from 'react-native';

export const WelcomeText = styled(Text)`
  font-weight: 500;
  font-size: 40;
  color: ${MainGreen};
`;

export const DefaultPageWrapper = styled(View)`
  text-align: center;
`;

export const MainAreaWrapper = styled(View)`
  margin: auto;
`;

export const TextField = styled(TextInput)`
  font-size: 40;
  border-bottom-color: grey;
  border-bottom-width: 1;
  margin: auto;
  margin-top: 20;
`;
