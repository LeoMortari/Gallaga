import React from "react";
import { ChipContainer, ChipLabel } from "./styles";
import { diaria } from "../../constants/diaria";
import { colorChip } from "../../constants/chip";

export default function Chip({ item }) {
  const TYPES = {
    BASIC: { ...diaria.C },
    DELUXE: { ...diaria.B },
    SUPER_DELUXE: { ...diaria.A },
  };

  return (
    <ChipContainer color={colorChip[item.classificacao]}>
      <ChipLabel color={colorChip[item.classificacao]}>
        {TYPES[item.classificacao].type?.toUpperCase()}
      </ChipLabel>
    </ChipContainer>
  );
}
