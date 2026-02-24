import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import type { Notes } from "../../../types/type";
import { getRecentNotes } from "../../../services/NotesApi";

const Recent = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await getRecentNotes();
        setRecent(res.data.recentNotes);
      } catch (error) {
        console.error("Error occured", error);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="h-1/5  w-full  pt-5">
      <h6 className=" text-bold px-10">Recents</h6>
      <div className="flex flex-col gap-2 ">
        {recent.map((items: Notes) => (
          <NavLink
            key={items.id}
            to=""
            className="w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700"
          >
            <div className="flex px-10 gap-3">
              <FileText />
              <h6 className="self-center font-bold flex">{items.title}</h6>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Recent;
