import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";

export const QuartosContainer = styled(ScrollView)`
  flex: 1;
  background-color: #221d21;
`;

export const CheckBoxContainer = styled(View)``;

export const ErrorLabel = styled(Text)`
  margin-left: 40px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #f00;
`;
