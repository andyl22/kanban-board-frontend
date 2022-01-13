import KanbanBoard from "../components/KanbanBoard";
import Header from "../components/Header";

export default function KanbanBoardPage() {
  return (
    <>
      <Header activeTab={"home"} title={"Kanban Board"} />
      <KanbanBoard />
    </>
  );
}
