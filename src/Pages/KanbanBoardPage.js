import Header from "../components/Header";
import KanbanBoard from "../components/KanbanBoard";
import { SidebarContext } from "../context/SidebarProvider";

export default function KanbanBoardPage() {
  return (
    <>
      <Header activeTab={"home"} />
      <KanbanBoard />
    </>
  );
}
