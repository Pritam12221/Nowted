import { Outlet, useLoaderData } from "react-router-dom";
import NoteList from "./components/NoteList";
import { useEffect, useState } from "react";
import type { Notes } from "../../types/type";

const NotesWrapper = () => {
  const loadNOte = useLoaderData<Notes[]>();
  console.log(loadNOte);
  const [notes, setNotes] = useState<Notes[]>(loadNOte);

  useEffect(() => {
    setNotes(loadNOte);
  }, [loadNOte]);
  
//update notelist based on the note content component
  const updateNoteList = (id: string, updates: Partial<Notes>) => {
    setNotes((items) =>
      items.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    );
  };
  return (
    <div className="flex w-full h-screen">
      <NoteList notes={notes} />
      <Outlet context={{ notes, updateNoteList }} />
    </div>
  );
};

export default NotesWrapper;
