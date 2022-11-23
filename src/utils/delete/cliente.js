import React from "react";
import { apiPublic } from "../../config/axios";
import { getClienteByCpf } from "../get/cliente";

export const deleteClienteByCpf = async (cpf) => {
  try {
    const cliente = await getClienteByCpf(cpf);

    await apiPublic.delete(`/api/cliente/delete/${cliente.id}`);

    return true;
  } catch (err) {
    console.log("ERRO AO DELETAR", err);
    return false;
  }
};
