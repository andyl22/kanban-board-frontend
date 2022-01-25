import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import KanbanBoardPage from "./pages/KanbanBoardPage";
import About from "./pages/About";
import Settings from "./pages/Settings";

export default function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/kanban-board" element={<KanbanBoardPage />} />
        <Route exact path="/kanban-board/about" element={<About />} />
        <Route exact path="/kanban-board/settings" element={<Settings />} />
        <Route eaxct path="/kanban-board/project/:id" element={<KanbanBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
