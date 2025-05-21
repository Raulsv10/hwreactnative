import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Text, Image, VStack, Center } from "@gluestack-ui/themed";
import { onValue, set } from "firebase/database";

export default function ProductList({ route, navigation }) {
  const { setCategoria, categoria } = route.params;
  cont[(productos, setProductos)] = useState([]);

  useEffect(() => {
    const producttosRef = ref(db, "productos");
    onValue(producttosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filtrado = object
          .values(data)
          .filter((f) => f.categoria === categoria);
        setProductos(filtrado);
      }
    });
  }, []);

  const renderitem = ({ item }) => (
    <TouchableOpacity
      Onpress={() => navigation.navigate("ProductDetail", { producto: item })}
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
        {categoria}
      </Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.categoria}
        renderItem={renderitem}
      />
    </Center>
  );
}
