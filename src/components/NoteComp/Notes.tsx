import { Outlet } from "react-router-dom";
import NoteContent from "./components/NoteContent";
import NoteList from "./components/NoteList";

const Notes = () => {
  return (
    <div className="flex w-full h-screen ">
      <NoteList />
      <Outlet />
    </div>
  );
};

export default Notes;
