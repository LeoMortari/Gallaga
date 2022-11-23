import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

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
import { apiPublic } from "../../config/axios";
import { getClienteByCpf } from "../../utils/get/cliente";
import { connect } from "react-redux";
import { paths } from "../../constants/paths";
import { FORMAT_BR_HOUR } from "../../constants/date";
import Loading from "../../components/Loading";

function Quarto({ navigation, route, ...props }) {
  const [loading, setLoading] = useState(false);

  const { params: item } = route;

  const TYPES = {
    BASIC: { ...diaria.C },
    DELUXE: { ...diaria.B },
    SUPER_DELUXE: { ...diaria.A },
  };

  useEffect(() => {
    navigation.setOptions({
      title: `QUARTO ${item.numeroQuarto}`,
      headerStyle: {
        backgroundColor: colorChip[item.classificacao].plano,
      },
      headerTintColor: colorChip[item.classificacao].border,
    });
  }, [item.numeroQuarto]);

  const getValorPago = (dataEntrada, tipo) => {
    const entrada = dayjs(dataEntrada, FORMAT_BR_HOUR);
    const value = TYPES[tipo]?.value;
    const diff = entrada.diff(dayjs(), "day");

    return diff > 1 ? value * diff : value;
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const cliente = await getClienteByCpf(item.cpf);

      const values = {
        idCliente: cliente.id,
        idQuarto: item.idQuarto,
        dataEntrada: item.dataEntrada,
        dataSaida: dayjs().format(FORMAT_BR_HOUR),
        cpf: cliente.cpf,
        nome: cliente.nome,
        valorPago: getValorPago(item.dataEntrada, item.classificacao),
      };

      await apiPublic.post(`api/cliente/check-out/${cliente.cpf}`, values);

      navigation.push(paths.APARTAMENTOS_LISTAR);
    } catch (err) {
      console.log("ERRO", err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <QuartoContainer>
      <Loading />
    </QuartoContainer>
  ) : (
    <QuartoContainer>
      <ItemContainer>
        <Chip item={item} />
        <QuartoDescriptionContainer>
          <QuartoDescription>
            {TYPES[item.classificacao]?.description}
          </QuartoDescription>
          <QuartoDescription>
            R$
            <QuartoValue color={colorChip[item.classificacao].border}>
              {TYPES[item.classificacao]?.value
                .toFixed?.(2)
                .replace?.(".", ",")}
            </QuartoValue>
            /diária
          </QuartoDescription>
        </QuartoDescriptionContainer>
        <ItemTitleContainer>
          <ItemTitle size={40}>{item.nomeCliente || "Sem nome"}</ItemTitle>
          <ItemTitle size={15}>{item.email}</ItemTitle>
        </ItemTitleContainer>
        <ButtonContainer>
          <ButtonCheckout>
            <ButtonCheckoutLabel onPress={handleCheckout}>
              Realizar Check-Out
            </ButtonCheckoutLabel>
          </ButtonCheckout>
        </ButtonContainer>
      </ItemContainer>
    </QuartoContainer>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quarto);
