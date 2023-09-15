import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import authFunc from "../hooks/authFunc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HomeModal = () => {
  const navigation = useNavigation();
  const { user, logout } = authFunc();
  const [image, setImage] = useState(null);
  const [occupation, setOccupation] = useState("dan");
  const [age, setAge] = useState(null);
  const incompleteForm = !age || !occupation || !image;
 const setUserDetails = () => {
  AsyncStorage.setItem("userDetails",
      JSON.stringify({
        firstName: user.name,
        lastName: "Gee",
        occupation,
        photoURL: image,
        age,
        id: "1gjgggh4556",
      })
    ).then(navigation.navigate("Home"));
    }

  return (
    <View className="m-5 flex-1 items-center">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={require("../assets/tinder-longer.png")}
      />

      <Text className="text-gray-500 font-bold text-lg">
        Welcome {user.name}
      </Text>

      <View className="mt-4">
        <Text className="text-center text-red-500 text-lg">
          Step 1: Profile Pic
        </Text>
        <TextInput
          value={image}
          onChangeText={(val) => {
            setImage(val);
          }}
          className="text-center text-lg h-20"
          placeholder="Enter Profile URL"
        />
      </View>

      <View>
        <Text className="text-red-500 text-center text-lg">
          Step 2: Occupation
        </Text>
        <TextInput
          value={occupation}
          onChangeText={(val) => {
            setOccupation(val);
          }}
          className="text-center text-lg h-20"
          placeholder="Enter Occupation"
        />
      </View>

      <View>
        <Text className="text-red-500 text-center text-lg">Step 3: Age</Text>
        <TextInput
          value={age}
          onChangeText={(val) => {
            setAge(val);
          }}
          className="text-lg text-center h-20"
          keyboardType="numeric"
          placeholder="Enter Age"
        />
      </View>

      <TouchableOpacity
      onPress={()=> {setUserDetails()}}
        disabled={incompleteForm}
        className={`${
          incompleteForm ? "bg-gray-400" : "bg-red-400 "
        } absolute bottom-20 py-3 rounded-xl px-16`}
      >
        <Text className="text-white text-center text-xl font-semibold">
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeModal;
