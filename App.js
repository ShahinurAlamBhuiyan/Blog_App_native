import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";
import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDIyjXj18DxKg7JFP222XVDK6fUqILHEXI",
  authDomain: "blog-app-2f3dd.firebaseapp.com",
  databaseURL: "https://blog-app-2f3dd-default-rtdb.firebaseio.com/",
  projectId: "blog-app-2f3dd",
  storageBucket: "blog-app-2f3dd.appspot.com",
  messagingSenderId: "20033954884",
  appId: "1:20033954884:web:fa6e1254cf88e95b22c811"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function App() {
  
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
