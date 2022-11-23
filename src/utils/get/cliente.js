import { apiPublic } from "../../config/axios";

export const getClienteByCpf = async (cpf) => {
  try {
    const { data: clientes } = await apiPublic.get("/api/cliente");

    if (clientes?.length) {
      return clientes.find((item) => item.cpf === cpf);
    } else {
      return {};
    }
  } catch (err) {
    return { error: true, cause: err };
  }
};
