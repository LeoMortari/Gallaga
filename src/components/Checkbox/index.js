import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { CheckboxContainer, Label } from "./styles";
import { colorChip } from "../../constants/chip";

const planos = {
  SUPER_DELUXE: "SUPER_DELUXE",
  DELUXE: "DELUXE",
  BASIC: "BASIC",
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
        textStyle={textOptions(colorChip.BASIC.plano)}
        checked={checked === planos.BASIC}
        onPress={() => setChecked(planos.BASIC)}
      />

      <CheckBox
        title="DELUXE"
        containerStyle={options}
        size={size || 25}
        checkedColor="#b7aea5"
        textStyle={textOptions(colorChip.DELUXE.plano)}
        checked={checked === planos.DELUXE}
        onPress={() => setChecked(planos.DELUXE)}
      />

      <CheckBox
        title="SUPER DELUXE"
        containerStyle={options}
        size={size || 25}
        checkedColor="#b7aea5"
        textStyle={textOptions(colorChip.SUPER_DELUXE.plano)}
        checked={checked === planos.SUPER_DELUXE}
        onPress={() => setChecked(planos.SUPER_DELUXE)}
      />
    </CheckboxContainer>
  );
};

export default Checkbox;
