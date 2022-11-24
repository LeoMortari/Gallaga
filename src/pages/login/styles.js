import styled from "styled-components";
import { Text, View } from "react-native";

export const LoginContainer = styled(View)`
  background-color: #141414;
  flex: 1;
  padding: 30px;
`;

export const LogoContainer = styled(View)`
  align-items: center;
  margin-top: 50px;
`;

export const LogoTittle = styled(Text)`
  font-size: 50px;
  font-weight: bold;
  color: #9452ff;
  letter-spacing: 3px;
`;

export const LabelCadastro = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  text-decoration: underline;
  color: #b7aea5;
`;

export const CadastroContainer = styled(View)`
  align-items: center;
  margin-bottom: 40px;
`;
