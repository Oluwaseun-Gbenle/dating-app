import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import authFunc from "../hooks/authFunc";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { appMembers } from "./Members-data/members";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  const { user, logout } = authFunc();
  const [logoutBtnVisible, setLogoutBtnVisible] = useState(false);
  const swipeRef = useRef(null);
  const [userDetails, setUserDetails] = useState(null);

  //get item from async store with .then because it is a promise by default
  const getData = async () => {
    try {
      const userDetailsStored = await AsyncStorage.getItem("userDetails");
      const details =
        userDetailsStored != null ? JSON.parse(userDetailsStored) : null;
      setUserDetails(details);
      return details;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  useEffect(() => {
    //route to fill userDetails on homeModal if there is none
    !userDetails &&
      getData().then((data) => {
        if (!data) {
          navigation.navigate("HomeModal");
        }
      });
  }, [userDetails]);

  const swipeRight = (cardIndex) => {
    //create matches array in userDetails
    if (!userDetails.matches) {
      userDetails.matches = [appMembers[cardIndex].id];
    } else {
      userDetails.matches.push(appMembers[cardIndex].id);
    }
    //route on mutual match
    appMembers[cardIndex].matches?.find((match) => match === userDetails.id) &&
      navigation.navigate("MatchedPeers", {
        matchedPeer: appMembers[cardIndex],
        user: userDetails,
      });
  };

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

        <TouchableOpacity onPress={() => navigation.navigate("HomeModal")}>
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
        <View className="mt-20 bg-white h-3/4 rounded-xl justify-center item-center shadow-md">
          <Text className="font-bold text-center pb-5 text-xl">
            No more profiles
          </Text>
          <Image
            className="w-full h-1/5"
            resizeMode="contain"
            source={{
              uri: "https://i.ibb.co/7j8RN2v/crying-emoji-sad-emoticon-face-with-tear-drop-free-vector.jpg",
            }}
          />
        </View>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={appMembers}
          stackSize={8}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("unmatch");
          }}
          onSwipedRight={(cardIndex) => {
            console.log("match");
            swipeRight(cardIndex);
          }}
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
          renderCard={(card, idx) =>
            card && (
              <View key={idx} className="relative bg-white h-3/4 rounded-xl">
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
            )
          }
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
