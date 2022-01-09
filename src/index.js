import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { ThemeProvider } from "./context/ThemeProvider";
import { SidebarProvider } from "./context/SidebarProvider";
import { UserProvider } from "./context/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
