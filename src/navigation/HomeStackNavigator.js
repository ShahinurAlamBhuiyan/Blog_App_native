import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import CommentScreen from "../screens/CommentScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeStack"
            component={HomeScreen}
            options={{headerShown: false}}
        />

    <Stack.Screen
            name="CommentScreen"
            component={CommentScreen}
            // options={{headerShown: false}}
            
        />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator