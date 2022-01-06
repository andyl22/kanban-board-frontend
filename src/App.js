import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header activeTab={"home"}/>
      <KanbanBoard/>
    </div>
  );
}

export default App;
