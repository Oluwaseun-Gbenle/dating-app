import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchedPeers = () => {
  const { params } = useRoute();
  const { matchedPeer, user } = params;
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-red-500 flex-1 opacity-90">
      <View className="pt-20">
        <View className="items-center">
        <Image
          resizeMode="contain"
          className="h-20 w-1/2"
          source={require("../assets/tinder-match.png")}
        />
        </View>
        <Text className="text-white font-bold text-center mt-2">
          You and {matchedPeer.firstName} {matchedPeer.lastName} have liked
          eachother
        </Text>
        <View className="flex-row justify-evenly mt-5 items-center">
          <Image
            className="h-40 w-40 rounded-full"
            source={{ uri: matchedPeer.photoURL }}
          />
          <Image
            className="h-40 w-40 rounded-full"
            source={{ uri: user.photoURL }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          className="rounded-3xl bg-white mt-20 py-5 mx-12"
        >
          <Text className="text-center">Start Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MatchedPeers;
