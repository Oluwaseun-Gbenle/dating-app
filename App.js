import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/authFunc";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
