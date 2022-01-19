import ContentController from "../components/ContentController";
import Header from "../components/Header";
import { SectionsProvider } from "../context/SectionsProvider";

export default function KanbanBoardPage() {
  return (
    <>
      <Header activeTab={"home"} title={"Kanban Board"} />
      <SectionsProvider>
        <ContentController />
      </SectionsProvider>
    </>
  );
}
