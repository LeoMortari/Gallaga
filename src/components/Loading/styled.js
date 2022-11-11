import styled from "styled-components";
import { View, Text } from "react-native";

export const LoadingContainer = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px;
`;

export const Label = styled(Text)`
  color: #fff;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;
