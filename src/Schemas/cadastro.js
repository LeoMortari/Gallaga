import * as Yup from "yup";
import { REQUIRED } from "../constants/messages";

export const initialValues = {
  nome: "",
  sobrenome: "",
  cpf: "",
  email: "",
  hotelName: "",
  quantidadeHospedes: 0,
  password: "",
};

export const CadastroSchema = Yup.object().shape({
  name: Yup.string().min(3, "Digite um nome válido").required(REQUIRED),
  lastname: Yup.string().required(REQUIRED),
  cpf: Yup.string()
    .min(11, "Digite um CPF válido")
    .max(11, "Digite um CPF válido")
    .required(REQUIRED),
  email: Yup.string().email("Digite um E-mail válido").required(REQUIRED),
  telefone: Yup.string()
    .required(REQUIRED)
    .min(11, "Insira um telefone válido"),
  hotelName: Yup.string().min(3, "Digite um nome válido").required(REQUIRED),
  hotelCity: Yup.string().required(REQUIRED),
  hotelUf: Yup.string().required(REQUIRED),
  hotelLogradouro: Yup.string().required(REQUIRED),
  hotelBairro: Yup.string().required(REQUIRED),
  hotelNumero: Yup.string().required(REQUIRED),
  password: Yup.string().min(3, "Minimo de 6 caracteres").required(REQUIRED),
});

export const objectErrors = (errors, touched) => ({
  name: {
    isTrue: errors.name && touched.name,
    message: errors.name,
  },
  lastname: {
    isTrue: errors.lastname && touched.lastname,
    message: errors.lastname,
  },
  cpf: {
    isTrue: errors.cpf && touched.cpf,
    message: errors.cpf,
  },
  email: {
    isTrue: errors.email && touched.email,
    message: errors.email,
  },
  telefone: {
    isTrue: errors.telefone && touched.telefone,
    message: errors.telefone,
  },
  hotelName: {
    isTrue: errors.hotelName && touched.hotelName,
    message: errors.hotelName,
  },
  hotelCity: {
    isTrue: errors.hotelCity && touched.hotelCity,
    message: errors.hotelCity,
  },
  hotelUf: {
    isTrue: errors.hotelUf && touched.hotelUf,
    message: errors.hotelUf,
  },
  hotelLogradouro: {
    isTrue: errors.hotelLogradouro && touched.hotelLogradouro,
    message: errors.hotelLogradouro,
  },
  hotelBairro: {
    isTrue: errors.hotelBairro && touched.hotelBairro,
    message: errors.hotelBairro,
  },
  hotelNumero: {
    isTrue: errors.hotelNumero && touched.hotelNumero,
    message: errors.hotelNumero,
  },
  password: {
    isTrue: errors.password && touched.password,
    message: errors.password,
  },
});
