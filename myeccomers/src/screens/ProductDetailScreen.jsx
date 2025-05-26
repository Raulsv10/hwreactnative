import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { VStack, Text, Image, Button, Center } from "@gluestack-ui/themed";

export default function ProductDetailScreen({ route, navigation }) {
  const { producto } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(producto));
    navigation.goBack();
  };

  return (
    <Center flex={1} px="$4">
      <VStack space="md" alignItems="center">
        <Image
          source={{ uri: producto.imagen }}
          alt={producto.nombre}
          size="2xl"
        />
        <Text size="xl" bold>
          {producto.nombre}
        </Text>
        <Text size="md" italic textAlign="center">
          {producto.descripcion}
        </Text>
        <Text size="lg" bold>
          ${producto.precio}
        </Text>
        <Button onPress={handleAddToCart}>Agregar al carrito</Button>
      </VStack>
    </Center>
  );
}
