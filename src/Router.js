import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ProjectList from "./Pages/ProjectList";
import KanbanBoardPage from "./Pages/KanbanBoardPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/kanban-board-frontend" element={<KanbanBoardPage />} />
        <Route exact path="/kanban-board-frontend/project-list" element={<ProjectList />} />
      </Routes>
    </BrowserRouter>
  );
}
