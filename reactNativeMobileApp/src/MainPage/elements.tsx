import styled from 'styled-components';
import { Text as RnText, TextInput } from 'react-native';

export const MainWrapper = styled.View`
  text-align: center;
  margin: auto;
  margin-top: 10%;
`;

export const Text = styled(RnText)`
  margin: auto;
`;

export const FunText = styled.Text`
  color: green;
  font-size: 20;
`;

export const StyledTextInput = styled(TextInput)`
  font-size: 25;
  border-bottom-color: grey;
  border-bottom-width: 1;
  margin: auto;
  margin-top: 20;
`;
