import { View, Text } from 'react-native'
import React from 'react'
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from './screens/Chat';
import Login from './screens/Login';
import authFunc from './hooks/authFunc';

const Stack = createNativeStackNavigator();
const Navigator = () => {
const { user } = authFunc();
  return (
        <Stack.Navigator>
            {!user ? 
          <Stack.Screen name="Login" component={Login} />
            :
            <>
          <Stack.Screen name="Home" component={Home} />  
          <Stack.Screen name="Chat" component={Chat} />
         </>
            }
        </Stack.Navigator>
  )
}

export default Navigator