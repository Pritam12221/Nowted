import { Folder, FolderPlus } from "lucide-react";
import { NavLink, useLoaderData } from "react-router-dom";
import type { FolderStruct } from "../../../types/type";

const Folders = () => {
  const folder = useLoaderData() as FolderStruct[];

  return (
    <div className="h-1/5-max ">
      <div className="flex justify-between pr-4">
        <h6 className=" px-10">Folders</h6>
        <FolderPlus />
      </div>

      <div className="flex flex-col gap-2">
        {folder?.map((items: FolderStruct) => (
          <NavLink
            key={items.id}
            to=""
            className="w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700"
          >
            <div className="flex px-10 gap-3">
              <Folder />
              <h6 className="self-center font-bold flex">{items.name}</h6>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Folders;
