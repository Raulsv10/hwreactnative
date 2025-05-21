import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, Image, VStack, Center } from "@gluestack-ui/themed";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/fiirebaseConf";

export default function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const categoriasRef = ref(db, "categorias");
    onValue(categoriasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const array = Object.values(data);
        setCategorias(array);
      }
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductList", {
          categoriaSlug: item.slug,
          nombre: item.nombre,
        })
      }
    >
      <VStack alignItems="center" space="sm" my="$2">
        <Image source={{ uri: item.imagen }} alt={item.nombre} size="xl" />
        <Text size="md" bold>
          {item.nombre}
        </Text>
      </VStack>
    </TouchableOpacity>
  );

  return (
    <Center flex={1}>
      <Text size="xl" bold mb="$4">
        Categorías
      </Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
      />
    </Center>
  );
}
