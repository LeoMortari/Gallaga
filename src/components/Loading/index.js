import React from "react";
import { ActivityIndicator } from "react-native";
import { Label, LoadingContainer } from "./styled";

export default function Loading() {
  return (
    <LoadingContainer>
      <ActivityIndicator size={100} color="#fff" />
      <Label>Carregando...</Label>
    </LoadingContainer>
  );
}
