import { Outlet, useLoaderData } from "react-router-dom";
import NoteList from "./components/NoteList";
import { useEffect, useState } from "react";
import type { Notes } from "../../types/type";

const Notes = () => {
  const loadNOte = useLoaderData<Notes[]>();
  console.log(loadNOte);
  const [notes, setNotes] = useState<Notes[]>(loadNOte);

  useEffect(() => {
    setNotes(loadNOte);
  }, [loadNOte]);

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
