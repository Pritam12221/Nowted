import {
  NavLink,
  useLocation,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import type { NoteListProps, Notes } from "../../../types/type";
import Note from "./Note";
import NoteListSkeleton from "../../SkeletonsLoaders/NoteListLoader";

const NoteList = ({ notes }: NoteListProps) => {
  const navigation = useNavigation();
  const location = useLocation();
  const { folder, folderId } = useParams();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const categoryName = location.pathname.split("/")[1]?.toUpperCase() || "";

  const currentBase = folderId || categoryName.toLowerCase();
  const checkFolderId =
    navigation.state === "loading" &&
    !navigation.location?.pathname.includes(currentBase || "");

  if (checkFolderId) {
    return <NoteListSkeleton />;
  }

  return (
    <div className="h-screen bg-zinc-800 flex flex-col gap-3 pt-12 px-6 text-white overflow-y-auto scroll">
      {/* 🔥 Heading Logic */}
      <h2 className="text-white text-lg pb-2 font-bold w-full">
        {search
          ? `Search results for "${search}"`
          : folder
            ? folder
            : categoryName}
      </h2>

      {/* 🔥 No Results Case */}
      {notes?.length === 0 && (
        <div className="h-10 flex justify-center items-center">
          <p className="text-sm text-zinc-400">
            {search ? "No matching notes found." : "Nothing to show."}
          </p>
        </div>
      )}

      {/* 🔥 Notes List */}
      {notes?.length > 0 &&
        notes.map((items: Notes) => (
          <div key={items.id}>
            <NavLink
              to={`notes/${items.id}`}
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg flex flex-col gap-2 transition-all ease-in-out 
                ${
                  isActive
                    ? "bg-primary-hover"
                    : "bg-primary-button hover:bg-zinc-700"
                }`
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
