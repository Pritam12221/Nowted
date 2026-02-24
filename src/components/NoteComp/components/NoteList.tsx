import { NavLink, useLoaderData, useParams } from "react-router-dom";
import type { Notes } from "../../../types/type";
import Note from "./Note";

const NoteList = () => {
  const notes = useLoaderData();
  const { folder } = useParams();
  console.log("inside noteList", notes);
  return (
    <div className="w-120 h-screen bg-zinc-800 flex flex-col gap-3 pt-12 px-6 text-white ">
      <h2 className="text-white text-lg pb-10 font-bold">{folder}</h2>
      {notes?.map((items: Notes) => (
        <div key={items.id}>
          <NavLink
            to={`notes/${items.id}`}
            className=" w-fixed px-3 py-3 bg-primary-button flex flex-col gap-2"
          >
            <Note value={items} />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
