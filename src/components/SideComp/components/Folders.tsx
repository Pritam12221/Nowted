import { Folder, FolderPlus, Trash2 } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import type { FolderStruct, Notes } from "../../../types/type";
import { getFolders, renameFolder } from "../../../services/FolderApi";
import { useEffect, useState } from "react";
import { deleteFolder } from "../../../services/MoreApi";
import FoldersLoader from "../../SkeletonsLoaders/FoldersLoader";
import FolderItem from "./FolderItem";

const Folders = () => {
  const [folder, setFolder] = useState<FolderStruct[]>([]);
  const [load, setLoad] = useState(true);
  const location = useLocation();

  const handleDelete = async (id: string) => {
    await deleteFolder(id);
    setFolder(folder.filter((item: FolderStruct) => item.id !== id));
    nav(-1);
  };

  const handleRename = async (id: string, name: string) => {
    try {
      await renameFolder(id, name);
      setFolder((val) =>
        val.map((item) => (item.id === id ? { ...item, name: name } : item)),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const nav = useNavigate();
  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await getFolders();
        setFolder(res.data.folders);
        //default navigation to first folder
        if (
          res.data.folders[0].name &&
          res.data.folders[0].id &&
          !res.data.folderName &&
          !res.data.categoryName &&
          location.pathname === "/"
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
          <FolderItem
            key={items.id}
            folder={items}
            onDelete={handleDelete}
            rename={handleRename}
          />
        ))}
      </div>
    </div>
  );
};

export default Folders;
