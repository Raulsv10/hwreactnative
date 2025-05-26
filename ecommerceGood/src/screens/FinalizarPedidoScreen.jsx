// src/screens/FinalizarPedidoScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ref, get, set, remove } from "firebase/database";
import { db } from "../firebase/config";
import { getSession } from "../sessions/sessionDB";

const FinalizarPedidoScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const session = await getSession();
      if (!session) return;

      setUid(session.uid);
      const cartRef = ref(db, `carritos/${session.uid}`);
      const snapshot = await get(cartRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const items = Object.entries(data).map(([key, value]) => ({
          ...value,
          id: key,
        }));

        const totalAmount = items.reduce(
          (sum, item) => sum + item.price * item.cantidad,
          0
        );

        setCart(items);
        setTotal(totalAmount);
      } else {
        setCart([]);
        setTotal(0);
      }

      setLoading(false);
    };

    fetchCart();
  }, []);

  const handleConfirm = async () => {
    const pedidoRef = ref(db, `pedidos/${uid}/${Date.now()}`);
    await set(pedidoRef, {
      items: cart,
      total,
      fecha: new Date().toISOString(),
    });

    await remove(ref(db, `carritos/${uid}`));

    Alert.alert("¡Gracias!", "Tu pedido ha sido realizado.");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Pedido</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : cart.length === 0 ? (
        <Text>No hay productos en tu carrito.</Text>
      ) : (
        <>
          <Text style={styles.total}>Total a pagar: ${total.toFixed(2)}</Text>
          <Button title="Confirmar pedido" onPress={handleConfirm} />
        </>
      )}
    </View>
  );
};

export default FinalizarPedidoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  total: { fontSize: 18, marginBottom: 30 },
});
