import React, { useState } from "react";
import Cookie from "js-cookie";

const UserContext = React.createContext([{}, () => {}]);
const userCookie = (Cookie.get('user'));
const parsedCookie = userCookie ? JSON.parse(userCookie) : null;


const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(parsedCookie);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
