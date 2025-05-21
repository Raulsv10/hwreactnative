import { VStack, Input, Button, Text, Center } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { autenticacion } from "../firebase/fiirebaseConf";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlelogin = async () => {
    try {
      await signInWithEmailAndPassword(autenticacion, email, password);
      navigation.navigate("Home");
    } catch (error) {
      setError("credenciales incorrectas");
    }
  };

  return (
    <Center flex={1} px="$4">
      <VStack space="lg" width="100%">
        <Text size="xl" bold textAling="center">
          {" "}
          Iniciar Sesión
        </Text>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text color="red">{error}</Text> : null}
        <Button onPress={handlelogin}>Iniciar Sesión</Button>
      </VStack>
    </Center>
  );
}
