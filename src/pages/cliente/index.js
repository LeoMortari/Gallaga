import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
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

const Cliente = ({ navigation, route: { params } }) => {
  useEffect(() => {
    console.log(params);
  }, []);

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
        onSubmit={(values) => console.log(values)}
        initialValues={initialValues}
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
                name="data"
                label="Data de Nascimento"
                labelMargin="35px"
                error={fieldErrors.data}
                placeholder="01/01/2000"
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
