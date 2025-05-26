// src/screens/ItemDetailScreen.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import { getSession } from "../sessions/sessionDB";
import { addToCart } from "../firebase/cartService";

const ItemDetailScreen = ({ route }) => {
  const { item } = route.params;

  const handleAddToCart = async () => {
    const session = await getSession();
    if (!session) return alert("Debes iniciar sesión");

    try {
      await addToCart(session.uid, item);
      alert("Producto agregado al carrito 🛒");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar al carrito");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.images[0] }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.stock}>Stock: {item.stock}</Text>
        <Text style={styles.brand}>Marca: {item.brand}</Text>

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{item.description}</Text>

        <Text style={styles.sectionTitle}>Reseñas</Text>
        {item.reviews?.length > 0 ? (
          <FlatList
            data={item.reviews}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.review}>
                <Text style={styles.reviewer}>{item.reviewerName}</Text>
                <Text style={styles.comment}>“{item.comment}”</Text>
                <Text style={styles.rating}>⭐ {item.rating}/5</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.comment}>Sin reseñas disponibles</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Agregar al carrito" onPress={handleAddToCart} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ItemDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 300, resizeMode: "contain" },
  info: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 22, color: "#0077cc", marginBottom: 5 },
  stock: { fontSize: 14, color: "gray" },
  brand: { fontSize: 14, color: "gray", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  description: { fontSize: 16, marginTop: 5 },
  review: { marginTop: 10, paddingBottom: 10, borderBottomWidth: 0.5 },
  reviewer: { fontWeight: "bold" },
  comment: { fontStyle: "italic", marginVertical: 3 },
  rating: { color: "#f39c12" },
  buttonContainer: { marginTop: 20 },
});
