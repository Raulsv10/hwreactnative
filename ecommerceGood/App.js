import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ItemListScreen from "./src/screens/ItemListScreen";
import ItemDetailScreen from "./src/screens/ItemDetailScreen";
import CartScreen from "./src/screens/CartScreen";
import FinalizarPedidoScreen from "./src/screens/FinalizarPedidoScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Cart")}
              >
                <Ionicons name="cart-outline" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Ionicons name="person-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          ),
        })}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ItemList" component={ItemListScreen} />
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="FinalizarPedido"
          component={FinalizarPedidoScreen}
          options={{ title: "Finalizar Pedido" }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
