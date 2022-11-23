import React from "react";
import { apiPublic } from "../../config/axios";
import { getQuartoByNumero } from "../get/quarto";

export const deleteQuartoByNumero = async (numero) => {
  try {
    const quarto = await getQuartoByNumero(numero);

    await apiPublic.delete(`/api/quarto/delete/${quarto.id}`);

    return true;
  } catch (err) {
    console.log("ERRO AO DELETAR", err);
    return false;
  }
};
