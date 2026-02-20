import "./App.css";
import LeftBar from "./components/LeftBar";
import Notes from "./components/Notes";

function App() {
  return (
    <>
      <div className="flex bg-neutral-900 h-screen w-full">
        <LeftBar />

        <div className="flex">
          <Notes />
        </div>
      </div>
    </>
  );
}

export default App;
