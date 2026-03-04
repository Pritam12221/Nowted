import { Outlet } from "react-router-dom";
import LeftBar from "./SideComp/LeftBar";
import "../App.css";
import type { GlobalContextType, Notes } from "../types/type";
import { createContext, useState } from "react";
import { getRecentNotes } from "../services/NotesApi";
import { Toaster } from "react-hot-toast";

export const GlobalContext = createContext<GlobalContextType | null>(null);
const UI = () => {
  const [recent, setRecent] = useState<Notes[]>([]);
  const [dropdownFetch, setdropdownFetch] = useState(false);

  const dropdownRefresh = () => {
    setdropdownFetch((prev) => !prev);
  };
  const fetchRecent = async () => {
    try {
      const res = await getRecentNotes();
      setRecent(res.data.recentNotes);
    } catch (error) {
      console.error("Error occured", error);
    }
  };

  return (
    <GlobalContext.Provider value={{ fetchRecent, recent, dropdownRefresh }}>
      <div className="flex bg-neutral-900 h-screen w-full text-primary">
        <Toaster
          position="bottom-right"
          containerStyle={{ bottom: 40, right: 40 }}
        />
        <LeftBar />
        <Outlet />
      </div>
    </GlobalContext.Provider>
  );
};

export default UI;
