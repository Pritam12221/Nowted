import { Folder, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import type { RenameProps } from "../../../types/type";

const FolderItem = ({ folder, onDelete, rename }: RenameProps) => {
  const [editId, setEditId] = useState(false);
  const [name, setName] = useState(folder.name);

  const handleSave = () => {
    if (!name.trim()) {
      setName("Untitled");
      rename(folder.id, name);
    }
    if (name !== folder.name) {
      rename(folder.id, name);
    }
    setEditId(false);
  };

  return (
    <NavLink
      to={`/${folder.name}/${folder.id}`}
      className={({ isActive }) =>
        `w-full px-2 py-2 flex items-center gap-3 rounded transition-all  ${
          isActive ? "bg-primary-button-hover" : "hover:bg-zinc-700"
        }`
      }
      onClick={(e) => {
        if (editId) e.preventDefault();
      }}
    >
      <div className="flex px-10 gap-3 relative w-full items-center">
        <Folder />
        {editId ? (
          <form onSubmit={handleSave}>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleSave}
              className="bg-zinc-800 text-white px-2 py-1 rounded outline-none w-full"
            />
          </form>
        ) : (
          <h6
            className="font-bold flex w-full cursor-pointer"
            onDoubleClick={(e) => {
              e.preventDefault();
              setEditId(true);
            }}
          >
            {folder.name || `Untitled`}
          </h6>
        )}

        <Trash2
          className="absolute right-4 hover:text-red-400 transition-all cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onDelete(folder.id);
          }}
        />
      </div>
    </NavLink>
  );
};

export default FolderItem;
