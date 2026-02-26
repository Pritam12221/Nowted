import { Folder, FolderPlus, Trash2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import type { FolderStruct } from "../../../types/type";
import { getFolders } from "../../../services/FolderApi";
import { useEffect, useState } from "react";
import { deleteFolder } from "../../../services/MoreApi";
import FoldersLoader from "../../SkeletonsLoaders/FoldersLoader";

const Folders = () => {
  const [folder, setFolder] = useState([]);
  const [load, setLoad] = useState(true);

  const handleDelete = async (id: string) => {
    await deleteFolder(id);
    setFolder(folder.filter((item: FolderStruct) => item.id !== id));
    nav(-1);
  };

  const nav = useNavigate();
  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await getFolders();
        setFolder(res.data.folders);
        if (
          res.data.folders[0].name &&
          res.data.folders[0].id &&
          !res.data.folderName &&
          !res.data.categoryName
        ) {
          nav(`/${res.data.folders[0].name}/${res.data.folders[0].id}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };

    fetchFolder();
  }, []);

  if (load) return <FoldersLoader />;

  return (
    <div className="h-50">
      <div className="flex justify-between pr-4 pb-2">
        <h6 className=" px-10">Folders</h6>
        <FolderPlus />
      </div>

      <div className="flex flex-col gap-2 relative h-50 overflow-y-auto scroll">
        {folder?.map((items: FolderStruct) => (
          <NavLink
            key={items.id}
            to={`${items.name}/${items.id}`}
            className={({ isActive }) =>
              `w-full h-1/4 px-2 py-2 flex items-center gap-3 rounded transition-all hover:bg-zinc-700 ${
                isActive ? "bg-primary-button-hover" : ""
              }`
            }
          >
            <div className="flex px-10 gap-3">
              <Folder />
              <h6 className="self-center font-bold flex">{items.name}</h6>
            </div>
            <Trash2
              className="absolute right-4 hover:text-red-400 transition-all cursor-pointer ease-in-out"
              onClick={() => handleDelete(items.id)}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Folders;
