import * as Yup from "yup";

export const initialValues = { email: "", password: "" };

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Este campo precisa ser um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
});
