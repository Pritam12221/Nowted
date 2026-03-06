import { FolderArchive, Star, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

const More = () => {
  return (
    //fav
    <div className=" w-full">
      <h6 className="px-6">More</h6>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700 ${
            isActive ? "bg-primary-button-hover" : ""
          }`
        }
      >
        <div className="flex px-6 gap-3">
          <Star />
          Favorites
        </div>
      </NavLink>

      {/* //trash */}
      <NavLink
        to="/trash"
        className={({ isActive }) =>
          `w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700 ${
            isActive ? "bg-primary-button-hover" : ""
          }`
        }
      >
        <div className="flex px-6 gap-3">
          <Trash /> Trash
        </div>
      </NavLink>

      {/* archived */}
      <NavLink
        to="/archived"
        className={({ isActive }) =>
          `w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700 ${
            isActive ? "bg-primary-button-hover" : ""
          }`
        }
      >
        <div className="flex px-6 gap-3">
          <FolderArchive />
          Archived Notes
        </div>
      </NavLink>
    </div>
  );
};

export default More;
