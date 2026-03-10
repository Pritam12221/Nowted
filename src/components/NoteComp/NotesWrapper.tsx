import {
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";
import NoteList from "./components/NoteList";
import { useCallback, useEffect, useState } from "react";
import type { Notes } from "../../types/type";
import {
  getArchiveNotes,
  getDeletedNotes,
  getFavNotes,
  searchNotes,
} from "../../Api/MoreApi";
import { getNotesbyFolder } from "../../Api/NotesApi";

const NotesWrapper = () => {
  const loadNOte = useLoaderData<Notes[]>();
  // const { total } = loadNOte;
  const [notes, setNotes] = useState<Notes[]>(loadNOte);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingState, setloadingState] = useState(false);
  const location = useLocation();
  const { folderId } = useParams();

  useEffect(() => {
    setNotes(loadNOte);
    setPage(1);
    setHasMore(true);
  }, [loadNOte]);

  const loadMore = useCallback(async () => {
    if (!hasMore || notes.length < 10) return;
    setloadingState(true);
    const nextPage = page + 1;
    let newNotes: Notes[] = [];

    try {
      //load more notes based on the routes
      if (location.pathname.includes("/favorites")) {
        const res = await getFavNotes(nextPage, 10);
        newNotes = res.data.notes;
      } else if (location.pathname.includes("/archived")) {
        const res = await getArchiveNotes(nextPage, 10);
        newNotes = res.data.notes;
      } else if (location.pathname.includes("/trash")) {
        const res = await getDeletedNotes(nextPage, 10);
        newNotes = res.data.notes;
      } else if (location.pathname.includes("/search")) {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get("search") || "";
        const res = await searchNotes(query, nextPage, 10);
        newNotes = res.data.notes;
      } else if (folderId) {
        const res = await getNotesbyFolder(folderId, nextPage, 10);
        newNotes = res.data.notes;
      }

      if (newNotes && newNotes.length > 0) {
        setNotes((prev) => {
          // const hashSet = new Set(prev.map((n) => n.id));
          // const unqNOtes = newNotes.filter((n) => !hashSet.has(n.id));
          return [...prev, ...newNotes];
        });
        setPage(nextPage); //no notes left
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("load more notes failed", error);
    } finally {
      setloadingState(false);
    }
  }, [hasMore, page, location.pathname, location.search, folderId]);

  //update notelist based on the note content component
  const updateNoteList = (id: string, updates: Partial<Notes>) => {
    setNotes((items) =>
      items.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    );
  };
  return (
    <div className="flex w-full h-screen">
      <NoteList
        notes={notes}
        loadMore={loadMore}
        hasMore={hasMore}
        loadingState={loadingState}
      />
      <Outlet context={{ notes, updateNoteList }} />
    </div>
  );
};

export default NotesWrapper;
