// src/screens/CartScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/config";
import { getSession } from "../sessions/sessionDB";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const session = await getSession();
      if (!session) return;

      const cartRef = ref(db, `carritos/${session.uid}`);

      const unsubscribe = onValue(cartRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const items = Object.entries(data).map(([key, value]) => ({
            ...value,
            id: key,
          }));

          const totalAmount = items.reduce(
            (sum, item) => sum + item.price * item.cantidad,
            0
          );

          setCartItems(items);
          setTotal(totalAmount);
        } else {
          setCartItems([]);
          setTotal(0);
        }

        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchCart();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>
          ${item.price} x {item.cantidad}
        </Text>
      </View>
    </View>
  );

  const finalizarPedido = () => {
    Alert.alert("¡Pedido exitoso!", "Gracias por tu compra.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Tu Carrito</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : cartItems.length === 0 ? (
        <Text style={styles.empty}>Tu carrito está vacío</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <Button title="Finalizar pedido" onPress={finalizarPedido} />
        </>
      )}
    </View>
  );
};

export default CartScreen;

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
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  details: { marginLeft: 10, flex: 1, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, marginTop: 5 },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 20,
  },
  empty: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#999" },
});
