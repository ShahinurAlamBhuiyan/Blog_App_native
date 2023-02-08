import React, { useState } from "react";

 const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [CurrentUser, setCurrentUser] = useState({});
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(CurrentUser);
  return (
    <AuthContext.Provider
      value={{
        CurrentUser: CurrentUser,
        setCurrentUser: setCurrentUser,
        IsLoggedIn: IsLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext,AuthProvider };
