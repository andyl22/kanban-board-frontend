import React, { useState } from "react";

const SidebarContext = React.createContext([{}, () => {}]);

const SidebarProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <SidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, SidebarContext };
