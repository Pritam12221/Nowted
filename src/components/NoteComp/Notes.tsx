import { Outlet, useNavigation } from "react-router-dom";
import NoteList from "./components/NoteList";

const Notes = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex w-full h-screen">
        <NoteList />
        <Outlet />
      </div>
    </div>
  );
};

export default Notes;
