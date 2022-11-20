import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { CheckboxContainer, Label } from "./styles";
import { colorChip } from "../../constants/chip";

const planos = {
  A: "SUPER_DELUXE",
  B: "DELUXE",
  C: "BASIC",
};

const options = {
  backgroundColor: "transparent",
  borderColor: "transparent",
};

const Checkbox = ({ name, fontColor, size, callback }) => {
  const [checked, setChecked] = useState("");

  if (callback && typeof callback === "function") {
    callback(checked);
  }

  const textOptions = (color) => ({ color: fontColor || color });

  return (
    <CheckboxContainer>
      <Label>Tipo do Quarto</Label>
      <CheckBox
        title="BASIC"
        containerStyle={options}
        size={size || 25}
        checkedColor="#b7aea5"
        textStyle={textOptions(colorChip.C.plano)}
        checked={checked === planos.C}
        onPress={() => setChecked(planos.C)}
      />

      <CheckBox
        title="DELUXE"
        containerStyle={options}
        size={size || 25}
        checkedColor="#b7aea5"
        textStyle={textOptions(colorChip.B.plano)}
        checked={checked === planos.B}
        onPress={() => setChecked(planos.B)}
      />

      <CheckBox
        title="SUPER DELUXE"
        containerStyle={options}
        size={size || 25}
        checkedColor="#b7aea5"
        textStyle={textOptions(colorChip.A.plano)}
        checked={checked === planos.A}
        onPress={() => setChecked(planos.A)}
      />
    </CheckboxContainer>
  );
};

export default Checkbox;
