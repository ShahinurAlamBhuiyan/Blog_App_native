import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "./../components/Loading";

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.viewStyle}>
        <Card wrapperStyle={{backgroundColor: "#454545", padding: 20}}>
          <Card.Title  style={{color: "white"}}>Welcome to Blog App!</Card.Title>
          <Card.Divider />
          <Input

            style={{color: "white"}}
            leftIcon={<Ionicons name="ios-person" size={24} color="white" />}
            placeholder="Name"
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input

style={{color: "white"}}
            leftIcon={<Ionicons name="ios-school" size={24} color="white" />}
            placeholder="Student ID"
            onChangeText={function (currentInput) {
              setSID(currentInput);
            }}
          />
          <Input

style={{color: "white"}}
            leftIcon={<FontAwesome name="envelope" size={24} color="white" />}
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
            icon={<AntDesign name="user" size={24} color="white" />}
            title="  Sign Up!"
            type="solid"
            onPress={() => {
              if (Name && SID && Email && Password) {
                setIsLoading(true);
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(Email, Password)
                  .then((userCreds) => {
                    userCreds.user.updateProfile({ displayName: Name });
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(userCreds.user.uid)
                      .set({
                        name: Name,
                        sid: SID,
                        email: Email,
                      })
                      .then(() => {
                        setIsLoading(false);
                        alert("Account created successfully!!!");
                        props.navigation.navigate("SignIn");
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      });
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                  });
              } else {
                alert("Fields can not be empty!");
              }
            }}
          />
          <Button
            type="clear"
            icon={<AntDesign name="login" size={24} color="dodgerblue" />}
            title="  Already have an account?"
            onPress={function () {
              props.navigation.navigate("SignIn");
            }}
          />
        </Card>
      </View>
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
export default SignUpScreen;
