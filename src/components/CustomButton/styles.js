import { View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";

export const ButtonContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(TouchableOpacity)`
  height: 70px;
  width: 300px;
  justify-content: center;
  align-items: center;
  background-color: #b7aea5;
  border-radius: 5px;
`;
export const StyledLabel = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: #433d3d;
`;
