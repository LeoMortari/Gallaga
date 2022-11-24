import {
  FlatList,
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from "react-native";
import styled from "styled-components";

export const ApartamentosContainer = styled(View)`
  flex: 1;
  background-color: #221d21;
`;

export const ItemFlatlist = styled(FlatList)``;

export const ItemContainer = styled(View)`
  background-color: #e5e5e5;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
`;

export const ItemButtonContainer = styled(TouchableHighlight)``;

export const ItemLeft = styled(Text)`
  font-size: 25px;
  color: #221d21;
  font-weight: bold;
`;

export const ItemRight = styled(Text)`
  font-size: 15px;
  color: #433d3d;
  font-weight: bold;
`;

export const ItemCheckout = styled(Text)`
  font-size: 15px;
  color: #433d3d;
  font-weight: bold;
`;

export const ItemRestant = styled(Text)`
  font-size: 20px;
  margin-top: 20px;
  color: #e33c08;
  font-weight: bold;
`;
