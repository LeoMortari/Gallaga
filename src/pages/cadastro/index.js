import React from "react";
import { Formik } from "formik";
import { View } from "react-native";
import { connect } from "react-redux";

import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import CustomButton from "../../components/CustomButton";

import { CadastroContainer } from "./styles";
import {
  CadastroSchema,
  initialValues,
  objectErrors,
} from "../../Schemas/cadastro";
import { LogoContainer, LogoTittle } from "../login/styles";
import { paths } from "../../constants/paths";
import { apiPublic } from "../../config/axios";

// import { paths } from "../../constants/paths";

function Cadastro({ navigation }) {
  const renderLogo = () => (
    <LogoContainer>
      <LogoTittle>GALLAGA</LogoTittle>
    </LogoContainer>
  );

  const handleSubmit = async (values) => {
    const usuarioValues = {
      nome: values.name,
      sobrenome: values.lastname,
      cpf: values.cpf,
      email: values.email,
      senha: values.password,
      telefone: values.telefone,
    };

    const hotelValues = {
      nome: values.hotelName,
      cidade: values.hotelCity,
      uf: values.hotelUf,
      logradouro: values.hotelLogradouro,
      bairro: values.hotelBairro,
      numero: values.hotelNumero,
    };

    try {
      const { data: cliente } = await apiPublic.post(
        "/api/usuario",
        usuarioValues
      );

      await apiPublic.post("/api/hotel", {
        ...hotelValues,
        idUsuario: cliente.id,
      });

      navigation.push(paths.LOGIN);
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={CadastroSchema}
      >
        {({ handleSubmit, errors, touched, ...props }) => {
          const fieldErrors = objectErrors(errors, touched);

          return (
            <View>
              <Input
                name="name"
                label="Nome"
                labelMargin="15px"
                gutterTop="30px"
                gutterBottom="20px"
                error={fieldErrors.name}
                required
                {...props}
              />

              <Input
                name="lastname"
                label="Sobrenome"
                labelMargin="15px"
                error={fieldErrors.lastname}
                required
                {...props}
              />

              <Input
                name="cpf"
                label="CPF"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.cpf}
                required
                {...props}
              />

              <Input
                name="email"
                label="E-Mail"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.email}
                required
                {...props}
              />

              <Input
                name="telefone"
                label="Telefone"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.telefone}
                required
                {...props}
              />

              <Input
                name="hotelName"
                label="Nome do Hotel"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.hotelName}
                required
                {...props}
              />

              <Input
                name="hotelCity"
                label="Cidade do Hotel"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.hotelCity}
                required
                {...props}
              />

              <Input
                name="hotelUf"
                label="Estado do Hotel"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.hotelUf}
                required
                {...props}
              />

              <Input
                name="hotelLogradouro"
                label="Rua do Hotel"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.hotelLogradouro}
                required
                {...props}
              />

              <Input
                name="hotelBairro"
                label="Bairro do Hotel"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.hotelBairro}
                required
                {...props}
              />

              <Input
                name="hotelNumero"
                label="Numero do Hotel"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.hotelNumero}
                required
                {...props}
              />

              <Input
                name="password"
                label="Senha"
                labelMargin="15px"
                gutterTop="20px"
                error={fieldErrors.password}
                required
                password
                gutterBottom="40px"
                {...props}
              />

              <CustomButton
                onPress={() => navigation.push(paths.LOGIN)}
                label="VOLTAR"
                style={{ marginBottom: 10 }}
              />

              <SubmitButton
                label="CADASTRAR"
                handleSubmit={handleSubmit}
                style={{ marginBottom: 40 }}
              />
            </View>
          );
        }}
      </Formik>
    );
  };

  return (
    <CadastroContainer>
      {renderLogo()}
      {renderForm()}
    </CadastroContainer>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
