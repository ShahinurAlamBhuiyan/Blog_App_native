import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "./../screens/SignUpScreen";
import SignInScreen from "./../screens/SignInScreen";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
