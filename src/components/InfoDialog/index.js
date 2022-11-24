import React from "react";
import { Dialog } from "react-native-elements";
import { Label } from "./styles";

export default function InfoDialog({ open, message, onBackdropPress, title }) {
  return (
    <>
      <Dialog
        isVisible={open}
        onBackdropPress={() => onBackdropPress(false)}
        overlayStyle={{ backgroundColor: "#221d21" }}
      >
        <Dialog.Title title={title} titleStyle={{ color: "#e33c08" }} />
        <Label>{message}</Label>
        <Dialog.Actions>
          <Dialog.Button title="OK" onPress={() => onBackdropPress(false)} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
