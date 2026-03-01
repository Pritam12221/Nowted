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
      setNotes((items) => {
        if (items.some((n) => n.id === globalData.noteList!.id)) return items;
        return [globalData.noteList!, ...items];
      });
      globalData.setNoteList(null);
    }
  }, [globalData?.noteList]);

  const removeNote = (id: string) => {
    setNotes((items) => items.filter((n) => n.id !== id));
  };

  const updateNoteList = (id: string, updates: Partial<Notes>) => {
    setNotes((items) =>
      items.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    );
  };
  return (
    <div className="flex w-full h-screen">
      <div className="flex w-full h-screen">
        <NoteList notes={notes} />
        <Outlet context={{ notes, removeNote, updateNoteList }} />
      </div>
    </div>
  );
};

export default Notes;
