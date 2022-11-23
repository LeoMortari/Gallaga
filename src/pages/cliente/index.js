import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";

import { ClienteContainer } from "./styles";
import {
  ClienteSchema,
  initialValues,
  objectErrors,
} from "../../Schemas/cliente";
import { paths } from "../../constants/paths";
import { apiPublic } from "../../config/axios";

const Cliente = ({ navigation, route }) => {
  const [initial, setInitial] = useState(null);

  const getClienteByCpf = async () => {
    const id = route?.params?.id;

    try {
      const { data: cliente } = await apiPublic.get(`/api/cliente/cpf/${id}`);

      setInitial(cliente);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getClienteByCpf();
  }, []);

  const submit = async (values) => {
    const id = route?.params?.id;

    try {
      if (id) {
        await apiPublic.put(`/api/cliente/update/${initial.id}`, values);
      } else {
        await apiPublic.post("/api/cliente", values);
      }

      navigation.push(paths.APARTAMENTOS_LISTAR);
    } catch (err) {
      console.log(err);
    }
  };

  const Form = () => {
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <FAB
            title={<Ionicons name="arrow-back" size={20} color="#b7aea5" />}
            style={{ marginRight: 10 }}
            color="none"
            onPress={() => navigation.push(paths.APARTAMENTOS_LISTAR)}
          />
        ),
      });
    }, []);

    return (
      <Formik
        onSubmit={submit}
        initialValues={initial || initialValues}
        validationSchema={ClienteSchema}
      >
        {({ handleSubmit, errors, touched, ...props }) => {
          const fieldErrors = objectErrors(errors, touched);

          return (
            <View>
              <Input
                name="nome"
                label="Nome"
                labelMargin="35px"
                error={fieldErrors.nome}
                placeholder="Exemplo: Guilherme"
                gutterTop="20px"
                {...props}
              />

              <Input
                name="sobrenome"
                label="Sobrenome"
                labelMargin="35px"
                error={fieldErrors.sobrenome}
                placeholder="Exemplo: Almeida"
                gutterTop="20px"
                {...props}
              />

              <Input
                name="cpf"
                label="CPF"
                labelMargin="35px"
                error={fieldErrors.cpf}
                placeholder="Somente Números"
                gutterTop="20px"
                {...props}
              />

              <Input
                name="email"
                label="E-Mail"
                labelMargin="35px"
                error={fieldErrors.email}
                placeholder="exemplo@exemplo.com"
                gutterTop="20px"
                gutterBottom="35px"
                {...props}
              />

              <SubmitButton handleSubmit={handleSubmit} label="CADASTRAR" />
            </View>
          );
        }}
      </Formik>
    );
  };

  return (
    <ClienteContainer>
      <Form />
    </ClienteContainer>
  );
};

export default Cliente;
