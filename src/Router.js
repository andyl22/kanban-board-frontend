import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import App from "./App";
import ProjectList from "./Pages/ProjectList";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/project-list" element={<ProjectList />} />
      </Routes>
    </BrowserRouter>
  );
}
