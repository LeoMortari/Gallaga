import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { View } from "react-native";
import { connect } from "react-redux";
import {
  CadastroContainer,
  LabelCadastro,
  LoginContainer,
  LogoContainer,
  LogoTittle,
} from "./styles";

import Input from "../../components/Input";
import Loading from "../../components/Loading";
import SubmitButton from "../../components/SubmitButton";

import { LoginSchema, initialValues } from "../../Schemas/login";
import { paths } from "../../constants/paths";
import { apiPublic } from "../../config/axios";
import InfoDialog from "../../components/InfoDialog";

function Login({ navigation, ...props }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderLogo = () => (
    <LogoContainer>
      <LogoTittle>GALLAGA</LogoTittle>
    </LogoContainer>
  );

  const handleSubmit = async (values) => {
    const { dispatch } = props;

    try {
      setLoading(true);

      const {
        data: { hotel, usuario },
      } = await apiPublic.post("/api/usuario/login", {
        ...values,
        senha: values.password,
      });

      await dispatch({
        type: "LOGIN",
        payload: { idHotel: hotel.id, idUsuario: usuario.id },
      });

      navigation.push(paths.APARTAMENTOS_LISTAR);
    } catch (err) {
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {({ handleSubmit, errors, touched, ...props }) => {
          const objectErrors = {
            email: {
              isTrue: errors.email && touched.email,
              message: errors.email,
            },
            password: {
              isTrue: errors.password && touched.password,
              message: errors.password,
            },
          };

          return (
            <View>
              <Input
                name="email"
                label="E-mail"
                labelMargin="15px"
                error={objectErrors.email}
                placeholder="exemple@gmail.com"
                gutterTop="50px"
                {...props}
              />

              <Input
                name="password"
                label="Senha"
                error={objectErrors.password}
                labelMargin="15px"
                gutterTop="50px"
                gutterBottom="15px"
                password
                {...props}
              />

              <CadastroContainer>
                <LabelCadastro onPress={() => navigation.push(paths.CADASTRO)}>
                  Não tem conta? Cadastre-se
                </LabelCadastro>
              </CadastroContainer>

              <SubmitButton label="ENTRAR" handleSubmit={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    );
  };

  return !loading ? (
    <LoginContainer>
      <InfoDialog
        message="Usuário ou senha inválidos"
        title="Falha ao logar"
        open={open}
        onBackdropPress={setOpen}
      />
      {renderLogo()}
      {renderForm()}
    </LoginContainer>
  ) : (
    <LoginContainer>
      <Loading />
    </LoginContainer>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
