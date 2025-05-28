import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ref, get } from "firebase/database";
import { db } from "../firebase/config";
import { getSession } from "../sessions/sessionDB";

const ProfileScreen = () => {
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const session = await getSession();
      if (session && session.uid) {
        setUid(session.uid);
      } else {
        Alert.alert("Error", "No se encontró sesión activa");
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const fetchUserData = async () => {
      try {
        const userRef = ref(db, `usuarios/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          Alert.alert("Error", "No se encontró el usuario en la base de datos");
        }
      } catch (error) {
        console.log("Error al obtener perfil:", error);
        Alert.alert("Error", "No se pudo obtener el perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  if (!userData)
    return (
      <Text style={{ marginTop: 100, textAlign: "center" }}>
        Usuario no encontrado
      </Text>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      {userData.photo ? (
        <Image
          source={{ uri: `data:image/jpg;base64,${userData.photo}` }}
          style={styles.image}
        />
      ) : (
        <Text>Sin foto disponible</Text>
      )}
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{userData.email}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
});
