import Header from "../components/Header";
import KanbanBoard from "../components/KanbanBoard";

export default function KanbanBoardPage() {
  return (
    <>
      <Header activeTab={"home"} />
      <KanbanBoard />
    </>
  );
}
