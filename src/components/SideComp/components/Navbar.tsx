import { AlertTriangle, Plus, Search, X } from "lucide-react";
import logo from "../../../assets/logo.svg";
import {
  useNavigate,
  useParams,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import { useContext, useState } from "react";
import { postNotes } from "../../../Api/FolderApi";
import { GlobalContext } from "../../UI";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const navigate = useNavigate();
  const { folder, folderId } = useParams();
  const revalidator = useRevalidator();
  const globalContext = useContext(GlobalContext);
  const [, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(false);
  const handleSearchOpen = () => setSearch(true);
  if (!globalContext) {
    return null;
  }
  const { fetchRecent } = globalContext;
  //handlers
  const handleNewNote = async () => {
    try {
      const res = await postNotes({ folderId, title: "Untitled" });
      revalidator.revalidate();
      fetchRecent();
      navigate(`/${folder}/${folderId}/notes/${res.data.id}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error("can't create note here", {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };

  const handleSearchClose = () => {
    setSearch(false);
    setSearchParams({});
    navigate("/");
  };

  return (
    <div className="px-6 w-full flex flex-col justify-between text-primary">
      <div className="flex justify-between items-center w-full">
        <img src={logo} alt="Noted" className="h-22 w-22" />
        {search ? (
          <X
            size={18}
            className="text-primary cursor-pointer hover:text-white transition-colors"
            onClick={handleSearchClose}
          />
        ) : (
          <Search
            size={18}
            className="text-primary cursor-pointer hover:text-white transition-colors"
            onClick={handleSearchOpen}
          />
        )}
      </div>
      <div className="flex w-full ">
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
