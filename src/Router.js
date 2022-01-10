import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import KanbanBoardPage from "./pages/KanbanBoardPage";
import About from "./pages/About";

export default function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/kanban-board" element={<KanbanBoardPage />} />
        <Route exact path="/kanban-board/about" element={<About />} />
        <Route path="/kanban-board/project/:id" element={<KanbanBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
