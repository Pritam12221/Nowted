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
  const search = location.pathname.includes("/search");
  if (checkFolderId) {
    return <NoteListSkeleton />;
  }

  return (
    <div className=" w-120 h-screen bg-zinc-800 flex flex-col gap-3 pt-8 px-6 text-white overflow-y-auto scroll">
      <div className="flex items-center justify-between pb-2 w-full">
        <h2 className="text-white text-lg font-bold truncate">
          {search ? "Searching" : folder ? folder : categoryName}
        </h2>
        {search && (
          <span className="text-zinc-400 text-sm shrink-0">
            {notes?.length ?? 0} Notes
          </span>
        )}
      </div>
      {notes?.map((items: Notes) => (
        <div key={items.id}>
          <NavLink
            to={`notes/${items.id}`}
            className={({ isActive }) =>
              ` w-fixed px-3 py-3  bg-primary-button flex flex-col gap-2 transition-all ease-in-out ${isActive ? "bg-primary-hover" : "bg-primary-button hover:bg-zinc-650"}`
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
