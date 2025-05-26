// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import "@/global.css";
// import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
// import { store } from "./src/redux/store";
// import { Provider } from "react-redux";
// import Navigator from "./src/Navigation/Navigator";

// export default function App() {
//   return (
//     <Provider store={store}>
//       <GluestackUIProvider>
//         <NavigationContainer>
//           <Navigator />
//         </NavigationContainer>
//       </GluestackUIProvider>
//     </Provider>
//   );
// }

import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { autenticacion } from "./src/firebase/fiirebaseConf";

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(autenticacion, (currentUser) => {
      console.log("Usuario detectado:", currentUser);
      setUser(currentUser);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Verificando conexión con Firebase...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <Text>¡Usuario conectado: {user.email}!</Text>
      ) : (
        <Text>No hay usuario autenticado.</Text>
      )}
    </View>
  );
}
