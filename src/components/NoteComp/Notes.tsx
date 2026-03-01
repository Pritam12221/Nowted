import { Outlet, useLoaderData } from "react-router-dom";
import NoteList from "./components/NoteList";
import { useContext, useEffect, useState } from "react";
import type { Notes } from "../../types/type";
import { GlobalContext } from "../UI";

const Notes = () => {
  const loadNOte = useLoaderData<Notes[]>();
  console.log(loadNOte);
  const [notes, setNotes] = useState<Notes[]>(loadNOte);
  const globalData = useContext(GlobalContext);

  useEffect(() => {
    setNotes(loadNOte);
  }, [loadNOte]);

  useEffect(() => {
    if (globalData?.noteList) {
      setNotes((prev) => {
        if (prev.some((n) => n.id === globalData.noteList!.id)) return prev;
        return [globalData.noteList!, ...prev];
      });
      globalData.setNoteList(null);
    }
  }, [globalData?.noteList]);

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex w-full h-screen">
        <NoteList notes={notes} />
        <Outlet context={{ notes, removeNote }} />
      </div>
    </div>
  );
};

export default Notes;
