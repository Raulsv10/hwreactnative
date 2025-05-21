import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Registro from "../screens/Registro";

const stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="Registro" component={Registro} />
      <stack.Screen name="Home" component={Home} />
    </stack.Navigator>
  );
}
