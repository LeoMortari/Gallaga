import { apiPublic } from "../../config/axios";

export const getQuartoByNumero = async (numero) => {
  try {
    const { data: quartos } = await apiPublic.get("/api/quarto");

    if (quartos?.length) {
      return quartos.find((item) => item.numeroQuarto === Number(numero));
    } else {
      return {};
    }
  } catch (err) {
    return { error: true, cause: err };
  }
};
