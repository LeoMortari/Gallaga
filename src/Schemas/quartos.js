import * as Yup from "yup";
import dayjs from "dayjs";
import { REQUIRED } from "../constants/messages";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const initialValues = { nome: "" };

export const QuartosSchema = Yup.object().shape({
  andar: Yup.number().required(REQUIRED).typeError("Digite um andar válido"),
  numero: Yup.number().required(REQUIRED).typeError("Digite um número válido"),
  nome: Yup.string().typeError("Digite um nome válido"),
});

export const objectErrors = (errors, touched) => ({
  andar: {
    isTrue: errors.andar && touched.andar,
    message: errors.andar,
  },
  numero: {
    isTrue: errors.numero && touched.numero,
    message: errors.numero,
  },
  nome: {
    isTrue: errors.nome && touched.nome,
    message: errors.nome,
  },
});
