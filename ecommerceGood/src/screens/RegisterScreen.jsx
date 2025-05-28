import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState("front");

  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  const handleOpenCamera = async () => {
    if (!permission || !permission.granted) {
      const perm = await requestPermission();
      if (!perm.granted) {
        Alert.alert(
          "Permiso denegado",
          "Se requiere acceso a la cámara para tomar una foto."
        );
        return;
      }
    }
    setShowCamera(true);
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.7,
        });
        setImageBase64(photo.base64);
        setShowCamera(false);
      } catch (error) {
        console.error("Error al tomar la foto:", error);
        Alert.alert("Error", "No se pudo tomar la foto");
      }
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !imageBase64) {
      Alert.alert(
        "Campos incompletos",
        "Por favor completa todos los campos antes de registrarte"
      );
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const db = getDatabase();
      await set(ref(db, "usuarios/" + user.uid), {
        email: user.email,
        uid: user.uid,
        photo: imageBase64,
      });

      Alert.alert(
        "Registro exitoso",
        "El usuario ha sido registrado correctamente"
      );
      setEmail("");
      setPassword("");
      setImageBase64(null);
    } catch (error) {
      console.error("Error en registro:", error);
      Alert.alert("Error en registro", error.message);
    }
  };

  if (showCamera) {
    if (!permission) {
      return (
        <View style={styles.cameraContainer}>
          <Text style={styles.permissionText}>
            Solicitando permiso de cámara...
          </Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.cameraContainer}>
          <Text style={styles.permissionText}>
            Se requiere permiso para usar la cámara
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Conceder permiso</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.fullCamera} facing={facing}>
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleTakePicture}
            >
              <Text style={styles.captureButtonText}>Tomar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setFacing(facing === "back" ? "front" : "back")}
            >
              <Text style={styles.flipButtonText}>Flip</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {imageBase64 && (
        <Image
          source={{ uri: "data:image/jpg;base64," + imageBase64 }}
          style={styles.previewImage}
        />
      )}

      <TouchableOpacity style={styles.photoButton} onPress={handleOpenCamera}>
        <Text style={styles.photoButtonText}>
          {imageBase64 ? "Cambiar Foto" : "Tomar Foto"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  previewImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 50,
  },
  photoButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  photoButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  fullCamera: {
    flex: 1,
    width: "100%",
  },
  cameraControls: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  cancelButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  flipButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  permissionText: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  permissionButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  permissionButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
