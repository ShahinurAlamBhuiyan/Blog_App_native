import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import Loading from "./../components/Loading";
const SignInScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <Card wrapperStyle={{backgroundColor: "#454545", padding: 25}}>
              <Card.Title style={{color: "white", fontSize: 18}}>- LET'S SHARE YOUR EXPERIENCE -</Card.Title>
              <Card.Divider />
              <Input
                leftIcon={
                  <FontAwesome name="envelope" size={24} color="white" />
                }
                style={{color: "white"}}
                placeholder="E-mail Address"
                onChangeText={function (currentInput) {
                  setEmail(currentInput);
                }}
              />

              <Input
                style={{color: "white"}}
                placeholder="Password"
                leftIcon={<Feather name="key" size={24} color="white" />}
                secureTextEntry={true}
                onChangeText={function (currentInput) {
                  setPassword(currentInput);
                }}
              />

              <Button
                icon={<AntDesign name="login" size={24} color="white"/>}
                title="  Sign In!"
                type="solid"
                onPress={() => {
                  setIsLoading(true);
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(Email, Password)
                    .then((userCreds) => {
                      setIsLoading(false);
                      auth.setIsLoggedIn(true);
                      auth.setCurrentUser(userCreds.user);
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      alert(error);
                    });
                }}
              />
              <Button
                type="clear"
                icon={<AntDesign name="user" size={24} color="dodgerblue"/>}
                title="  Don't have an account?"
                onPress={function () {
                  props.navigation.navigate("SignUp");
                }}
              />
            </Card>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "skyblue",
  },
});
export default SignInScreen;
