import React from "react";
import { ChipContainer, ChipLabel } from "./styles";
import { diaria } from "../../constants/diaria";
import { colorChip } from "../../constants/chip";

export default function Chip({ item }) {
  return (
    <ChipContainer color={colorChip[item.type]}>
      <ChipLabel color={colorChip[item.type]}>
        {diaria[item.type].type?.toUpperCase()}
      </ChipLabel>
    </ChipContainer>
  );
}
