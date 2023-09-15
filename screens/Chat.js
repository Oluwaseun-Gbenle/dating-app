import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="m-5 flex-row items-center">
      <Ionicons onPress={()=>navigation.goBack()} name="chevron-back" size={35} color="red" />
      <Text className="font-bold text-xl">Chat</Text>
      </View>
      {/* <View className="bg-slate-100 shadow-md p-5">
      
      </View> */}
    </SafeAreaView>
  )
}

export default Chat