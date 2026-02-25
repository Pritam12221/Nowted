import { Folder, FolderPlus } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import type { FolderStruct } from "../../../types/type";
import { getFolders } from "../../../services/FolderApi";
import { useEffect, useState } from "react";
import FoldersSkeleton from "../../SkeletonsLoaders/FoldersLoader";

const Folders = () => {
  const [folder, setFolder] = useState([]);
  const [load, setLoad] = useState(true);
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

  if (load) return <FoldersSkeleton />;

  return (
    <div className="h-1/5-max ">
      <div className="flex justify-between pr-4 pb-2">
        <h6 className=" px-10">Folders</h6>
        <FolderPlus />
      </div>

      <div className="flex flex-col gap-2">
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
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Folders;
