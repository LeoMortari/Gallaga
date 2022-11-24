import * as React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

import store from "./src/components/redux/store";

import Apartamentos from "./src/pages/apartamentos";
import ApartamentosCadastrar from "./src/pages/apartamentos/Form";
import Cadastro from "./src/pages/cadastro";
import Cliente from "./src/pages/cliente";
import Login from "./src/pages/login";
import Quarto from "./src/pages/quarto";
import QuartoCadastrar from "./src/pages/quarto/Form";
import Historico from "./src/pages/historico";

import { paths } from "./src/constants/paths";

const options = {
  padrao: ({ navigation }) => ({
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
  apartamentos: ({ navigation }) => ({
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
    title: "APARTAMENTOS",
  }),
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const { apartamentos, padrao } = options;

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name={paths.LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={paths.APARTAMENTOS_LISTAR}
            component={Apartamentos}
            options={apartamentos}
          />
          <Stack.Screen
            name={paths.APARTAMENTOS}
            component={ApartamentosCadastrar}
            options={padrao}
          />
          <Stack.Screen
            name={paths.CADASTRO}
            component={Cadastro}
            options={{ ...padrao, headerShown: false }}
          />
          <Stack.Screen
            name={paths.HISTORICO}
            component={Historico}
            options={padrao}
          />
          <Stack.Screen
            name={paths.QUARTO_LISTAR}
            component={Quarto}
            options={padrao}
          />
          <Stack.Screen
            name={paths.QUARTO}
            component={QuartoCadastrar}
            options={padrao}
          />
          <Stack.Screen
            name={paths.CLIENTE}
            component={Cliente}
            options={padrao}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
