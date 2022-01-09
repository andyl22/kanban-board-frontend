import React, { useState } from "react";
import Cookie from "js-cookie";

const UserContext = React.createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(Cookie.get('user'));

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
