import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { ThemeProvider } from "./context/ThemeProvider";
import { SidebarProvider } from "./context/SidebarProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
