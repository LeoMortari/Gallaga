import * as Yup from "yup";
import dayjs from "dayjs";
import { REQUIRED } from "../constants/messages";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const initialValues = { nome: "" };

export const ClienteSchema = Yup.object().shape({
  nome: Yup.string().min(3, "Digite um nome válido").required(REQUIRED),
  sobrenome: Yup.string().required(REQUIRED),
  cpf: Yup.string()
    .min(11, "Digite um CPF válido")
    .max(11, "Digite um CPF válido")
    .required(REQUIRED),
  email: Yup.string().email("Digite um E-mail válido").required(REQUIRED),
});

export const objectErrors = (errors, touched) => ({
  nome: {
    isTrue: errors.nome && touched.nome,
    message: errors.nome,
  },
  sobrenome: {
    isTrue: errors.sobrenome && touched.sobrenome,
    message: errors.sobrenome,
  },
  cpf: {
    isTrue: errors.cpf && touched.cpf,
    message: errors.cpf,
  },
  email: {
    isTrue: errors.email && touched.email,
    message: errors.email,
  },
});
