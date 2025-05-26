import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const dbRef = ref(db, "/productos"); // Ajusta la ruta si tus datos están en otro lugar
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      const parsedData = val
        ? Object.entries(val).map(([id, item]) => ({ id, ...item }))
        : [];
      setData(parsedData);
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiar suscripción
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Products", { category: item.nombre })}
    >
      <Text style={styles.title}>{item.nombre}</Text>
      <Text>${item.precio}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos Disponibles</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    padding: 15,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
