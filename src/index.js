import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { ThemeProvider } from "./context/ThemeProvider";
import { ProjectProvider } from "./context/ProjectProvider";
import { SidebarProvider } from "./context/SidebarProvider";
import { UserProvider } from "./context/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ProjectProvider>
        <SidebarProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </SidebarProvider>
      </ProjectProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
