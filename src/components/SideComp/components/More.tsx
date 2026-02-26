import { FolderArchive, Star, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

const More = () => {
  return (
    <div className="h-1/5  w-full pt-4">
      <h6 className="px-10">More</h6>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700 ${
            isActive ? "bg-primary-button-hover" : ""
          }`
        }
      >
        <div className="flex px-10 gap-3">
          <Star />
          Favorites
        </div>
      </NavLink>
      <NavLink
        to="/trash"
        className={({ isActive }) =>
          `w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700 ${
            isActive ? "bg-primary-button-hover" : ""
          }`
        }
      >
        <div className="flex px-10 gap-3">
          <Trash /> Trash
        </div>
      </NavLink>
      <NavLink
        to="/archived"
        className={({ isActive }) =>
          `w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700 ${
            isActive ? "bg-primary-button-hover" : ""
          }`
        }
      >
        <div className="flex px-10 gap-3">
          <FolderArchive />
          Archived Notes
        </div>
      </NavLink>
    </div>
  );
};

export default More;
