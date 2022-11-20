import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import Input from "../../../components/Input";
import SubmitButton from "../../../components/SubmitButton";
import Checkbox from "../../../components/Checkbox";

import { CheckBoxContainer, ErrorLabel, QuartosContainer } from "./styles";
import {
  QuartosSchema,
  initialValues,
  objectErrors,
} from "../../../Schemas/quartos";
import { paths } from "../../../constants/paths";

const Quartos = ({ navigation, route: { params } }) => {
  const [error, setError] = useState(false);
  let checked = "";

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

  const submit = (values) => {
    if (!checked) {
      return setError(true);
    } else {
      setError(false);
    }

    const newValues = { ...values, type: checked };
    console.log(newValues);
  };

  const Form = () => {
    return (
      <Formik
        onSubmit={submit}
        initialValues={initialValues}
        validationSchema={QuartosSchema}
      >
        {({ handleSubmit, errors, touched, ...props }) => {
          const fieldErrors = objectErrors(errors, touched);

          return (
            <View>
              <Input
                name="andar"
                label="Andar"
                labelMargin="45px"
                error={fieldErrors.andar}
                placeholder="Qual andar fica o quarto?"
                gutterTop="20px"
                {...props}
              />

              <Input
                name="numero"
                label="Número"
                labelMargin="45px"
                error={fieldErrors.numero}
                placeholder="Exemplo: 12"
                gutterTop="20px"
                {...props}
              />

              <Input
                name="nome"
                label="Nome"
                labelMargin="45px"
                error={fieldErrors.nome}
                placeholder="Campo opcional"
                gutterTop="20px"
                {...props}
              />

              <CheckBoxContainer>
                <Checkbox callback={(value) => (checked = value)} />

                {error && (
                  <ErrorLabel>Você deve selecionar o tipo do quarto</ErrorLabel>
                )}
              </CheckBoxContainer>

              <SubmitButton
                handleSubmit={handleSubmit}
                label={params?.id ? "EDITAR" : "CADASTRAR"}
              />
            </View>
          );
        }}
      </Formik>
    );
  };

  return (
    <QuartosContainer>
      <Form />
    </QuartosContainer>
  );
};

export default Quartos;
