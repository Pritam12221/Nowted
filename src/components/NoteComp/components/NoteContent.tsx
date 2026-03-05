import {
  Archive,
  AlertTriangle,
  CalendarDays,
  Ellipsis,
  Folder,
  Star,
  Trash2,
  ChevronDown,
} from "lucide-react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useRevalidator,
} from "react-router-dom";
import { format } from "date-fns";
import { useState, useRef, useEffect, useCallback, useContext } from "react";
import {
  changeArchive,
  changeFavorite,
  deleteNote,
  updateNote,
} from "../../../services/MoreApi";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import NoteContentSkeleton from "../../SkeletonsLoaders/NoteContentLoader";
import type { FolderStruct, NotesContextStruct } from "../../../types/type";
import RestoreNotes from "./RestoreNotes";
import { GlobalContext } from "../../UI";
import { getFolders } from "../../../services/FolderApi";
const NoteContent = () => {
  const globalData = useContext(GlobalContext);
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const note = useLoaderData();
  const { removeNote, updateNoteList } = useOutletContext<NotesContextStruct>();
  const newDate = format(new Date(note.createdAt), "dd/MM/yyyy");
  const [more, setMore] = useState(false);
  const [fav, setFav] = useState(note.isFavorite);
  const [archive, setArchive] = useState(note.isArchived);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content ?? "");
  const rollBack = useNavigate();
  const titleFocus = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dropdown, setdropdown] = useState(false);
  const [folder, setfolder] = useState<FolderStruct[]>([]);
  const trash = Boolean(note.deletedAt);
  const readOnly = note.deletedAt;
  const revalidator = useRevalidator();

  //mount with this default values
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content ?? "");
    setFav(note.isFavorite);
    setArchive(note.isArchived);
  }, [note.id]);

  useEffect(() => {
    if (note.title === "Untitled" && titleFocus.current) {
      titleFocus.current.focus();
    }
  }, [note.id]);

  const debouncedSave = useCallback(
    (data: { title?: string; content?: string }) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(async () => {
        try {
          const res = await updateNote(note.id, data);
          toast.success(res.data);
          if (globalData?.fetchRecent) {
            globalData.fetchRecent();
          }
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message, {
              icon: <AlertTriangle size={16} />,
            });
          }
        }
      }, 500);
    },
    [note.id],
  );

  useEffect(() => {
    //clean up function if user navigates somewhere else
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const res = await getFolders();
        const fetchedFolders = res.data?.folders || res.data || [];
        setfolder(Array.isArray(fetchedFolders) ? fetchedFolders : []);
      } catch (e) {
        console.error("Failed to load folders");
      }
    };
    if (!readOnly) {
      loadFolders();
    }
  }, [note.id, readOnly, globalData?.dropdownRefresh]);

  //handlers
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateNoteList(note.id, { title: newTitle });
    debouncedSave({ title: newTitle });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateNoteList(note.id, { preview: newContent });
    debouncedSave({ content: newContent });
  };

  const handleArchive = async () => {
    try {
      const res = await changeArchive(note.id, note.isArchived);
      toast.success(res.data, { icon: <Archive size={16} /> });
      setArchive(!archive);
      setMore(false);
      revalidator.revalidate();
      const checkPath = location.pathname.split("/notes")[0];
      rollBack(checkPath === "" ? "/" : checkPath);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };

  const handleFavorite = async () => {
    try {
      const res = await changeFavorite(note.id, note.isFavorite);
      toast.success(res.data, { icon: <Star size={16} /> });
      setFav(!fav);
      setMore(false);
      revalidator.revalidate();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note.id);
      toast.success("Note deleted", { icon: <Trash2 size={16} /> });
      setMore(false);
      revalidator.revalidate();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };
  const handleFolderChange = async (targetFolder: string) => {
    try {
      setdropdown(false);
      await updateNote(note.id, { folderId: targetFolder });
      toast.success("Note moved");
      revalidator.revalidate();
      const folderId = folder.find((f) => f.id === targetFolder);
      if (folderId) {
        rollBack(`/${folderId.name}/${targetFolder}/notes/${note.id}`);
      }
    } catch (err) {
      toast.error("Failed to move note");
    }
  };

  if (isLoading) return <NoteContentSkeleton />;
  if (trash)
    return (
      <RestoreNotes
        noteId={note.id}
        noteTitle={note.title}
        removeNote={removeNote}
      />
    );

  return (
    <div className="w-full overflow-hidden px-10 py-10 text-white h-screen flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <input
          ref={titleFocus}
          type="text"
          value={title}
          onChange={handleTitleChange}
          readOnly={readOnly}
          className="text-4xl font-bold bg-transparent outline-none border-none w-full mr-4 truncate"
          placeholder="Untitled"
        />

        <div className="relative">
          <button
            onClick={() => setMore((prev) => !prev)}
            className="p-2 rounded-full border border-zinc-600 text-zinc-400 hover:text-white hover:border-zinc-400 transition-all cursor-pointer "
          >
            <Ellipsis size={18} />
          </button>

          {more && (
            <>
              <div //overlay
                className="fixed inset-0 z-10"
                onClick={() => setMore(false)}
              />

              <div className="flex flex-col items-center justify-center  absolute right-0 mt-2 w-52 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden  text-lg">
                <>
                  <button
                    onClick={() => {
                      handleFavorite();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3  text-zinc-200 hover:bg-zinc-700 transition-colors ${archive ? "none" : "block"}`}
                  >
                    <Star size={18} className="text-zinc-400" />
                    {fav === true ? "Unfav" : "Fav"}
                  </button>

                  <button
                    onClick={() => {
                      handleArchive();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3  text-zinc-200 hover:bg-zinc-700 transition-colors"
                  >
                    <Archive size={18} className="text-zinc-400" />
                    {archive !== true ? "Archive" : "UnArchive"}
                  </button>

                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3  text-zinc-200  hover:text-red-400 ${archive ? "none" : "block"}`}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8 border-b border-zinc-700 pb-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-zinc-500 w-28">
            <CalendarDays size={16} />
            <h2 className="text-sm">Date</h2>
          </div>
          <h2 className="text-sm text-zinc-300 underline underline-offset-2">
            {newDate}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-zinc-500 w-28">
            <Folder size={16} />
            <h2 className="text-sm">Folder</h2>
          </div>
          <div className="relative">
            <button
              onClick={() => !readOnly && setdropdown(!dropdown)}
              className={`flex items-center gap-2 text-sm text-zinc-300 underline underline-offset-2 hover:text-white transition-colors ${readOnly ? "cursor-default opacity-50" : "cursor-pointer"}`}
            >
              {note.folder?.name || "None"}
              {!readOnly && <ChevronDown size={14} />}
            </button>

            {dropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setdropdown(false)}
                />
                <div className="absolute left-0 top-full mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-20 py-1 max-h-48 overflow-y-auto custom-scrollbar">
                  {folder.map((items) => (
                    <button
                      key={items.id}
                      onClick={() => handleFolderChange(items.id)}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors truncate"
                    >
                      {items.name}
                    </button>
                  ))}
                  {folder.length === 0 && (
                    <div className="px-4 py-2 text-sm text-zinc-500">
                      No folders available
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        readOnly={readOnly}
        className="text-zinc-200 text-sm leading-7 bg-transparent outline-none border-none resize-none flex-1 w-full flex-wrap"
        placeholder="start from here"
      />
    </div>
  );
};

export default NoteContent;
