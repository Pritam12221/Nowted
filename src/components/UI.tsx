import { Outlet } from "react-router-dom";
import LeftBar from "./SideComp/LeftBar";
import "../App.css";
import type { GlobalContextType, Notes } from "../types/type";
import { createContext, useState } from "react";

export const GlobalContext = createContext<GlobalContextType | null>(null);

const UI = () => {
  const [noteList, setNoteList] = useState<Notes | null>(null);

  return (
    <GlobalContext.Provider value={{ noteList, setNoteList }}>
      <div className="flex bg-neutral-900 h-screen w-full text-primary">
        <LeftBar />
        <Outlet />
      </div>
    </GlobalContext.Provider>
  );
};

export default UI;
