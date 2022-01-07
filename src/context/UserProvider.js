import  React, {useState} from 'react';

const UserContext = React.createContext([{}, () => {}]);

const UserProvider = ({children}) => {
  return (
    <UserProvider value={{}}>
      {children}
    </UserProvider>
  )
}

export {UserProvider, UserContext};