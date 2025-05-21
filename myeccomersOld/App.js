import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Navigator from "./src/Navigation/Navigator";

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}
