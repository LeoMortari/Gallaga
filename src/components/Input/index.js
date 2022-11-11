import React from "react";

import {
  Container,
  ErrorContainer,
  ErrorLabel,
  Label,
  LabelContainer,
  StyledContainer,
  StyledInput,
} from "./styles";

export default function Input({
  gutterTop,
  gutterBottom,
  label,
  labelMargin,
  name,
  ...props
}) {
  const { handleChange, handleBlur, values, password, error } = props;

  return (
    <Container gutterTop={gutterTop} gutterBottom={gutterBottom}>
      <LabelContainer labelMargin={labelMargin}>
        <Label>{label}</Label>
      </LabelContainer>

      <StyledContainer>
        <StyledInput
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={values[name]}
          error={error}
          secureTextEntry={password}
          {...props}
        />

        {error?.isTrue ? (
          <ErrorContainer>
            <ErrorLabel>{error.message}</ErrorLabel>
          </ErrorContainer>
        ) : null}
      </StyledContainer>
    </Container>
  );
}
