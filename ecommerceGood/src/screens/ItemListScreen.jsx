// src/screens/ItemListScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/config";

const ItemListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const catalogRef = ref(db, "products");

    const unsubscribe = onValue(catalogRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const filtered = data.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered);
      } else {
        setProducts([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [category]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ItemDetail", { item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos: {category}</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default ItemListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "600", textAlign: "center" },
  price: { fontSize: 16, color: "#0077cc", marginTop: 5 },
});
