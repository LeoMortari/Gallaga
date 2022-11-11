import React from "react";
import { StyledButton, ButtonContainer, StyledLabel } from "./styles";

export default function SubmitButton({ handleSubmit, label }) {
  return (
    <ButtonContainer>
      <StyledButton onPress={handleSubmit}>
        <StyledLabel>{label}</StyledLabel>
      </StyledButton>
    </ButtonContainer>
  );
}
