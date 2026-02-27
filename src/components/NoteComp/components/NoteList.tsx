import {
  NavLink,
  useLoaderData,
  useLocation,
  useNavigation,
  useParams,
} from "react-router-dom";
import type { Notes } from "../../../types/type";
import Note from "./Note";
import NoteListSkeleton from "../../SkeletonsLoaders/NoteListLoader";
import { useState } from "react";

const NoteList = () => {
  const navigation = useNavigation();
  const notes = useLoaderData();
  const location = useLocation();
  const categoryName = location.pathname.split("/")[1].toUpperCase();
  const { folder } = useParams();

  return (
    <div className="w-[30%] h-screen bg-zinc-800 flex flex-col gap-3 pt-12 px-6 text-white overflow-y-auto scroll">
      <h2 className="text-white text-lg pb-10 font-bold">
        {folder ? folder : categoryName}
      </h2>
      {notes?.map((items: Notes) => (
        <div key={items.id}>
          <NavLink
            to={`notes/${items.id}`}
            className={({ isActive }) =>
              ` w-fixed px-3 py-3 rounded-lg bg-primary-button hover:bg-zinc-700 flex flex-col gap-2 transition-all ease-in-out ${isActive ? "bg-primary-hover" : ""}`
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
