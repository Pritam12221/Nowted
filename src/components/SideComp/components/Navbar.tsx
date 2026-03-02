import { AlertTriangle, Plus, Search } from "lucide-react";
import logo from "../../../assets/logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { postNotes } from "../../../services/FolderApi";
import { GlobalContext } from "../../UI";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const navigate = useNavigate();
  const { folder, folderId } = useParams();
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    return null;
  }

  const { fetchRecent } = globalContext;
  const handleNewNote = async () => {
    try {
      const res = await postNotes({ folderId, title: "Untitled" });
      if (globalContext) {
        globalContext.setNoteList({
          id: res.data.id,
          folderId: folderId || "",
          title: "Untitled",
          preview: "",
          isFavorite: false,
          isArchived: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: "",
          folder: {
            id: folderId || "",
            name: "",
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
          },
        });
      }
      fetchRecent();
      navigate(`/${folder}/${folderId}/notes/${res.data.id}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };

  const [search, setSearch] = useState(false);
  function handleSearch() {
    setSearch(!search);
  }
  return (
    <div className="h-1/6 px-10 w-full flex flex-col justify-between text-primary">
      <div className="flex justify-between items-center w-full">
        <img src={logo} alt="Noted" className="h-22 w-22" />
        <Search size={18} className=" text-primary" onClick={handleSearch} />
      </div>
      <div className="flex w-full items-baseline ">
        {!search ? (
          <button
            className="flex bg-primary-button w-full text-mid justify-center items-center text-white px-5 py-2 rounded cursor-pointer"
            onClick={handleNewNote}
          >
            <Plus size={20} />
            New Note
          </button>
        ) : (
          <SearchInput />
        )}
      </div>
    </div>
  );
};

export default Navbar;
