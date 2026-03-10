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
  //for  pagination target div
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
    if (!hasMore || !target.current || !loadMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { root: scroll.current, rootMargin: "300px", threshold: 0.2 },
    );

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

  if (checkFolderId) {
    return <NoteListSkeleton />;
  }

  return (
    <div className=" w-120 h-screen bg-back  flex flex-col gap-3 pt-8 text-white overflow-y-auto scroll">
      <div className="flex items-center justify-between pb-2 w-full">
        <h2 className="text-white text-lg font-bold truncate pl-3">
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
        className="flex-1 overflow-y-auto scroll flex flex-col gap-4 pb-32 px-3"
      >
        {notes.length === 0 ? (
          <h4 className="pl-3">No more notes available</h4>
        ) : (
          notes?.map((items: Notes) => (
            <div key={items.id}>
              <NavLink
                to={`notes/${items.id}`}
                className={({ isActive }) =>
                  `block w-full p-4 rounded-md transition-all ease-in-out ${isActive ? "bg-primary-button-hover" : "bg-card hover:bg-white/10"}`
                }
              >
                <Note value={items} />
              </NavLink>
            </div>
          ))
        )}
        {hasMore && notes.length > 0 && (
          <div ref={target} className="py-4 flex justify-center bg-amber-500">
            {loadingState ? (
              <Loader2 className="animate-spin text-zinc-400 " />
            ) : (
              "no more note available"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;
