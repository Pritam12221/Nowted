import {
  Archive,
  CalendarDays,
  Ellipsis,
  Folder,
  Star,
  Trash2,
} from "lucide-react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";

import { format } from "date-fns";
import { useState } from "react";
import {
  changeArchive,
  changeFavorite,
  deleteNote,
} from "../../../services/MoreApi";
import NoteContentSkeleton from "../../SkeletonsLoaders/NoteContentLoader";
import RestoreNote from "./RestoreNotes";

const NoteContent = () => {
  const navigation = useNavigation();
  const loadState = navigation.state === "loading";
  console.log("inside noteConte", loadState);
  const note = useLoaderData();
  const newDate = format(new Date(note.createdAt), "dd/MM/yyyy");
  const [more, setMore] = useState(false);
  const [fav, setFav] = useState(note.isFavorite);
  const [archive, setArchive] = useState(note.isArchived);
  const rollBack = useNavigate();
  const handleArchive = async () => {
    await changeArchive(note.id, note.isArchived);
    setArchive(!archive);
    setMore(false);
    rollBack(-1);
  };

  const handleFavorite = async () => {
    await changeFavorite(note.id, note.isFavorite);
    setFav(!fav);
    setMore(false);
  };

  const handleDelete = async () => {
    await deleteNote(note.id);
    setMore(false);
    rollBack(-1);
  };

  if (loadState) {
    return <NoteContentSkeleton />;
  }

  if (note.isArchived) {
    console.log(archive);
    return <RestoreNote />;
  }
  return (
    <div className="w-full  overflow-hidden px-10 py-10 text-white h-screen">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-4xl font-bold truncate">{note.title}</h1>

        <div className="relative">
          <button
            onClick={() => setMore((prev) => !prev)}
            className="p-2 rounded-full border border-zinc-600 text-zinc-400 hover:text-white hover:border-zinc-400 transition-all cursor-pointer "
          >
            <Ellipsis size={18} />
          </button>

          {more && (
            <>
              <div //overlay
                className="fixed inset-0 z-10"
                onClick={() => setMore(false)}
              />

              <div className="flex flex-col items-center justify-center  absolute right-0 mt-2 w-52 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden  text-lg">
                <button
                  onClick={() => {
                    handleFavorite();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3  text-zinc-200 hover:bg-zinc-700 transition-colors ${archive ? "none" : "block"}`}
                >
                  <Star size={18} className="text-zinc-400" />
                  {fav === true ? "Unfav" : "Fav"}
                </button>

                <button
                  onClick={() => {
                    handleArchive();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3  text-zinc-200 hover:bg-zinc-700 transition-colors"
                >
                  <Archive size={18} className="text-zinc-400" />
                  {archive !== true ? "Archive" : "UnArchive"}
                </button>

                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3  text-zinc-200  hover:text-red-400 ${archive ? "none" : "block"}`}
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8 border-b border-zinc-700 pb-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-zinc-500 w-28">
            <CalendarDays size={16} />
            <h2 className="text-sm">Date</h2>
          </div>
          <h2 className="text-sm text-zinc-300 underline underline-offset-2">
            {newDate}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-zinc-500 w-28">
            <Folder size={16} />
            <h2 className="text-sm">Folder</h2>
          </div>
          <h2 className="text-sm text-zinc-300 underline underline-offset-2">
            {note.folder?.name}
          </h2>
        </div>
      </div>

      <div className="text-zinc-200 text-sm leading-7 overflow-hidden ">
        {note.content ?? "NO contents available"}
      </div>
    </div>
  );
};

export default NoteContent;
