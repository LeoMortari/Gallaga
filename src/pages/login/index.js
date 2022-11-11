import React from "react";
import { Formik } from "formik";
import { View } from "react-native";
import { LoginContainer, LogoContainer, LogoTittle } from "./styles";

import Input from "../../components/Input";
import Loading from "../../components/Loading";
import SubmitButton from "../../components/SubmitButton";

import { LoginSchema, initialValues } from "../../Schemas/login";
import { paths } from "../../constants/paths";

export default function Login({ navigation }) {
  const renderLoading = () => <Loading />;

  const renderLogo = () => (
    <LogoContainer>
      <LogoTittle>GALLAGA</LogoTittle>
    </LogoContainer>
  );

  const renderForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => navigation.push(paths.APARTAMENTOS)}
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
                gutterBottom="50px"
                password
                {...props}
              />

              <SubmitButton label="ENTRAR" handleSubmit={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    );
  };

  return (
    <LoginContainer>
      {renderLogo()}
      {renderForm()}
    </LoginContainer>
  );
}
