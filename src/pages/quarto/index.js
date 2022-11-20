import React, { useEffect } from "react";

import {
  ButtonCheckout,
  ButtonCheckoutLabel,
  ButtonContainer,
  Info,
  InfoContainer,
  ItemContainer,
  ItemTitle,
  ItemTitleContainer,
  QuartoContainer,
  QuartoDescription,
  QuartoDescriptionContainer,
  QuartoValue,
} from "./styles";

import { diaria } from "../../constants/diaria";
import Chip from "../../components/Chip";
import { colorChip } from "../../constants/chip";

export default function Quarto({ navigation, route }) {
  const { params: item } = route;
  const colors = { red: "#e33c08", orange: "#f77014" };

  useEffect(() => {
    navigation.setOptions({
      title: `QUARTO ${item.apartament}`,
      headerStyle: {
        backgroundColor: colorChip[item.type].plano,
      },
      headerTintColor: colorChip[item.type].border,
    });
  }, [item.apartament]);

  return (
    <QuartoContainer>
      <ItemContainer>
        <Chip item={item} />
        <QuartoDescriptionContainer>
          <QuartoDescription>
            {diaria[item.type]?.description}
          </QuartoDescription>
          <QuartoDescription>
            R$
            <QuartoValue color={colorChip[item.type].border}>
              {diaria[item.type]?.value.toFixed?.(2).replace?.(".", ",")}
            </QuartoValue>
            /diária
          </QuartoDescription>
        </QuartoDescriptionContainer>
        <ItemTitleContainer>
          <ItemTitle size={40}>
            {item.name} {item.lastname}
          </ItemTitle>
          <ItemTitle size={15}>{item.email}</ItemTitle>
        </ItemTitleContainer>

        {/* TODO: Estilizar container */}
        <InfoContainer>
          <Info>... Informações do hóspede</Info>
          {/* TODO: colocar informações */}
        </InfoContainer>
        <ButtonContainer>
          <ButtonCheckout>
            <ButtonCheckoutLabel>Realizar Check-Out</ButtonCheckoutLabel>
          </ButtonCheckout>
        </ButtonContainer>
      </ItemContainer>
    </QuartoContainer>
  );
}
