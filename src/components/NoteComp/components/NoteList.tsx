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
            className={({ isActive }) =>
              ` w-fixed px-3 py-3 rounded-lg bg-primary-button hover:bg-zinc-700 hover:bg-primary-button-hover flex flex-col gap-2 transition-all ease-in-out ${isActive ? "bg-primary-hover" : ""}`
            }
          >
            <Note value={items} />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
