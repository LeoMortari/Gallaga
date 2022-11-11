import { Text, TextInput, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  ${({ gutterTop }) => gutterTop && `margin-top: ${gutterTop};`}
  ${({ gutterBottom }) => gutterBottom && `margin-bottom: ${gutterBottom};`}
`;

export const ErrorContainer = styled(View)``;

export const ErrorLabel = styled(Text)`
  color: #f00;
  font-size: 20px;
  margin-top: 5px;
`;

export const LabelContainer = styled(View)`
  margin-left: ${({ labelMargin }) => labelMargin || "0px"};
`;

export const Label = styled(Text)`
  color: #fff;
  font-size: 20px;
  margin-bottom: 10px;
  letter-spacing: 2px;
`;

export const StyledInput = styled(TextInput)`
  height: 50px;
  width: 300px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;

  ${({ error }) => error.isTrue && "border: 2px solid #f00"}
`;

export const StyledContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;
