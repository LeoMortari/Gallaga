import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  BottomSheet,
  Button,
  FAB,
  Dialog,
  ListItem,
  Input,
} from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { paths } from "../../constants/paths";
import { deleteClienteByCpf } from "../../utils/delete/cliente";
import { deleteQuartoByNumero } from "../../utils/delete/quarto";

const ButtonActions = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState({ visible: false, route: "" });
  const [expandEditable, setExpandEditable] = useState({
    visible: false,
    identifier: "",
  });
  const [identifier, setIdentifer] = useState(false);
  const [excluir, setExcluir] = useState(false);

  const list = [
    {
      title: "Cliente",
      containerStyle: { backgroundColor: "#b7aea5" },
      identifier: "CPF",
      titleStyle: { color: "#221d21", fontWeight: "bold" },
      onPress: () => setExpanded({ visible: true, route: "Cliente" }),
    },
    {
      title: "Quarto",
      containerStyle: { backgroundColor: "#b7aea5" },
      identifier: "NÚMERO",
      titleStyle: { color: "#221d21", fontWeight: "bold" },
      onPress: () => setExpanded({ visible: true, route: "Quarto" }),
    },
    {
      title: "Apartamentos",
      containerStyle: { backgroundColor: "#b7aea5" },
      identifier: "NÚMERO",
      titleStyle: { color: "#221d21", fontWeight: "bold" },
      onPress: () => setExpanded({ visible: true, route: "Apartamentos" }),
    },
    {
      title: "Historico",
      containerStyle: { backgroundColor: "#b7aea5" },
      identifier: "cpf",
      titleStyle: { color: "#221d21", fontWeight: "bold" },
      onPress: () => setExpanded({ visible: true, route: "Historico" }),
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "#f00" },
      titleStyle: {
        color: "#e0e0e0",
      },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <>
      <FAB
        title={<Ionicons name="add" size={30} color="white" />}
        placement="right"
        color="#f77014"
        onPress={() => setIsVisible(true)}
      />
      <Dialog
        isVisible={expanded.visible}
        onBackdropPress={() => setExpanded({ visible: false, route: "" })}
      >
        <Dialog.Title title={expanded.route} />
        <Dialog.Actions>
          <Dialog.Button
            title="EDITAR"
            onPress={() => {
              const identificador = list.find(
                (item) => item.title === expanded.route
              )?.identifier;
              setExpandEditable({ visible: true, identifier: identificador });
              setExpanded({ visible: false, route: expanded.route });
            }}
          />
          <Dialog.Button
            title="ADICIONAR"
            onPress={() => {
              const identificador = list.find(
                (item) => item.title === expanded.route
              )?.title;

              navigation.push(paths[identificador?.toUpperCase()]);
            }}
          />
          <Dialog.Button
            title="EXCLUIR"
            onPress={() => {
              const identificador = list.find(
                (item) => item.title === expanded.route
              )?.identifier;
              setExpandEditable({ visible: true, identifier: identificador });
              setExpanded({ visible: false, route: expanded.route });
              setExcluir(true);
            }}
          />
        </Dialog.Actions>
      </Dialog>
      <Dialog
        isVisible={expandEditable.visible}
        onBackdropPress={() => setExpanded({ visible: false, route: "" })}
      >
        <Dialog.Title title={expandEditable.visible} />
        <Text>Digite {expandEditable.identifier} para carregar</Text>
        <Input onChangeText={(char) => setIdentifer(char)} />
        <Dialog.Actions>
          <Dialog.Button
            title={excluir ? "EXCLUIR" : "PROCURAR"}
            onPress={() => {
              const route = expanded.route?.toUpperCase();

              if (!excluir) {
                switch (route) {
                  case paths.CLIENTE:
                    navigation.push(paths.CLIENTE, { id: identifier });
                    break;
                  case paths.QUARTO:
                    navigation.push(paths.QUARTO, { id: identifier });
                    break;
                  case paths.APARTAMENTOS:
                    navigation.push(paths.APARTAMENTOS, { id: identifier });
                    break;
                }
              } else {
                switch (route) {
                  case paths.CLIENTE:
                    let sucessCliente = deleteClienteByCpf(identifier);

                    if (sucessCliente) {
                      navigation.push(paths.APARTAMENTOS_LISTAR);
                    }
                    break;
                  case paths.QUARTO:
                    const sucessQuarto = deleteQuartoByNumero(identifier);

                    if (sucessQuarto) {
                      navigation.push(paths.APARTAMENTOS_LISTAR);
                    }
                    break;
                }
              }
            }}
          />

          <Dialog.Button
            title="CANCELAR"
            onPress={() => {
              setExpandEditable({ visible: false, identifier: "" });
              setExcluir(false);
            }}
          />
        </Dialog.Actions>
      </Dialog>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{
          backgroundColor: "rgba(0.5, 0.25, 0, 0.6)",
          padding: 10,
        }}
      >
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

export default ButtonActions;
