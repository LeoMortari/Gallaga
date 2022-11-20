import styled from "styled-components";
import { View, Text, TouchableHighlight } from "react-native";

//Button Styles
export const ButtonContainer = styled(View)``;

export const ButtonCheckout = styled(TouchableHighlight)`
  font-size: 15px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  background-color: #221d21;
  padding: 20px;
  border-radius: 3px;
  font-weight: bold;
`;

export const ButtonCheckoutLabel = styled(Text)`
  font-size: 15px;
  color: #f77014;
  font-weight: bold;
`;

//Informação Styles
export const InfoContainer = styled(View)``;

export const Info = styled(Text)``;

//Item Styles
export const ItemContainer = styled(View)`
  padding: 20px;
  width: auto;
  margin: 20px;
  background-color: #fafafa;
`;

export const ItemTitle = styled(Text)`
  font-size: ${({ size }) => `${size || "30"}px`};
  font-weight: bold;
  color: #433d3d;
`;

export const ItemTitleContainer = styled(View)`
  align-items: center;
`;

//Quarto Styles
export const QuartoContainer = styled(View)`
  flex: 1;
  background-color: #221d21;
`;

export const QuartoDescription = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #221d21;
  margin-top: 10px;
`;

export const QuartoDescriptionContainer = styled(View)``;

export const QuartoValue = styled(Text)`
  font-size: 30px;
  color: ${({ color }) => color};
`;
