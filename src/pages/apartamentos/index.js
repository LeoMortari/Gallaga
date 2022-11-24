import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";

import {
  ApartamentosContainer,
  ItemButtonContainer,
  ItemLeft,
  ItemRight,
  ItemCheckout,
  ItemContainer,
  ItemFlatlist,
  ItemRestant,
} from "./styles";

import Loading from "../../components/Loading";
import { FORMAT_BR_HOUR } from "../../constants/date";
import { paths } from "../../constants/paths";
import ButtonActions from "../../components/ButtonActions";
import { apiPublic } from "../../config/axios";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Apartamentos({ navigation, ...props }) {
  const [aptos, setAptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const getApartamentos = async () => {
    const { idHotel } = props;

    try {
      setLoading(true);

      const { data: quartos } = await apiPublic.get(
        `/api/quarto/ocupados/${idHotel}`
      );

      setAptos(quartos);
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApartamentos();
  }, [isFocused]);

  const ItemList = ({ item }) => {
    const checkInOut = (check) =>
      dayjs(check, FORMAT_BR_HOUR).format(FORMAT_BR_HOUR);
    const difference = dayjs(item.dataSaida, FORMAT_BR_HOUR).diff(
      new Date(),
      "hour"
    );

    return (
      <ItemButtonContainer
        onPress={() => navigation.push(paths.QUARTO_LISTAR, item)}
      >
        <ItemContainer>
          <ItemLeft>
            {item.numeroQuarto} - {item.nomeCliente || "_"}
          </ItemLeft>
          <ItemRight>Check-In: {checkInOut(item.dataEntrada)}</ItemRight>
          <ItemCheckout>Check-Out: {checkInOut(item.dataSaida)}</ItemCheckout>
          <ItemRestant>Restam {difference} horas para o Check-out</ItemRestant>
        </ItemContainer>
      </ItemButtonContainer>
    );
  };

  const renderItem = ({ item }) => {
    return <ItemList item={item} />;
  };

  const ItemsRender = () =>
    aptos.length ? (
      <ItemFlatlist
        data={aptos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    ) : null;

  const Hospedes = () => (!loading ? <ItemsRender /> : <Loading />);

  return (
    <ApartamentosContainer>
      <Hospedes />
      <ButtonActions navigation={navigation} />
    </ApartamentosContainer>
  );
}

const mapStateToProps = (state) => {
  return { ...state.login };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apartamentos);
