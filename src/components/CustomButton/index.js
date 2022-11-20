import React from "react";
import { StyledButton, ButtonContainer, StyledLabel } from "./styles";

export default function CustomButton({ label, ...props }) {
  return (
    <ButtonContainer>
      <StyledButton {...props}>
        <StyledLabel>{label}</StyledLabel>
      </StyledButton>
    </ButtonContainer>
  );
}
