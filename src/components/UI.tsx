import { Outlet } from "react-router-dom";
import Notes from "./NoteComp/Notes";
import LeftBar from "./SideComp/LeftBar";
import "../App.css";

const UI = () => {
  return (
    <>
      <div className="flex bg-neutral-900 h-screen w-full text-primary">
        <LeftBar />

        <div className="flex w-full h-screen bg-amber-400">
          <Notes />
        </div>
      </div>
    </>
  );
};

export default UI;
