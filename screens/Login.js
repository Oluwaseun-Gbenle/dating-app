import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import authFunc from "../hooks/authFunc";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const Login = () => {
  const { signInWithGoogle, user, loading } = authFunc(); //inbuilt hook
  const navigation = useNavigation();
  
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
        className="flex-1"
      />
      <TouchableOpacity
        onPress={signInWithGoogle}
        style={{ marginHorizontal: "25%" }}
        className="absolute bottom-40 bg-white p-4 w-52 rounded-2xl"
      >
        <Text className="font-semibold text-center">Sign in & get swiping</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
