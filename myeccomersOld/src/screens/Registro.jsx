import { err } from "react-native-svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  VStack,
  Input,
  Button,
  Text,
  Center,
  Pressable,
  Image,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { db, autenticacion } from "../firebase/fiirebaseConf";

export default function Registro({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmaPassword, setConfirmaPassword] = useState("");
  const [error, setError] = useState("");

  const [CameraPermission, setCameraPermission] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [cameraAbrir, setCameraAbrir] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhotoBase64(photo.base64);
      setCameraAbrir(false);
    }
  };

  const getUbicacion = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      return { lat: location.coords.latitude, lng: location.coords.longitude };
    } else {
      throw new Error("No se pudo obtener la ubicacion");
    }
  };

  const handleRegistro = async () => {
    if (password !== confirmaPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (!photoBase64) {
      setError("Por favor, tome una foto de perfil");
      return;
    }
    try {
      const location = await getUbicacion();
      await createUserWithEmailAndPassword(autenticacion, email, password);
      const userId = userCredential.user.uid;

      await set(ref(db, "usuarios/" + userId), {
        email,
        fotoBase64: photoBase64,
        ubicacion: location,
      });
      navigation.navigate("Home");
    } catch (error) {
      setError("Erorr al registrar: " + error.message);
    }
  };

  if (cameraAbrir) {
    return (
      <Center flex={1}>
        <Camera
          ref={cameraRef}
          style={{ width: 300, height: 400 }}
          type={Camera.Constants.Type.font}
        />
        <button mt="$2" onPress={takePicture}>
          Tomar Foto
        </button>
      </Center>
    );
  }

  return (
    <Center flex={1} px="$4">
      <VStack space="lg" width="100%">
        <Text size="xl" bold textAling="center">
          {" "}
          Registrate{" "}
        </Text>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          type="password"
        />
        <Input
          placeholder="Confirmar Contraseña"
          value={confirmaPassword}
          onChange={setConfirmaPassword}
          type="password"
        />

        {photoBase64 ? (
          <Image
            souce={{ uri: `data:image/jpeg;base64,${photoBase64}` }}
            alt="Preview"
            size="xl"
            alingSelf="center"
          />
        ) : (
          <Button onPress={() => setCameraAbrir(true)}>Tomar Foto</Button>
        )}

        {error ? <Text color="red">{error}</Text> : null}

        <Button onPress={handleRegistro}>Registrar</Button>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text textAling="center" mt="$2" underline color="blue">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Text>
        </Pressable>
      </VStack>
    </Center>
  );
}
