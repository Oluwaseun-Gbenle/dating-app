import { View, Text } from "react-native";
import React from "react";
import Home from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import authFunc from "./hooks/authFunc";
import HomeModal from "./screens/HomeModal";

const Stack = createNativeStackNavigator();
const Navigator = () => {
  const { user } = authFunc();
  return (
    //header:false to remove header from ui
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="HomeModal" component={HomeModal} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
