import React, { useEffect, useState } from "react";
import { HistoricoContainer } from "./styles";
import CustomButton from "../../components/CustomButton";
import { apiPublic } from "../../config/axios";
import { paths } from "../../constants/paths";
import {
  ItemCheckout,
  ItemContainer,
  ItemFlatlist,
  ItemLeft,
  ItemRestant,
  ItemRight,
} from "../apartamentos/styles";

export default function Historico({ navigation, ...props }) {
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    try {
      const { data } = await apiPublic.get("/api/cliente");

      setClientes(data);
    } catch (err) {
      console.log("Não foi possível buscar os clientes");
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const Button = () => (
    <CustomButton
      onPress={() => navigation.push(paths.APARTAMENTOS_LISTAR)}
      label="VOLTAR"
      style={{ marginBottom: 10 }}
    />
  );

  const Item = ({ pessoa: { item } }) => (
    <>
      <ItemContainer>
        <ItemLeft>
          {item.id}: {item.nome}
        </ItemLeft>
        <ItemRight>CPF: {item.cpf}</ItemRight>
        <ItemCheckout>E-Mail: {item.email}</ItemCheckout>
        <ItemRestant>
          Situação: {item.situação ? "ATIVO" : "INATIVO"}
        </ItemRestant>
      </ItemContainer>
    </>
  );

  const renderItem = (cliente) => <Item pessoa={cliente} />;

  const Clientes = () => {
    console.log(clientes);
    if (clientes?.length) {
      return (
        <ItemFlatlist
          data={clientes}
          keyExtractor={(item) => item.cpf}
          renderItem={renderItem}
        />
      );
    }
  };

  return (
    <HistoricoContainer>
      <Button />
      <Clientes />
    </HistoricoContainer>
  );
}
