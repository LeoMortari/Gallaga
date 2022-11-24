import * as Yup from "yup";
import dayjs from "dayjs";
import { REQUIRED } from "../constants/messages";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const initialValues = { nome: "" };

export const ApartamentosSchema = Yup.object().shape({
  numero: Yup.number().required(REQUIRED).typeError("Digite um número válido"),
  cpf: Yup.string()
    .min(11, "Digite um CPF válido")
    .max(11, "Digite um CPF válido")
    .required(REQUIRED),
  nome: Yup.string().required(REQUIRED).typeError("Digite um nome válido"),
  dias: Yup.number()
    .required(REQUIRED)
    .typeError("Insira uma quantidade válida"),
});

export const objectErrors = (errors, touched) => ({
  numero: {
    isTrue: errors.numero && touched.numero,
    message: errors.numero,
  },
  nome: {
    isTrue: errors.nome && touched.nome,
    message: errors.nome,
  },
  cpf: {
    isTrue: errors.cpf && touched.cpf,
    message: errors.cpf,
  },
  dias: {
    isTrue: errors.dias && touched.dias,
    message: errors.dias,
  },
});
