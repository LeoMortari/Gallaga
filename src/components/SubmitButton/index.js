import React from "react";
import { StyledButton, ButtonContainer, StyledLabel } from "./styles";

export default function SubmitButton({ handleSubmit, label, ...props }) {
  return (
    <ButtonContainer>
      <StyledButton onPress={handleSubmit} {...props}>
        <StyledLabel>{label}</StyledLabel>
      </StyledButton>
    </ButtonContainer>
  );
}
