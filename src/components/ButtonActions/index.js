import { View, Text } from "react-native";
import React, { useState } from "react";
import { BottomSheet, Button, ListItem } from "react-native-elements";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { paths } from "../../constants/paths";

const ButtonActions = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);

  const list = [
    {
      title: "Cliente",
      containerStyle: { backgroundColor: "#b7aea5" },
      titleStyle: { color: "#221d21", fontWeight: "bold" },
      onPress: () => navigation.push(paths.CLIENTE),
    },
    {
      title: "Hóspede",
      containerStyle: { backgroundColor: "#b7aea5" },
      titleStyle: { color: "#221d21", fontWeight: "bold" },
    },
    {
      title: "Apartamento",
      containerStyle: { backgroundColor: "#b7aea5" },
      titleStyle: { color: "#221d21", fontWeight: "bold" },
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
