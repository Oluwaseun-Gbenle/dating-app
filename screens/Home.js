import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import authFunc from "../hooks/authFunc";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { appMembers } from "./Members-data/members";
import { Entypo } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();
  const { user, logout } = authFunc();
  const [logoutBtnVisible, setLogoutBtnVisible] = useState(false);
  const swipeRef = useRef(null);

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-8">
        <View>
          <TouchableOpacity
            onPress={() => setLogoutBtnVisible(!logoutBtnVisible)}
          >
            <Image
              className="h-12 w-12 rounded-full"
              source={{ uri: user.photoURL }}
            />
          </TouchableOpacity>
          {logoutBtnVisible && (
            <TouchableOpacity
              onPress={() => {
                logout();
              }}
              className="border absolute top-12 px-4 w-20  bg-slate-300 rounded-md py-1 border-slate-300"
            >
              <Text>logout</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate("HomeModal")}>
          <Image
            className="h-14 w-14 rounded-full"
            source={require("../assets/tinder-logo.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="chatbubbles-sharp"
            size={30}
            color="#fd6b56"
            onPress={() => navigation.navigate("Chat")}
          />
        </TouchableOpacity>
      </View>
      {/* Header */}

      {/* card */}
      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={appMembers}
          stackSize={8}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {console.log('unmatch')}}
          onSwipedRight={() => {console.log('match')}}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "YES",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) => (
            <View className="relative bg-white h-3/4 rounded-xl">
              <Image
                className="absolute top-0 h-full w-full rounded-xl"
                source={{ uri: card.photoURL }}
              />
              {/* card bottom */}
              <View className="absolute  bottom-0 flex-row items-center justify-between px-6 h-20 bg-white w-full py-2 rounded-b-xl shadow-md">
                <View>
                  <Text className="text-xl font-bold">
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.occupation}</Text>
                </View>

                <View>
                  <Text className="text-2xl font-bold">{card.age}</Text>
                </View>
              </View>
              {/* card bottom */}
            </View>
          )}
        />
      </View>
      {/* card */}

      <View className="flex flex-row justify-evenly mb-4">
        <TouchableOpacity
          onPress={() => {
            swipeRef.current.swipeLeft();
          }}
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            swipeRef.current.swipeRight();
          }}
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
        >
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
