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
  // const [searchParams] = useSearchParams();
  // const search = searchParams.get("search");
  const currentBase = folderId || categoryName.toLowerCase();
  const checkFolderId =
    navigation.state === "loading" &&
    !navigation.location?.pathname.includes(currentBase);
  if (checkFolderId) {
    return <NoteListSkeleton />;
  }
  return (
    <div className=" h-screen bg-zinc-800 flex flex-col gap-3 pt-12 px-6 text-white overflow-y-auto scroll">
      <h2 className="text-white text-lg pb-2 font-bold w-120">
        {folder ? folder : categoryName}
      </h2>
      {notes?.map((items: Notes) => (
        <div key={items.id}>
          <NavLink
            to={`notes/${items.id}`}
            className={({ isActive }) =>
              ` w-fixed px-3 py-3 rounded-lg bg-primary-button flex flex-col gap-2 transition-all ease-in-out ${isActive ? "bg-primary-hover" : "bg-primary-button hover:bg-zinc-650"}`
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
