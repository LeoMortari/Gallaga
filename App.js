import * as React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/pages/login";
import Apartamentos from "./src/pages/apartamentos";
import Quarto from "./src/pages/quarto";
import Cliente from "./src/pages/cliente";

import { paths } from "./src/constants/paths";

const options = {
  default: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#433d3d",
    },
    headerTintColor: "#b7aea5",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerRight: (a) => {
      return (
        <Text
          style={{ color: "#b7aea5" }}
          onPress={() => navigation.push(paths.LOGIN)}
        >
          SAIR
        </Text>
      );
    },
  }),
};

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={paths.LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={paths.APARTAMENTOS}
          component={Apartamentos}
          options={options.default}
        />
        <Stack.Screen
          name={paths.QUARTO}
          component={Quarto}
          options={options.default}
        />
        <Stack.Screen
          name={paths.CLIENTE}
          component={Cliente}
          options={options.default}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
