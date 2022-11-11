import styled from "styled-components";
import { Text, View } from "react-native";

export const ChipContainer = styled(View)`
  background-color: ${({ color }) => color.plano || "#949494"};
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid ${({ color }) => color.border || "#949494"};
`;

export const ChipLabel = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  color: ${({ color }) => color.border || "#949494"};
`;
