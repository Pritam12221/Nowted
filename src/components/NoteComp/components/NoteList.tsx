import {
  NavLink,
  useLocation,
  useNavigation,
  useParams,
} from "react-router-dom";
import type { NoteListProps, Notes } from "../../../types/type";
import Note from "./Note";
import NoteListSkeleton from "../../SkeletonsLoaders/NoteListLoader";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

const NoteList = ({
  notes,
  loadMore,
  hasMore,
  loadingState,
}: NoteListProps) => {
  const target = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const navigation = useNavigation();
  const location = useLocation();
  const categoryName = location.pathname.split("/")[1].toUpperCase();
  const { folder, folderId } = useParams();
  const currentBase = folderId || categoryName.toLowerCase();
  const checkFolderId =
    navigation.state === "loading" &&
    !navigation.location?.pathname.includes(currentBase);
  const search = location.pathname.includes("/search");

  useEffect(() => {
    if (!hasMore || loadingState || !target.current || !loadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Fetching next page...");
          loadMore();
        }
      },
      { root: scroll.current, rootMargin: "300px", threshold: 0.2 },
    );

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadingState, loadMore]);

  if (checkFolderId) {
    return <NoteListSkeleton />;
  }

  return (
    <div className=" w-120 h-screen bg-[#1C1C1C]  flex flex-col gap-3 pt-8 px-6 text-white overflow-y-auto scroll">
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
      <div
        ref={scroll}
        className="flex-1 overflow-y-auto scroll px-6 flex flex-col gap-4 pb-32"
      >
        {notes?.map((items: Notes) => (
          <div key={items.id}>
            <NavLink
              to={`notes/${items.id}`}
              className={({ isActive }) =>
                `block w-full p-4 rounded-md transition-all ease-in-out ${isActive ? "bg-white/10" : "bg-[#2A2A2A] hover:bg-white/10"}`
              }
            >
              <Note value={items} />
            </NavLink>
          </div>
        ))}
        {(hasMore || loadingState) && (
          <div ref={target} className="py-4 flex justify-center ">
            {loadingState ? (
              <Loader2 className="animate-spin text-zinc-400 " />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;
