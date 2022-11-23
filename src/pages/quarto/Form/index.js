import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import Input from "../../../components/Input";
import SubmitButton from "../../../components/SubmitButton";
import Checkbox from "../../../components/Checkbox";

import { CheckBoxContainer, ErrorLabel, QuartosContainer } from "./styles";
import Loading from "../../../components/Loading";
import {
  QuartosSchema,
  initialValues,
  objectErrors,
} from "../../../Schemas/quartos";
import { paths } from "../../../constants/paths";
import { diaria } from "../../../constants/diaria";
import { apiPublic } from "../../../config/axios";

const TYPES_DIARIA = {
  BASIC: { ...diaria.C },
  DELUXE: { ...diaria.B },
  SUPER_DELUXE: { ...diaria.A },
};

const Quartos = ({ navigation, route: { params }, ...props }) => {
  const [error, setError] = useState(false);
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(false);
  let checked = "";

  const getQuartosByNumero = async () => {
    const id = params?.id;

    if (id) {
      try {
        const { data: quartos } = await apiPublic.get("api/quarto");
        const quarto = quartos.find((item) => item.numeroQuarto === Number(id));

        if (quarto) {
          checked = quarto.classificacao;

          setInitial({ numero: String(quarto.numeroQuarto) });
        }
      } catch (err) {
        console.log("ERROR", err);
      }
    }
  };

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
    getQuartosByNumero();
  }, []);

  const submit = async (values) => {
    const { idHotel } = props;
    const id = params?.id;

    if (!checked) {
      return setError(true);
    } else {
      setError(false);
    }

    const newValues = {
      idHotel,
      numeroQuarto: values.numero,
      classificacao: checked,
      valorDiaria: TYPES_DIARIA[checked].value,
    };

    try {
      setLoading(true);

      if (id) {
        apiPublic.put(`api/quarto/update/${id}`, newValues);
      } else {
        await apiPublic.post("api/quarto", newValues);
      }

      navigation.push(paths.APARTAMENTOS_LISTAR);
    } catch (err) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  const Form = () => {
    return (
      <Formik
        onSubmit={submit}
        initialValues={initial || initialValues}
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
                required
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

  return loading ? (
    <QuartosContainer>
      <Loading />
    </QuartosContainer>
  ) : (
    <QuartosContainer>
      <Form />
    </QuartosContainer>
  );
};

const mapStateToProps = (state) => {
  return { idHotel: state.login.idHotel };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quartos);
