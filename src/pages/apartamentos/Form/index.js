import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import Input from "../../../components/Input";
import SubmitButton from "../../../components/SubmitButton";

import { ApartamentosContainer } from "../styles";
import {
  ApartamentosSchema,
  initialValues,
  objectErrors,
} from "../../../Schemas/apartamentos";
import { paths } from "../../../constants/paths";
import { apiPublic } from "../../../config/axios";
import dayjs from "dayjs";
import { FORMAT_BR_HOUR } from "../../../constants/date";
import InfoDialog from "../../../components/InfoDialog";
import Loading from "../../../components/Loading";

const Form = ({ navigation, route: { params } }) => {
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const [initial, setInitial] = useState(null);

  const getQuartos = async () => {
    try {
      setloading(true);

      const res = await apiPublic.get("/api/quarto");
      return res;
    } catch (err) {
      setOpen(true);
      setMessage("Quarto não encontrado");
    } finally {
      setloading(false);
    }
  };

  const getApartamentoByNumber = async () => {
    const id = params?.id;

    if (id) {
      try {
        setloading(true);

        const { data: quartos } = await getQuartos();

        const quarto = quartos.find((item) => item.numeroQuarto === Number(id));

        const { data: apartamento } = await apiPublic.get(
          `/api/cliente/historico/${quarto.id}`
        );

        setInitial({ cpf: apartamento.cpf });
      } catch (err) {
        setOpen(true);
        setMessage("Informações não encontradas");
      } finally {
        setloading(false);
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "ALOCAR QUARTO",
      headerLeft: () => (
        <FAB
          title={<Ionicons name="arrow-back" size={20} color="#b7aea5" />}
          style={{ marginRight: 10 }}
          color="none"
          onPress={() => navigation.push(paths.APARTAMENTOS_LISTAR)}
        />
      ),
    });
    getApartamentoByNumber();
  }, []);

  const getClientes = async (cpf) => {
    try {
      setloading(true);

      const res = await apiPublic.get(`/api/cliente/cpf/${cpf}`);
      return res;
    } catch (err) {
      setOpen(true);
      setMessage("Cliente não encontrado");
    } finally {
      setloading(false);
    }
  };

  const submit = async (values) => {
    const dataEntrada = dayjs().format(FORMAT_BR_HOUR);
    const dataSaida = dayjs().add(values.dias, "day").format(FORMAT_BR_HOUR);

    const { data: cliente } = await getClientes(values.cpf);
    const { data: quartos } = await getQuartos();

    try {
      setloading(true);

      const filterQuarto = quartos.find(
        (item) => String(item.numeroQuarto) === values.numero
      );

      if (filterQuarto && cliente) {
        const nowValues = {
          valorPago: filterQuarto.valorDiaria * values.dias,
          cpf: values.cpf,
          idQuarto: filterQuarto.id,
          idCliente: cliente.id,
          dataEntrada,
          dataSaida,
        };

        await apiPublic.post(`api/cliente/check-in/${cliente.cpf}`, nowValues);
      }

      navigation.push(paths.APARTAMENTOS_LISTAR);
    } catch (err) {
      setMessage("Erro ao realizar Check-in");
      setOpen(true);
    } finally {
      setloading(false);
    }
  };

  const ApartamentoCadastrar = () => {
    return (
      <Formik
        onSubmit={submit}
        initialValues={initial || initialValues}
        validationSchema={ApartamentosSchema}
      >
        {({ handleSubmit, errors, touched, ...props }) => {
          const fieldErrors = objectErrors(errors, touched);

          return (
            <View>
              <Input
                name="numero"
                label="Número"
                labelMargin="45px"
                error={fieldErrors.numero}
                placeholder="O número do quarto"
                gutterTop="20px"
                {...props}
              />

              <Input
                name="cpf"
                label="CPF"
                labelMargin="45px"
                error={fieldErrors.cpf}
                placeholder="CPF do Hóspede"
                gutterTop="20px"
                {...props}
              />

              <Input
                name="nome"
                label="Nome"
                labelMargin="45px"
                error={fieldErrors.nome}
                placeholder="Nome do Hóspede"
                gutterTop="20px"
                {...props}
              />

              <Input
                name="dias"
                label="Quantidade de diárias"
                labelMargin="45px"
                error={fieldErrors.dias}
                placeholder="1, 2, 3..."
                gutterTop="20px"
                gutterBottom="40px"
                {...props}
              />

              <SubmitButton handleSubmit={handleSubmit} label="CHECK-IN" />
            </View>
          );
        }}
      </Formik>
    );
  };

  return !loading ? (
    <ApartamentosContainer>
      <InfoDialog
        title="Erro ao realizar Check-in"
        message={message}
        open={open}
        onBackdropPress={setOpen}
      />
      <ApartamentoCadastrar />
    </ApartamentosContainer>
  ) : (
    <ApartamentosContainer>
      <Loading />
    </ApartamentosContainer>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
