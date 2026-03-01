import {
  NavLink,
  useLocation,
  useNavigation,
  useParams,
} from "react-router-dom";
import type { NoteListProps, Notes } from "../../../types/type";
import Note from "./Note";
import NoteListSkeleton from "../../SkeletonsLoaders/NoteListLoader";

const NoteList = ({ notes }: NoteListProps) => {
  const navigation = useNavigation();
  const location = useLocation();
  const categoryName = location.pathname.split("/")[1].toUpperCase();
  const { folder, folderId } = useParams();

  const currentBase = folderId || categoryName.toLowerCase();
  const checkFolderId =
    navigation.state === "loading" &&
    !navigation.location?.pathname.includes(currentBase);
  if (checkFolderId) {
    return <NoteListSkeleton />;
  }
  return (
    <div className="w-[30%] h-screen bg-zinc-800 flex flex-col gap-3 pt-12 px-6 text-white overflow-y-auto scroll">
      <h2 className="text-white text-lg pb-10 font-bold">
        {folder ? folder : categoryName}
      </h2>
      {notes?.map((items: Notes) => (
        <div key={items.id}>
          <NavLink
            to={`notes/${items.id}`}
            className={({ isActive }) =>
              ` w-fixed px-3 py-3 rounded-lg bg-primary-button hover:bg-zinc-700 flex flex-col gap-2 transition-all ease-in-out ${isActive ? "bg-primary-hover" : ""}`
            }
          >
            <Note value={items} />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
