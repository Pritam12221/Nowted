import { FolderPlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import type { FolderStruct } from "../../../types/type";
import {
  getFolders,
  postFolder,
  renameFolder,
} from "../../../services/FolderApi";
import { useEffect, useState } from "react";
import { deleteFolder } from "../../../services/MoreApi";
import FoldersLoader from "../../SkeletonsLoaders/FoldersLoader";
import FolderItem from "./FolderItem";

const Folders = () => {
  const [folder, setFolder] = useState<FolderStruct[]>([]);
  const [load, setLoad] = useState(true);
  const location = useLocation();
  const nav = useNavigate();

  const handleDelete = async (id: string) => {
    await deleteFolder(id);
    setFolder(folder.filter((item: FolderStruct) => item.id !== id));

    if (location.pathname.includes(id)) {
      nav(-1);
    }
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

  const handleFolderCreation = async () => {
    try {
      const res = await postFolder({
        name: "Untitled",
      });
      await fetchFolder();
      nav(`/Untitled/${res.data.folder[0].id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFolder = async () => {
    try {
      const res = await getFolders();
      setFolder(res.data.folders);
      const { folders, folderName, categoryName } = res.data;
      const firstFold = folders[0];
      //default navigation to first folder
      if (
        firstFold.name &&
        firstFold.id &&
        folderName &&
        categoryName &&
        location.pathname === "/"
      ) {
        nav(`/${firstFold.name}/${firstFold.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  if (load) return <FoldersLoader />;

  return (
    <div className="h-50">
      <div className="flex justify-between pr-4 pb-2">
        <h6 className=" px-10">Folders</h6>
        <FolderPlus onClick={handleFolderCreation} className="cursor-pointer" />
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
